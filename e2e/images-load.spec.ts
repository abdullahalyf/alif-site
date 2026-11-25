import { expect, test } from "@playwright/test";

for (const path of ["/", "/about", "/travel"]) {
  test(`every image on ${path} loads after scrolling through the page`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto(path);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(60);
    }
    await page.waitForLoadState("networkidle");
    const findBroken = () => page.locator("main img").evaluateAll((images) =>
      images.filter((element) => { const image = element as HTMLImageElement; const rect = image.getBoundingClientRect(); const visible = getComputedStyle(image).display !== "none" && rect.width > 0 && rect.left < window.innerWidth && rect.right > 0; return visible && !image.closest("dialog") && (!image.complete || image.naturalWidth === 0); }).map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src),
    );
    const nudge = () => page.locator("main img").evaluateAll((images) => {
      for (const element of images) { const image = element as HTMLImageElement; if (!image.complete && getComputedStyle(image).display !== "none") image.scrollIntoView({ block: "center", inline: "nearest" }); }
    });
    await nudge();
    await expect.poll(async () => { const broken = await findBroken(); if (broken.length) await nudge(); return broken; }, { timeout: 40_000, message: path }).toEqual([]);
    
  });
}
