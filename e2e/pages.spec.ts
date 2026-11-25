import { expect, test } from "@playwright/test";
import { aboutContent, homeContent, navHref, pageContent, shell, site, workContent } from "../src/content/site";
import { projects } from "../src/content/projects";

test("Home includes every section and working selected-work links", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
  for (const title of [homeContent.aboutTitle, workContent.approachTitle, homeContent.servicesTitle, workContent.selectedTitle]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  for (const service of site.services) await expect(page.getByRole("heading", { name: service, exact: true })).toBeVisible();
  const row = page.getByRole("list", { name: workContent.carouselLabel });
  if (!isMobile) {
    await page.getByRole("button", { name: workContent.next, exact: true }).click();
    expect(await row.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  }
  const last = projects[projects.length - 1];
  await row.getByRole("link").filter({ has: page.getByRole("heading", { name: last.title, exact: true }) }).click();
  await expect(page).toHaveURL(shell.projectHref(last.slug));
});

test("About includes the supplied photo and every story chapter", async ({ page }) => {
  await page.goto(navHref("/about"));
  await expect(page.getByRole("img", { name: site.aboutPhoto.alt })).toBeVisible();
  await expect(page.getByRole("heading", { name: aboutContent.storyTitle })).toBeVisible();
  for (const chapter of site.story) await expect(page.getByRole("heading", { name: chapter.title, exact: true })).toBeVisible();
});

test("Approach includes every step, case studies include details and next project", async ({ page }) => {
  await page.goto(navHref("/approach"));
  for (const step of site.approach) await expect(page.getByRole("heading", { name: step.title, exact: true })).toBeVisible();
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    await page.goto(shell.projectHref(project.slug));
    for (const title of [pageContent.problem, pageContent.solution, pageContent.stack, pageContent.results]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(page.getByText(project.problem, { exact: true })).toBeVisible();
    const next = projects[(index + 1) % projects.length];
    await page.getByRole("navigation", { name: pageContent.nextProject }).getByRole("link").click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(next.title);
  }
});

test("all pages fit the viewport", async ({ page }) => {
  for (const path of [shell.home.href, ...shell.nav.filter((link) => !link.href.startsWith("#")).map((link) => link.href), ...projects.map((project) => shell.projectHref(project.slug))]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
});

test("Home shows the hero side photo, status card and system diagram", async ({ page }) => {
  await page.goto(shell.home.href);

  await expect(page.getByRole("img", { name: site.heroSide.alt })).toBeVisible();
  await expect(page.locator(".status-card__name")).toBeVisible();
  await expect(page.getByText(site.statusCard.availability, { exact: true })).toBeVisible();
  await expect(page.getByText(site.statusCard.building, { exact: true })).toBeVisible();
  for (const item of site.statusCard.stack) await expect(page.getByText(item, { exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: site.systemDiagram.label })).toBeVisible();
});

test("the hero status card shows a live Dhaka clock", async ({ page }) => {
  await page.goto(shell.home.href);

  const time = page.locator(".status-card__time");
  await expect(time).toBeVisible();
  await expect(time).toHaveText(/^\d{2}:\d{2}$/);
});
