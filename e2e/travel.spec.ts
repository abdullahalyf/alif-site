import { expect, test } from "@playwright/test";
import { trips, travelContent as c } from "../src/content/travel";
import { DESKTOP_BOOK_QUERY } from "../src/features/travel/book";

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
test("desktop pin responds to vertical scrolling and releases at the touch breakpoint", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "Desktop pin behavior only");
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(c.path);
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "pinned");
  const geometry = await page.locator(".travel-book-stage").evaluate(element => ({
    start: element.getBoundingClientRect().top + scrollY - 96,
    distance: element.querySelector(".travel-book-track")!.scrollWidth - element.querySelector(".travel-book-viewport")!.clientWidth,
  }));
  await page.evaluate(({ start, distance }) => scrollTo({ top: start + distance * 3 / 7, behavior: "instant" }), geometry);
  await expect(page.locator(".travel-book-counter")).toHaveText("04 / 08");
  await expect(page.getByRole("heading", { name: trips[3].title })).toBeInViewport();
  const controls = await page.locator(".travel-book-controls").boundingBox();
  expect(controls!.y + controls!.height).toBeLessThanOrEqual(720);
  await page.setViewportSize({ width: 800, height: 720 });
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "snap");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});
test("keyboard paging works in pinned, touch and reduced-motion modes", async ({ page }) => {
  await page.goto(c.path);
  const pinned = await page.evaluate((query) => matchMedia(query).matches && !matchMedia("(prefers-reduced-motion: reduce)").matches, DESKTOP_BOOK_QUERY);
  const root = page.locator(".travel-book");
  await expect(root).toHaveAttribute("data-layout", pinned ? "pinned" : "snap");
  if (pinned) await expect(page.locator(".pin-spacer .travel-book-stage")).toHaveCount(1);
  else await expect(page.locator(".pin-spacer")).toHaveCount(0);
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
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "snap");
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
