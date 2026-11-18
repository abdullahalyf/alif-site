import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { trips, travelContent as c } from "../src/content/travel";
import { project } from "../src/features/travel/map/geo";

for (const trip of trips) {
  test(`trip page ${trip.slug} has content, canonical metadata and a mini map`, async ({ page, request }) => {
    const response = await page.goto(c.tripHref(trip.slug));
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(trip.title);
    await expect(page.getByText(trip.story, { exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: c.placeMapLabel(trip.place) })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${c.tripHref(trip.slug)}$`));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`${c.tripHref(trip.slug)}/opengraph-image`));
    if (trip === trips[0]) expect((await request.get(`${c.tripHref(trip.slug)}/opengraph-image`)).headers()["content-type"]).toContain("image/png");
    await expect(page.getByRole("link", { name: c.backToTravel })).toHaveAttribute("href", c.path);
  });
}

test("gallery supports keyboard, swipe, dismissal and focus restoration", async ({ page }) => {
  const trip = trips[0];
  await page.goto(c.tripHref(trip.slug));
  const opener = page.getByRole("link", { name: c.openPhoto(1, trip.place) });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
  await expect(dialog.getByRole("button", { name: c.closeGallery })).toBeFocused();
  await dialog.press("ArrowRight");
  await expect(dialog.locator(".trip-lightbox-caption")).toContainText("2 / 3");
  await dialog.press("End");
  await expect(dialog.locator(".trip-lightbox-caption")).toContainText("3 / 3");
  await dialog.press("Home");
  const photo = dialog.locator(".trip-lightbox-photo");
  await photo.dispatchEvent("pointerdown", { pointerType: "touch", clientX: 250, clientY: 150 });
  await photo.dispatchEvent("pointerup", { pointerType: "touch", clientX: 100, clientY: 155 });
  await expect(dialog.locator(".trip-lightbox-caption")).toContainText("2 / 3");
  await dialog.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await dialog.getByRole("button", { name: c.closeGallery }).click();
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).not.toBe("hidden");
});

test("unknown travel slugs return HTTP 404", async ({ request }) => {
  expect((await request.get(c.tripHref("missing-demo-journey"))).status()).toBe(404);
});

test("travel stats and combined filters describe the actual demo dataset", async ({ page }) => {
  await page.goto(c.path);
  const stats = page.getByRole("region", { name: c.statsTitle });
  await expect(stats.getByText(String(trips.length), { exact: true })).toHaveCount(2);
  const places = page.getByRole("region", { name: c.placesTitle });
  await expect(places.getByRole("article")).toHaveCount(trips.length);
  await places.getByLabel(c.regionLabel, { exact: true }).selectOption("Sylhet");
  await expect(places.getByRole("article")).toHaveCount(2);
  await places.getByLabel(c.tagLabel, { exact: true }).selectOption("landscape");
  await expect(places.getByRole("article")).toHaveCount(1);
  await expect(places.getByRole("heading", { name: trips[0].place })).toBeVisible();
  await places.getByLabel(c.regionLabel, { exact: true }).selectOption("Khulna");
  await expect(places.getByText(c.noPlaces)).toBeVisible();
  await places.getByRole("button", { name: c.resetFilters }).click();
  await expect(places.getByRole("article")).toHaveCount(trips.length);
});

test("map progress, pin selection and place atmosphere follow the horizontal book", async ({ page }) => {
  await page.goto(c.path);
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  const index = 5;
  const pin = page.getByRole("link", { name: c.mapPinLabel(trips[index].place) });
  await pin.click();
  await expect(pin).toHaveAttribute("aria-current", "location");
  await expect(page.locator(".travel-book-counter")).toHaveText("06 / 08");
  const book = page.getByRole("region", { name: c.bookLabel });
  await expect(book.getByRole("heading", { name: trips[index].title })).toBeInViewport();
  const reduced = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const points = trips.map(project);
  const routeLengths = points.slice(1).map((point, step) => Math.hypot(point.x - points[step].x, point.y - points[step].y));
  const length = (segments: number[]) => segments.reduce((sum, segment) => sum + segment, 0);
  const offset = () => page.locator(".travel-route-map .route-visited").evaluate(element => parseFloat(getComputedStyle(element).strokeDashoffset));
  await expect.poll(offset).toBeCloseTo(reduced ? 0 : 1 - length(routeLengths.slice(0, index)) / length(routeLengths), 2);
  const rgb = trips[index].color.match(/[0-9a-f]{2}/g)!.map(part => parseInt(part, 16)).join(", ");
  await expect(page.locator(".journey-atmosphere")).toHaveCSS("background-color", `rgb(${rgb})`);
  if (reduced) {
    await expect(page.locator('.route-pin[data-state="active"] .route-pin-halo')).toHaveCSS("animation-name", "none");
  }
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".travel-book")).toHaveAttribute("data-in-view", "false");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("mouse dragging turns the book without activating its links", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mouse drag behavior");
  await page.goto(c.path);
  const book = page.getByRole("region", { name: c.bookLabel });
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  await book.scrollIntoViewIfNeeded();
  const box = (await book.boundingBox())!;
  const y = Math.max(120, Math.min(box.y + 100, page.viewportSize()!.height - 100));
  await page.mouse.move(box.x + box.width * 0.85, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.1, y, { steps: 12 });
  await page.mouse.up();
  await expect(page.locator(".travel-book-counter")).not.toHaveText("01 / 08");
  await expect(page).toHaveURL(c.path);
});

test("no-JS map shows the whole route and gallery photos remain ordinary links", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(c.path);
  await expect(page.locator(".travel-route-map .route-visited")).toHaveCSS("stroke-dashoffset", "0px");
  await expect(page.locator(".travel-places-grid article")).toHaveCount(trips.length);
  await page.goto(c.tripHref(trips[0].slug));
  const link = page.getByRole("link", { name: c.openPhoto(1, trips[0].place) });
  await expect(link).toHaveAttribute("href", trips[0].photos[0].src);
  const image = await page.request.get(trips[0].photos[0].src);
  expect(image.status()).toBe(200); expect(image.headers()["content-type"]).toContain("image/jpeg");
  await context.close();
});

test("touch swipe scrolls the native book without pinning the document", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Native touch behavior");
  await page.goto(c.path);
  await expect(page.locator(".travel-book")).toHaveAttribute("data-layout", "free");
  const book = page.getByRole("region", { name: c.bookLabel });
  await book.scrollIntoViewIfNeeded();
  const box = (await book.boundingBox())!;
  const y = Math.max(120, Math.min(box.y + 150, page.viewportSize()!.height - 100));
  const client = await page.context().newCDPSession(page);
  const start = box.x + box.width * 0.85;
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: start, y }] });
  for (let index = 1; index <= 8; index++) await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: start - box.width * 0.7 * index / 8, y }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => book.evaluate(element => element.scrollLeft)).toBeGreaterThan(100);
  await expect(page.locator(".travel-book-counter")).not.toHaveText("01 / 08");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await client.detach();
});

test("international travel links the Malaysia demo and maps the Dhaka route", async ({ page, request }) => {
  await page.goto(c.path);
  const section = page.getByRole("region", { name: c.internationalTitle });
  await expect(section.getByRole("img", { name: c.internationalRouteLabel(["Kuala Lumpur"]) })).toBeVisible();
  await expect(section.getByText(/Kuala Lumpur · Malaysia/)).toBeVisible();
  await expect(section.getByText(/DEMO — In this imagined visit/)).toBeVisible();
  await section.getByRole("link", { name: "A morning in Kuala Lumpur" }).click();
  await expect(page).toHaveURL(c.tripHref("kuala-lumpur"));
  await expect(page.getByRole("img", { name: c.internationalRouteLabel(["Kuala Lumpur"]) })).toBeVisible();
  const photo = await request.get("/images/travel/kuala-lumpur/1.jpg");
  expect(photo.ok()).toBe(true);
  expect(await (await request.get("/sitemap.xml")).text()).toContain(c.tripHref("kuala-lumpur"));
});
