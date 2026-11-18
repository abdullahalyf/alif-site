import { expect, test } from "@playwright/test";
import { aboutContent, site } from "../src/content/site";

test("the About page splits the intro between the photo and the copy", async ({ page }) => {
  await page.goto("/about");

  // The heading is a serif display line above the split.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About me");
  await expect(page.getByRole("img", { name: site.aboutPhoto.alt })).toBeVisible();

  // Every paragraph of the intro is on the page, in order.
  for (const paragraph of site.about) {
    await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
  }
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

test("the story photographs drift with the scroll", async ({ page }) => {
  // The photographs stay still when the reader has asked for less motion, and
  // that is covered by the next test.
  test.skip(
    test.info().project.name === "reduced-motion",
    "the photographs stay still when motion is reduced",
  );
  await page.goto("/about");
  await page.locator(".story-photo-frame").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const before = await page
    .locator(".story-photo")
    .first()
    .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).m42);

  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(400);

  const after = await page
    .locator(".story-photo")
    .first()
    .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).m42);

  // The photograph moved, and it moved up rather than down.
  expect(after).not.toBe(before);
  expect(after).toBeLessThan(before);
});

test("the story photographs stay still under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await page.locator(".story-photo-frame").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const drift = await page
    .locator(".story-photo")
    .first()
    .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).m42);

  expect(drift).toBe(0);
});

test("the education timeline has a rule that fills as it scrolls", async ({ page }) => {
  await page.goto("/about");

  const timeline = page.locator(".education-timeline");
  await expect(timeline).toBeVisible();
  await expect(timeline.locator("article")).toHaveCount(site.education.length);

  for (const item of site.education) {
    await expect(timeline.getByRole("heading", { name: item.title, exact: true })).toBeVisible();
  }

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

test("the skills and the languages read as chips", async ({ page }) => {
  await page.goto("/about");

  for (const group of site.skills) {
    for (const item of group.items) {
      await expect(page.locator(".chip", { hasText: item }).first()).toBeVisible();
    }
  }

  for (const language of site.languages) {
    const chip = page.locator(".chip-list--languages .chip").filter({ hasText: language.name });
    await expect(chip).toBeVisible();
    await expect(chip).toContainText(language.level);
  }
});

test("the achievements are cards", async ({ page }) => {
  await page.goto("/about");
  const cards = page.locator(".highlight-card");
  await expect(cards).toHaveCount(site.achievements.length);
  await expect(cards.first()).toContainText(site.achievements[0].title);
  const dimensions = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.page).toBe(dimensions.viewport);
});
