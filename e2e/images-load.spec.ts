import { expect, test } from "@playwright/test";

for (const path of ["/", "/about", "/travel"]) {
  test(`every image on ${path} loads after scrolling through the page`, async ({ page }) => {
    await page.goto(path);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(60);
    }
    await page.waitForLoadState("networkidle");
    const broken = await page.locator("main img").evaluateAll((images) =>
      images.filter((element) => { const image = element as HTMLImageElement; const rect = image.getBoundingClientRect(); const visible = getComputedStyle(image).display !== "none" && rect.width > 0 && rect.left < window.innerWidth && rect.right > 0; return visible && !image.closest("dialog") && (!image.complete || image.naturalWidth === 0); }).map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src),
    );
    expect(broken).toEqual([]);
  });
}
