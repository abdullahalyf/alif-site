import { expect, test } from "@playwright/test";
import { trips, travelContent as c } from "../src/content/travel";

test("travel loads with all journeys and its places grid", async ({ page, request }) => {
  const response = await page.goto(c.path); expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", c.description);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/travel$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/travel\/opengraph-image/);
  await expect(page.getByRole("heading", { name: c.placesTitle })).toBeVisible();
  const book = page.getByRole("region", { name: c.bookLabel });
  await expect(book.getByRole("article")).toHaveCount(trips.length);
  for (const trip of trips) await expect(book.getByRole("heading", { name: trip.title })).toHaveCount(1);
  expect((await request.get(`${c.path}/opengraph-image`)).headers()["content-type"]).toContain("image/png");
  expect(await (await request.get("/sitemap.xml")).text()).toContain(`${c.path}</loc>`);
});
test("wheel is scoped to the book, edges pass through and the page never pins", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mouse wheel behavior");
  await page.goto(c.path);
  const book = page.getByRole("region", { name: c.bookLabel });
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  await book.scrollIntoViewIfNeeded();
  const hover = async () => {
    const box = (await book.boundingBox())!;
    await page.mouse.move(box.x + 80, Math.max(100, Math.min(box.y + 80, page.viewportSize()!.height - 80)));
  };
  await hover();
  const initialY = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 1000);
  const offset = () => book.evaluate(element => {
    const transform = getComputedStyle(element.firstElementChild!).transform;
    return transform === "none" ? element.scrollLeft : -new DOMMatrixReadOnly(transform).m41;
  });
  await expect.poll(offset).toBeGreaterThan(100);
  expect(Math.abs(await page.evaluate(() => scrollY) - initialY)).toBeLessThan(3);
  await page.mouse.move(3, 300);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(initialY + 50);
  await book.focus(); await book.press("End"); await book.scrollIntoViewIfNeeded(); await hover();
  await expect(page.getByRole("button", { name: c.next })).toBeDisabled();
  const endY = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(endY + 50);
  await book.focus(); await book.press("Home"); await book.scrollIntoViewIfNeeded(); await hover();
  await expect(page.getByRole("button", { name: c.previous })).toBeDisabled();
  const startY = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, -250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(startY - 30);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
test("free travel scroll can stop between trips with interpolated progress", async ({ page, isMobile }) => {
  await page.goto(c.path);
  const book = page.getByRole("region", { name: c.bookLabel });
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  await book.evaluate(element => element.scrollIntoView({ block: "start" }));
  await expect(book).toHaveCSS("scroll-snap-type", "none");
  const width = await book.evaluate(element => element.clientWidth);
  const halfway = Math.round(width * 0.45);
  if (isMobile) {
    await book.evaluate((element, left) => element.scrollTo({ left, behavior: "instant" }), halfway);
  } else {
    const box = (await book.boundingBox())!;
    await page.mouse.move(box.x + 50, box.y + 60);
    await page.mouse.wheel(halfway, 0);
  }
  const renderedOffset = () => book.evaluate(element => {
    const transform = getComputedStyle(element.firstElementChild!).transform;
    return transform === "none" ? element.scrollLeft : -new DOMMatrixReadOnly(transform).m41;
  });
  await expect.poll(renderedOffset).toBeCloseTo(halfway, 0);
  await expect.poll(() => page.locator(".travel-book-progress span").evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)).toBeCloseTo(1.45 / trips.length, 2);
  await expect.poll(() => page.locator(".journey-atmosphere__tint").evaluate(element => Number(getComputedStyle(element).opacity))).toBeCloseTo(0.45, 2);
  const counter = page.locator(".travel-book-counter-number");
  const reduced = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  await expect(counter).toHaveText(reduced ? "01" : /^01\.[45]$/);
  await expect(page.locator(".travel-book-counter")).toHaveText("01 / 08");
  await expect(page.getByRole("button", { name: c.previous })).toBeEnabled();
  await book.press("ArrowRight");
  await expect.poll(renderedOffset).toBeCloseTo(width, 0);
});
test("keyboard paging works in desktop, touch and reduced-motion modes", async ({ page }) => {
  await page.goto(c.path);
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  const book = page.getByRole("region", { name: c.bookLabel });
  await book.focus(); await book.press("ArrowRight");
  await expect(page.locator(".travel-book-counter")).toHaveText("02 / 08");
  await book.press("End");
  await expect(page.locator(".travel-book-counter")).toHaveText("08 / 08");
  await expect(book.getByRole("heading", { name: trips[7].title })).toBeInViewport({ timeout: 15_000 });
  await book.press("Home");
  await expect(page.locator(".travel-book-counter")).toHaveText("01 / 08");
  await page.getByRole("link", { name: c.aboutLink, exact: true }).click();
  await expect(page).toHaveURL(c.aboutPath);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
test("reduced motion reveals every page without pinning or hidden text", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(c.path);
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  const book = page.getByRole("region", { name: c.bookLabel });
  for (const trip of trips) {
    const heading = book.getByRole("heading", { name: trip.title });
    await heading.scrollIntoViewIfNeeded(); await expect(heading).toBeInViewport();
    await expect(heading).toHaveCSS("opacity", "1");
  }
});
test("no-JS output is a readable normal list", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage(); await page.goto(c.path);
  await expect(page.locator(".travel-book")).not.toHaveAttribute("data-layout");
  await expect(page.locator(".travel-book-track")).toHaveCSS("display", "grid");
  for (const trip of trips) await expect(page.getByRole("heading", { name: trip.title })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
