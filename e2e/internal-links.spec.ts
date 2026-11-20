import { expect, test } from "@playwright/test";
import { pageRoutes, previewRoutes } from "./helpers/routes";

for (const [mode, routes] of [["production", pageRoutes], ["preview", previewRoutes]] as const) {
 test.describe(`${mode} links`, () => {
  if (mode === "preview") {
    // Inspect the rendered anchors without the preview client's HMR and asset
    // requests running while the test compiles and probes destinations.
    test.use({ baseURL: "http://localhost:3100", javaScriptEnabled: false });
    test.describe.configure({ timeout: 120_000 });
  }
  for (const path of routes) {
  test(`every internal link on ${path} returns 200`, async ({ page, request }, testInfo) => {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);

    const urls = await page.locator("a[href]").evaluateAll((anchors) => {
      const origin = window.location.origin;
      const destinations = anchors.flatMap((anchor) => {
        const url = new URL(anchor.getAttribute("href")!, document.baseURI);
        if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) return [];
        url.hash = "";
        return [url.href];
      });
      return [...new Set(destinations)];
    });
    expect(urls.length, `No internal links found on ${path}`).toBeGreaterThan(0);

    const results: { url: string; status?: number; error?: string }[] = [];
    for (const url of urls) {
      try {
        const destination = await request.get(url, { maxRedirects: 0 });
        results.push({ url, status: destination.status() });
        await destination.dispose();
      } catch (error) {
        results.push({ url, error: String(error) });
      }
    }
    await testInfo.attach("internal-links", {
      body: JSON.stringify({ source: path, results }, null, 2),
      contentType: "application/json",
    });
    expect(results.filter((result) => result.status !== 200), `Broken internal links on ${path}`).toEqual([]);
  });
}

 });
}
