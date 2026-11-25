import { expect, test } from "@playwright/test";
import { aboutPage, demoContent, skillProfile, site, shell } from "../src/content/site";
import { projects } from "../src/content/projects";

test("Home shows highlights and stats, and hides unpublished testimonials", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: demoContent.highlightsTitle, exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: site.achievements[0].title, exact: true })).toBeVisible();
  await expect(page.getByText(demoContent.statsNotice, { exact: true })).toBeVisible();
  for (const item of site.testimonials) {
    if (item.published) await expect(page.getByText(item.name, { exact: true })).toBeVisible();
    else await expect(page.getByText(item.quote, { exact: false })).toHaveCount(0);
  }
});

test("About includes education, skills, languages, interests and achievements", async ({ page }) => {
  await page.goto(shell.nav.find((item) => item.label === shell.aboutTitle)!.href);
  for (const title of [demoContent.educationLabel, skillProfile.label, demoContent.languagesLabel, demoContent.interestsLabel, aboutPage.achievements.title]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  for (const language of site.languages) await expect(page.getByText(language.name, { exact: true })).toBeVisible();
  await expect(page.getByText("Basic · DILC course", { exact: true })).toBeVisible();
});

test("Work lists seven complete projects and the retired portfolio route is 404", async ({ page, request }) => {
  await page.goto("/work");
  for (const project of projects) await expect(page.getByRole("link").filter({ has: page.getByRole("heading", { name: project.title, exact: true }) })).toHaveAttribute("href", shell.projectHref(project.slug));
  expect((await request.get("/work/portfolio")).status()).toBe(404);
});
