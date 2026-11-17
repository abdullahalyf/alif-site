/**
 * Layout audit for the final design pass.
 *
 * Visits every route at 375px and 1440px and reports the three things that
 * are easy to break and hard to see: horizontal overflow, a heading scale that
 * drifts between pages, and interactive elements with no visible focus ring.
 *
 * Needs the site running. Start it with `pnpm start` first.
 *
 * Run with: pnpm audit:layout
 */
import { chromium, type Page } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/approach",
  "/work",
  "/work/multi-branch-pos",
  "/work/multi-branch-pos/architecture",
  "/services",
  "/contact",
  "/resume",
  "/uses",
  "/writing",
  "/writing/offline-first-shops",
  "/now",
  "/search",
];

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

const FOCUSABLE =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Elements that stick out past the right edge of the document. */
async function overflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const excess = doc.scrollWidth - doc.clientWidth;
    if (excess <= 1) return { excess: 0, offenders: [] as string[] };

    const offenders: string[] = [];
    for (const el of Array.from(document.querySelectorAll("body *"))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (getComputedStyle(el).position === "fixed") continue;
      if (rect.right > doc.clientWidth + 1 || rect.left < -1) {
        const classes = String(el.className).split(" ").filter(Boolean).slice(0, 3);
        offenders.push(
          `${el.tagName.toLowerCase()}${classes.length ? `.${classes.join(".")}` : ""} [${Math.round(rect.left)}..${Math.round(rect.right)}]`,
        );
      }
    }
    return { excess, offenders: offenders.slice(0, 6) };
  });
}

/** The largest font size used by each heading level, so pages can be compared. */
async function headingScale(page: Page) {
  return page.evaluate(() => {
    const sizes = new Map<string, number>();
    for (const h of Array.from(document.querySelectorAll("h1, h2, h3"))) {
      const size = Math.round(parseFloat(getComputedStyle(h).fontSize));
      sizes.set(h.tagName, Math.max(sizes.get(h.tagName) ?? 0, size));
    }
    return [...sizes.entries()].sort().map(([level, size]) => `${level}:${size}`).join(" ");
  });
}

/** Interactive elements that do not show a focus ring when focused. */
async function missingFocusRing(page: Page) {
  return page.evaluate((selector) => {
    const problems: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(selector))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (el.closest("[hidden]")) continue;
      el.focus();
      const style = getComputedStyle(el);
      const hasOutline =
        style.outlineStyle !== "none" &&
        parseFloat(style.outlineWidth) > 0 &&
        style.outlineColor !== "transparent";
      if (!hasOutline && style.boxShadow === "none") {
        const classes = String(el.className).split(" ").filter(Boolean).slice(0, 2);
        problems.push(
          `${el.tagName.toLowerCase()}${classes.length ? `.${classes.join(".")}` : ""} "${(el.textContent ?? "").trim().slice(0, 24)}"`,
        );
      }
    }
    return problems;
  }, FOCUSABLE);
}

async function main() {
  const browser = await chromium.launch();
  let failures = 0;

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(150);

      const problems: string[] = [];

      const overflowResult = await overflow(page);
      if (overflowResult.excess > 1) {
        problems.push(
          `overflows by ${overflowResult.excess}px: ${overflowResult.offenders.join(", ")}`,
        );
      }

      const unfocusable = await missingFocusRing(page);
      if (unfocusable.length) {
        problems.push(`no focus ring: ${unfocusable.slice(0, 5).join(", ")}`);
      }

      if (problems.length) {
        failures += problems.length;
        console.log(`FAIL ${viewport.name}px ${route}`);
        for (const problem of problems) console.log(`     ${problem}`);
      } else {
        const scale = await headingScale(page);
        console.log(`ok   ${viewport.name}px ${route}  ${scale}`);
      }
    }

    await context.close();
  }

  await browser.close();

  if (failures) {
    console.log(`\n${failures} problem(s) found.`);
    process.exit(1);
  }
  console.log("\nNo overflow, and every interactive element has a focus ring.");
}

main();
