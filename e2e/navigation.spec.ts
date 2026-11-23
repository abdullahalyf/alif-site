import { waitForHydration } from "./helpers/routes";
import { expect, test } from "@playwright/test";
import { navHref, shell, site, workNavigation } from "../src/content/site";
import { projects } from "../src/content/projects";

for (const link of shell.nav) {
  test(`navigation: ${link.label}`, async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: shell.menu, exact: true }).click();
    const navigation = isMobile ? page.getByRole("dialog").getByRole("navigation") : page.getByRole("banner").getByRole("navigation");
    await navigation.getByRole("link", { name: isMobile && link.href === "/work" ? workNavigation.links[0].label : link.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${link.href.replace("/", "\\/")}$`));
    if (link.href.startsWith("#")) await expect(page.getByRole("contentinfo")).toBeInViewport();
    // A page carries its own heading, which does not have to repeat the
    // navigation label — it only has to be there and say something.
    else {
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toHaveCount(1);
      expect((await heading.textContent())?.trim()).toBeTruthy();
    }
    if (isMobile) await expect(page.getByRole("dialog")).not.toBeVisible();
  });
}

test("every case study opens from Work", async ({ page }) => {
  for (const project of projects) {
    await page.goto(navHref("/work"));
    await waitForHydration(page);
    await page.getByRole("link").filter({ has: page.getByRole("heading", { name: project.title, exact: true }) }).click();
    await expect(page).toHaveURL(shell.projectHref(project.slug), { timeout: 15_000 });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
  }
});

test("unknown case study returns 404 with a route home", async ({ page }) => {
  const response = await page.goto(`/work/unknown-project-${test.info().project.name}`);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shell.notFoundTitle);
  await page.getByRole("link", { name: shell.backHome }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.role);
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.role);
  const about = page.getByRole("banner").getByRole("link", { name: shell.aboutTitle, exact: true });
  await about.filter({ visible: true }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shell.aboutTitle);
  await context.close();
});

test("desktop Work opens by hover or keyboard and links to each Work section", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation only");
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const navigation = page.getByRole("banner").getByRole("navigation");
  const work = navigation.getByRole("link", { name: shell.workNavLabel, exact: true }).first();
  const projects = navigation.getByRole("link", { name: workNavigation.links[0].label });
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await work.hover();
  await expect(projects).toBeVisible();
  await page.mouse.move(0, 120);
  await expect(projects).toBeHidden();
  await work.focus();
  await page.keyboard.press("Tab");
  await expect(projects).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(projects).toBeHidden();
  await expect(work).toBeFocused();
  await page.keyboard.press("Enter");
  const subnav = page.getByRole("navigation", { name: workNavigation.label });
  for (const { label, href } of workNavigation.links) {
    await subnav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(href);
    await expect(subnav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
  }
});
