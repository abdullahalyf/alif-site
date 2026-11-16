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
