import { expect, test } from "@playwright/test";
import { shell, site } from "../src/content/site";
import { projects } from "../src/content/projects";

for (const link of shell.nav) {
  test(`navigation: ${link.label}`, async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: shell.menu, exact: true }).click();
    const navigation = isMobile ? page.getByRole("dialog").getByRole("navigation") : page.getByRole("banner").getByRole("navigation");
    await navigation.getByRole("link", { name: link.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${link.href.replace("/", "\\/")}$`));
    if (link.href.startsWith("#")) await expect(page.getByRole("contentinfo")).toBeInViewport();
    else await expect(page.getByRole("heading", { level: 1 })).toContainText(link.label);
    if (isMobile) await expect(page.getByRole("dialog")).not.toBeVisible();
  });
}

test("every case study opens from Work", async ({ page }) => {
  for (const project of projects) {
    await page.goto(shell.nav[0].href);
    await page.getByRole("link", { name: project.title, exact: true }).click();
    await expect(page).toHaveURL(shell.projectHref(project.slug));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
  }
});

test("unknown case study returns 404 with a route home", async ({ page }) => {
  const response = await page.goto(`/work/unknown-project-${test.info().project.name}`);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shell.notFoundTitle);
  await page.getByRole("link", { name: shell.backHome }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
});

test("mobile menu supports keyboard dismissal and focus restoration", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: shell.menu, exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("page content and navigation work without JavaScript", async ({ browser, isMobile }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: isMobile ? { width: 390, height: 844 } : { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
  const about = page.getByRole("banner").getByRole("link", { name: shell.aboutTitle, exact: true });
  await about.filter({ visible: true }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shell.aboutTitle);
  await context.close();
});
