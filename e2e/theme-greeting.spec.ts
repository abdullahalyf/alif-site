import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { greetingIntro, homeContent, shell, site } from "../src/content/site";
import { waitForHydration } from "./helpers/routes";

test("the header and drawer share a theme choice that survives reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/about");
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(28, 27, 24)");
  await waitForHydration(page);
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(root).toHaveAttribute("data-theme", "dark");

  await page.getByRole("banner").getByRole("button", { name: shell.useLightTheme }).click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.reload({ waitUntil: "commit" });
  await expect(root).toHaveAttribute("data-theme", "light");
  await waitForHydration(page);

  await page.getByRole("button", { name: shell.menu, exact: true }).click();
  const drawer = page.getByRole("dialog", { name: shell.menu });
  await drawer.getByRole("button", { name: shell.useDarkTheme }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(drawer.getByRole("button", { name: shell.useLightTheme })).toBeFocused();
});

for (const colorScheme of ["light", "dark"] as const) {
  for (const route of ["/", "/about", "/travel", "/contact", "/uses", "/work", "/writing"]) {
    test(`${colorScheme} theme passes axe on ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript(theme => localStorage.setItem("alif-theme", theme), colorScheme);
      await page.goto(route);
      await waitForHydration(page);
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
      await page.evaluate(() => document.fonts.ready);
      expect((await new AxeBuilder({ page }).setLegacyMode().analyze()).violations).toEqual([]);
    });
  }
}

test("the greeting plays once per visit, only when the visit starts on Home", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "commit" });
  const overlay = page.locator("[data-intro]");
  await expect(overlay.locator("text")).toHaveText(greetingIntro.map(({ word }) => word));
  await expect(overlay).toHaveAttribute("aria-hidden", "true");
  await page.keyboard.press("Escape");
  await expect(overlay).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-intro-pending", "");

  await page.reload();
  await waitForHydration(page);
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(overlay).toHaveCount(0);

  await page.getByRole("link", { name: homeContent.aboutLink }).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.getByRole("link", { name: site.logoText }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(overlay).toHaveCount(0);
});
