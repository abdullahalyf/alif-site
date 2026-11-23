import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

test("pages send the required security headers without a CSP", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const headers = response.headers();
  expect(headers["strict-transport-security"]).toBe("max-age=31536000; includeSubDomains");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=()");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toBeUndefined();
});
test("photo slots revalidate and existing assets stay immutable", async ({ request, page }) => {
  const slot = await request.get(site.heroPhoto.src);
  expect(slot.status()).toBe(200);
  expect(slot.headers()["cache-control"]).toBe("public, max-age=0, must-revalidate");

  const original = await request.get("/images/alif-portrait.jpg");
  expect(original.status()).toBe(200);
  expect(original.headers()["cache-control"]).toBe("public, max-age=31536000, immutable");
  await page.goto("/");
  const font = await page.locator('link[rel="preload"][as="font"]').first().getAttribute("href");
  expect(font).toBeTruthy();
  const response = await request.get(font!);
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("immutable");
  expect(response.headers()["cache-control"]).toContain("max-age=31536000");
});
