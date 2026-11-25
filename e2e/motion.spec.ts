import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

test("home page shows its heading and footer immediately", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(site.name);
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("home page content is visible without waiting for animations", async ({ page }) => {
  await page.goto("/", { waitUntil: "commit" });

  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS("opacity", "1");
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("no animation overlay blocks the page", async ({ page }) => {
  await page.goto("/");

  const overlay = page.locator("[data-intro]");
  if (await overlay.count()) {
    await expect(overlay).toBeHidden({ timeout: 3000 });
  }

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the dark panel enters below a compact, readable header", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.waitForLoadState("networkidle");
  const header = page.locator(".header");
  const section = page.locator(".night-section");
  const scrollToSection = () => section.evaluate(element => scrollTo({
    top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.58,
    behavior: "instant",
  }));
  await expect.poll(async () => { await scrollToSection(); return header.getAttribute("data-compact"); }, { timeout: 15_000 }).toBe("");
  await expect.poll(async () => Math.round((await header.boundingBox())!.height)).toBe(50);
  expect((await header.boundingBox())!.y).toBe(0);
  expect((await section.boundingBox())!.y).toBeGreaterThan(50);
  await expect(header).toHaveCSS("background-color", "rgb(28, 27, 24)");
  await expect(header).toHaveCSS("color", "rgb(244, 239, 231)");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(28, 27, 24)");
  await expect(section.getByRole("heading", { level: 2 })).toHaveCSS("opacity", "1");
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const { violations } = await new AxeBuilder({ page }).setLegacyMode().withRules(["color-contrast"]).analyze();
  expect(violations).toEqual([]);
  await testInfo.attach("dark-panel-mid-transition", { body: await page.screenshot(), contentType: "image/png" });
});

for (const width of [360, 390, 430]) {
  test(`the mobile hero stacks the photo, status card and diagram without overlap at ${width}px`, async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile viewport composition");
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const position = async (selector: string) => (await page.locator(selector).boundingBox())!;
    const headline = await position("#hero-title");
    const photo = await position(".hero-side__photo");
    const card = await position(".hero-side__card");
    const diagram = await position(".hero-side__diagram");
    expect(photo.y).toBeGreaterThan(headline.y + headline.height);
    expect(card.y).toBeGreaterThanOrEqual(photo.y + photo.height);
    expect(card.x).toBeGreaterThanOrEqual(0);
    expect(card.x + card.width).toBeLessThanOrEqual(width);
    expect(diagram.y).toBeGreaterThanOrEqual(card.y + card.height);
    expect(diagram.x + diagram.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test("the Home photo sharpens without changing the inset frame", async ({ page, isMobile }) => {
  await page.goto("/");
  const reduced = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const panel = page.locator(".hero-panel");
  const frame = panel.locator(".hero-panel__frame");
  const photo = panel.locator(".hero-photo").first();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);

  async function scrollPanel(fraction: number) {
    await panel.evaluate((element, offset) => scrollTo({
      top: scrollY + element.getBoundingClientRect().top - innerHeight * offset,
      behavior: "instant",
    }), fraction);
  }

  await scrollPanel(0.91);
  const scale = () => frame.evaluate(element => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" ? 1 : new DOMMatrixReadOnly(transform).a;
  });
  if (reduced) {
    await expect(photo).toHaveCSS("filter", "none");
  } else {
    const blur = () => photo.evaluate(element => Number(getComputedStyle(element).filter.match(/blur\(([\d.]+)px\)/)?.[1] ?? 0));
    await expect.poll(blur).toBeGreaterThan(isMobile ? 2.5 : 7);
  }
  const initial = (await frame.boundingBox())!;
  expect(initial.x).toBeGreaterThan(0);
  expect(await scale()).toBe(1);

  await scrollPanel(0.11);
  await expect.poll(scale).toBeCloseTo(1);
  expect((await frame.boundingBox())!.width).toBeCloseTo(initial.width);
  expect((await frame.boundingBox())!.x).toBeCloseTo(initial.x);
  await expect(photo).toHaveCSS("opacity", "1");
  await expect(photo).toHaveCSS("filter", reduced ? "none" : "blur(0px) saturate(1)");
});

test("the hero headline and sharp photo are present with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
    await expect(page.locator(".hero-photo").first()).toHaveCSS("filter", "none");
  } finally {
    await context.close();
  }
});

for (const route of ["/contact", "/about", "/work"]) {
  test(`visible headings and their content are readable on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
    const checkVisibleContent = () => page.evaluate(() => {
      const bottom = innerHeight;
      const top = document.querySelector(".header")!.getBoundingClientRect().bottom;
      const visible = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.height > 0 && bounds.bottom > top && bounds.top < bottom;
      };
      const headings = Array.from(document.querySelectorAll("main :is(h1, h2, h3, h4)")).filter(visible);
      const nextContent = (heading: Element) => heading.nextElementSibling
        ?? (heading.parentElement?.matches("[data-motion-managed]") ? heading.parentElement.nextElementSibling : null);
      const obstructed = (element: Element) => {
        for (let ancestor: Element | null = element; ancestor && ancestor.tagName !== "MAIN"; ancestor = ancestor.parentElement) {
          const { opacity, clipPath, visibility } = getComputedStyle(ancestor);
          if (opacity !== "1" || clipPath !== "none" || visibility !== "visible") return true;
        }
        return false;
      };
      const following = headings.flatMap((heading) => {
        const next = nextContent(heading);
        return next ? [heading, next, ...next.querySelectorAll("p, li, article, h3, h4")].filter(visible) : [heading];
      });
      const body = Array.from(document.querySelectorAll("main :is(p, li, label, input, select, textarea, article)")).filter(visible);
      const content = [...new Set([...following, ...body])];
      return { count: content.length, hidden: content.filter(obstructed).map(element => element.textContent?.trim()) };
    });
    for (const position of [0, 300]) {
      await page.evaluate(top => scrollTo({ top, behavior: "instant" }), position);
      const { count, hidden } = await checkVisibleContent();
      expect(count).toBeGreaterThan(0);
      expect(hidden).toEqual([]);
    }
  });
}
