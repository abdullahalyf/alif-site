import { waitForHydration } from "./helpers/routes";
import { expect, test } from "@playwright/test";
import { approachDetail, navHref, shell, site, workNavigation } from "../src/content/site";
import { diagramContent } from "../src/content/diagrams";
import { projects } from "../src/content/projects";

for (const link of shell.nav) {
  test(`navigation: ${link.label}`, async ({ page, isMobile }) => {
    await page.goto("/");
    await waitForHydration(page);
    if (isMobile) await page.getByRole("button", { name: shell.menu, exact: true }).click();
    const navigation = isMobile ? page.getByRole("dialog").getByRole("navigation") : page.getByRole("banner").getByRole("navigation");
    await navigation.getByRole("link", { name: link.label, exact: true }).click();
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
  await waitForHydration(page);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(shell.notFoundTitle);
  await page.getByRole("link", { name: shell.backHome }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
});

test("mobile menu supports keyboard dismissal and focus restoration", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu only");
  await page.goto("/");
  await waitForHydration(page);
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
  await context.close();
});

test("desktop Services opens by hover or keyboard and links to each Services section", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation only");
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const navigation = page.getByRole("banner").getByRole("navigation");
  const work = navigation.getByRole("link", { name: shell.workNavLabel, exact: true }).first();
  const projectsLink = navigation.getByRole("link", { name: workNavigation.dropdown[0].label });
  await expect(navigation.getByRole("link")).toHaveCount(5);
  await work.hover();
  await expect(projectsLink).toBeVisible();
  await page.mouse.move(0, 120);
  await expect(projectsLink).toBeHidden();
  await work.focus();
  await page.keyboard.press("Tab");
  await expect(projectsLink).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(projectsLink).toBeHidden();
  await expect(work).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/services");
  const subnav = page.getByRole("navigation", { name: workNavigation.label });
  for (const { label, href } of workNavigation.links) {
    await subnav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(href);
    await expect(subnav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    await expect(work).toHaveAttribute("data-active", "true");
  }
  for (const [path, label] of [
    [shell.projectHref(projects[0].slug), "Projects"],
    [diagramContent.path(projects[0].slug), "Projects"],
    [approachDetail.href(site.approach[0].slug), "Approach"],
  ]) {
    await page.goto(path);
    await expect(work).toHaveAttribute("data-active", "true");
    await expect(subnav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "location");
  }
});
