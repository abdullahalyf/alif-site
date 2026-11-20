import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";
import { pageRoutes, waitForHydration } from "../e2e/helpers/routes";
import { projects } from "../src/content/projects";
import { diagramContent } from "../src/content/diagrams";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = [...new Set([...pageRoutes, "/search"])];
const widths = [390, 1440];
const themes = ["light", "dark"] as const;

async function audit() {
  const browser = await chromium.launch();
  const totals = { visits: 0, geometry: 0, brokenImages: 0, console: 0, headings: 0, gaps: 0, axe: 0, diagrams: 0 };
  try {
    for (const colorScheme of themes) {
      for (const width of widths) {
        const context = await browser.newContext({ viewport: { width, height: 860 }, colorScheme, reducedMotion: "reduce" });
        const page = await context.newPage();
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
        for (const route of routes) {
          errors.length = 0;
          const response = await page.goto(base + route, { waitUntil: "domcontentloaded" });
          await waitForHydration(page);
          const layout = await page.evaluate(async () => {
            await document.fonts.ready;
            const images = Array.from(document.images);
            images.forEach((image) => { image.loading = "eager"; });
            const pending = new Set(images);
            const broken = new Set<HTMLImageElement>();
            let timer = 0;
            const deadline = new Promise<void>((resolve) => { timer = window.setTimeout(resolve, 12_000); });
            await Promise.race([deadline, Promise.all(images.map(async (image) => {
              try { await image.decode(); } catch { broken.add(image); }
              pending.delete(image);
            }))]);
            clearTimeout(timer);
            const intervals: [number, number][] = [];
            for (const element of document.querySelectorAll("main *, footer *")) {
              if (!element.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
              // Skip decorative, inert and offscreen horizontal content.
              if (element.closest("[aria-hidden=true], [inert], .sr-only")) continue;
              const meaningful = element.matches("img, svg, table, pre, iframe, input, textarea, select, meter, hr")
                || Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
              if (!meaningful) continue;
              const rect = element.getBoundingClientRect();
              if (rect.width < 1 || rect.height < 1 || rect.right < 0 || rect.left > window.innerWidth) continue;
              intervals.push([rect.top + scrollY, rect.bottom + scrollY]);
            }
            let bottom = document.querySelector("main")?.getBoundingClientRect().top ?? 0;
            let largest = { size: 0, from: 0, to: 0 };
            for (const [start, end] of intervals.sort(([a], [b]) => a - b)) {
              if (start - bottom > largest.size) largest = { size: start - bottom, from: bottom, to: start };
              bottom = Math.max(bottom, end);
            }
            return {
              overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
              h1: document.querySelectorAll("h1").length,
              broken: [...broken, ...pending].map((image) => image.currentSrc || image.src),
              gap: { size: Math.round(largest.size), from: Math.round(largest.from), to: Math.round(largest.to) },
            };
          });
          const { violations } = await new AxeBuilder({ page }).analyze();
          const serious = violations.filter(({ impact }) => impact === "critical" || impact === "serious");
          const issues: string[] = [];
          if (response?.status() !== 200 || layout.overflow > 1) {
            totals.geometry++;
            issues.push(`HTTP ${response?.status()}, overflow ${layout.overflow}px`);
          }
          if (layout.h1 !== 1) { totals.headings++; issues.push(`${layout.h1} h1 elements`); }
          if (layout.broken.length) { totals.brokenImages += layout.broken.length; issues.push(`broken images ${layout.broken.join(", ")}`); }
          if (layout.gap.size > 320) { totals.gaps++; issues.push(`empty band ${layout.gap.size}px at ${layout.gap.from}–${layout.gap.to}px`); }
          if (errors.length) { totals.console += errors.length; issues.push(...new Set(errors)); }
          if (serious.length) {
            totals.axe += serious.length;
            issues.push(...serious.map(({ id, nodes }) => `${id} ${nodes.map(({ target }) => target.join(" ")).join(", ")}`));
          }
          totals.visits++;
          if (issues.length) console.log(`${colorScheme} ${width}px ${route} → ${issues.join(" | ")}`);
        }
        console.log(`${colorScheme} ${width}px: ${routes.length} routes checked`);
        await context.close();
      }
    }
    for (const width of [390, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 860 }, reducedMotion: "reduce" });
      for (const { slug } of projects) {
        for (const route of [`/work/${slug}`, diagramContent.path(slug)]) {
          await page.goto(base + route);
          const valid = await page.locator(".diagram-scroll").evaluate((area) => {
            const svg = area.querySelector("svg");
            if (!svg) return false;
            const clipped = svg.getBoundingClientRect().width > area.clientWidth + 1;
            const canScroll = area.scrollWidth > area.clientWidth + 1 && getComputedStyle(area).overflowX === "auto";
            return innerWidth < 768 ? !clipped || canScroll : !clipped;
          });
          if (!valid) { totals.diagrams++; console.log(`${width}px ${route} → diagram clipping`); }
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify(totals));
  if (Object.entries(totals).some(([key, value]) => key !== "visits" && value > 0)) process.exitCode = 1;
}

void audit();
