import { expect, test } from "@playwright/test";
import { travelContent } from "../src/content/travel";
import { aboutContent, aboutPage, site, skillProfile } from "../src/content/site";

test("the About page splits the intro between the photo and the copy", async ({ page }) => {
  await page.goto("/about");

  // The heading is a serif display line above the split.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
  await expect(page.getByRole("img", { name: site.aboutPhoto.alt })).toBeVisible();

  // Every paragraph of the intro is on the page, in order.
  await expect(page.getByText(aboutContent.brief, { exact: true })).toBeVisible();
});

test("the story chapters alternate sides and carry a bracketed label", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: aboutContent.storyTitle })).toBeVisible();

  const chapters = page.locator(".story-chapter");
  await expect(chapters).toHaveCount(site.story.length);

  for (const [index, chapter] of site.story.entries()) {
    const section = chapters.nth(index);
    await expect(section.getByRole("heading", { name: chapter.title, exact: true })).toBeVisible();
    // The label sits above the title in the caption.
    await expect(section.getByText(chapter.label, { exact: true })).toBeVisible();
  }

  // The photographs alternate sides down the page. On a narrow screen the
  // chapters stack in one column instead, so there is nothing to alternate.
  if ((page.viewportSize()?.width ?? 0) > 768) {
    const orders = await chapters.evaluateAll((nodes) =>
      nodes.map((node) => {
        const figure = node.querySelector("figure");
        return figure ? getComputedStyle(figure).order : "0";
      }),
    );
    expect(new Set(orders).size).toBeGreaterThan(1);
  }
});

test("About photos display without a blur or scroll transform", async ({ page }) => {
  await page.goto("/about");
  const photos = page.locator(".about-top__photo img, .education-timeline__photo img, .story-photo-frame img");
  expect(await photos.count()).toBeGreaterThan(1);
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect(photo).toHaveCSS("filter", "brightness(0.88)");
    await expect(photo).toHaveCSS("transform", "none");
  }
});

test("the education timeline has a rule that fills as it scrolls", async ({ page }) => {
  await page.goto("/about");

  const timeline = page.locator(".education-timeline");
  await expect(timeline).toBeVisible();
  await expect(timeline.locator("article")).toHaveCount(site.education.length);

  for (const item of site.education) {
    const entry = timeline.getByRole("article").filter({ has: page.getByRole("heading", { name: item.title, exact: true }) });
    const image = entry.getByRole("img", { name: item.image.alt });
    await expect(image).toBeVisible();
    const photo = (await image.boundingBox())!;
    const heading = (await entry.getByRole("heading").boundingBox())!;
    expect(page.viewportSize()!.width < 768 ? photo.y < heading.y : photo.x > heading.x).toBe(true);
  }

  expect((await page.getByRole("heading", { name: aboutPage.achievements.title }).boundingBox())!.y)
    .toBeGreaterThan((await timeline.boundingBox())!.y + (await timeline.boundingBox())!.height);

  // The rule is drawn beside the entries, and it grows as they scroll past.
  const line = timeline.locator(".education-timeline__line");
  await expect(line).toBeVisible();

  await timeline.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const filled = await line
    .locator(".education-timeline__fill")
    .evaluate((node) => node.getBoundingClientRect().height);

  expect(filled).toBeGreaterThan(0);
});

test("skills show the workflow and honest levels alongside language chips", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByText(skillProfile.intro)).toBeVisible();
  for (const step of skillProfile.workflow) await expect(page.getByText(step, { exact: true })).toBeVisible();

  for (const group of site.skills) {
    for (const item of group.items) {
      const row = page.locator(".skill-card li").filter({ hasText: item.name });
      await expect(row.getByText(item.note)).toBeVisible();
      await expect(row.getByRole("meter", { name: item.name })).toHaveAttribute("value", String(item.level));
    }
  }

  for (const language of site.languages) {
    const chip = page.locator(".chip-list--languages .chip").filter({ hasText: language.name });
    await expect(chip).toBeVisible();
    await expect(chip).toContainText(language.level);
  }
});

test("the achievements are a table with one row per entry", async ({ page }) => {
  await page.goto("/about");
  const rows = page.locator(".achievements-table tbody tr");
  await expect(rows).toHaveCount(aboutPage.achievements.rows.length);
  await expect(rows.first()).toContainText(aboutPage.achievements.rows[0].title);
  const dimensions = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.page).toBe(dimensions.viewport);
});

test("the travel strip and its scrubber stay in sync", async ({ page, isMobile }) => {
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const strip = page.getByRole("region", { name: travelContent.teaserStripLabel });
  const scrubber = page.getByRole("slider", { name: travelContent.teaserProgress });
  const offset = () => strip.evaluate((element) => element.scrollLeft);
  await expect(scrubber).toHaveValue("0");
  await scrubber.focus();
  await scrubber.press("End");
  await expect(scrubber).toHaveValue("100");
  await expect.poll(offset).toBeGreaterThan(0);
  await scrubber.press("Home");
  await expect.poll(offset).toBe(0);
  if (!isMobile) {
    await strip.hover();
    await page.mouse.wheel(0, 150);
    await expect.poll(async () => Number(await scrubber.inputValue())).toBeGreaterThan(0);
  }
});
