import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

test("home page shows its heading and footer immediately", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(site.role);
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
  await page.addInitScript(() => sessionStorage.setItem("alif-intro-seen", "1"));
  await page.goto("/");
  const header = page.locator(".header");
  const section = page.locator(".night-section");
  await section.evaluate(element => scrollTo({
    top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.58,
    behavior: "instant",
  }));
  await expect(header).toHaveAttribute("data-compact", "");
  await expect.poll(async () => Math.round((await header.boundingBox())!.height)).toBe(56);
  expect((await header.boundingBox())!.y).toBe(0);
  expect((await section.boundingBox())!.y).toBeGreaterThan(56);
  await expect(header).toHaveCSS("background-color", "rgb(242, 237, 227)");
  await expect(header).toHaveCSS("color", "rgb(30, 28, 25)");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(242, 237, 227)");
  await expect(section.getByRole("heading", { level: 2 })).toHaveCSS("opacity", "1");
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
  expect(violations).toEqual([]);
  await testInfo.attach("dark-panel-mid-transition", { body: await page.screenshot(), contentType: "image/png" });
});
