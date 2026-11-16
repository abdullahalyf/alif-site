import { expect, test } from "@playwright/test";
import { projects } from "../src/content/projects";
import { getPosts } from "../src/content/posts";
import { shell, site, writingContent } from "../src/content/site";

test("case studies expose CreativeWork JSON-LD", async ({ page }) => {
  const project = projects[0];
  await page.goto(shell.projectHref(project.slug));
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(data["@type"]).toBe("CreativeWork");
  expect(data.name).toBe(project.title);
  expect(data.creator.name).toBe(site.fullName);
});
for (const post of getPosts({ includeDrafts: false })) {
  test(`${post.slug} exposes BlogPosting JSON-LD`, async ({ page }) => {
    await page.goto(writingContent.postHref(post.slug));
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe(post.title);
    expect(data.datePublished).toBe(post.date);
    expect(data.author.name).toBe(site.fullName);
    const code = page.locator(".post-prose pre").first();
    await code.focus();
    await expect(code).toBeFocused();
    if (await code.evaluate((element) => element.scrollWidth > element.clientWidth)) {
      await code.press("ArrowRight");
      await expect.poll(() => code.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    }
    expect(new URL(data.mainEntityOfPage).pathname).toBe(writingContent.postHref(post.slug));
  });
}
