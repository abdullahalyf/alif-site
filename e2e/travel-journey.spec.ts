import { expect, test } from "@playwright/test";
import { trips, travelContent as c } from "../src/content/travel";

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
