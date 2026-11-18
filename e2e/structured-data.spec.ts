import { expect, test } from "@playwright/test";
import { projects } from "../src/content/projects";
import { getPosts } from "../src/content/posts";
import { shell, site, writingContent } from "../src/content/site";
import { waitForHydration } from "./helpers/routes";

test("case studies expose CreativeWork JSON-LD", async ({ page }) => {
  const project = projects[0];
  await page.goto(shell.projectHref(project.slug));
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(data["@type"]).toBe("CreativeWork");
  expect(data.name).toBe(project.title);
  expect(data.creator.name).toBe(site.fullName);
});
for (const post of getPosts({ includeDrafts: false })) {
  test(`${post.slug} exposes BlogPosting JSON-LD and a share image`, async ({ page, request }) => {
    await page.goto(writingContent.postHref(post.slug));
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe(post.title);
    expect(data.datePublished).toBe(post.date);
    expect(data.author.name).toBe(site.fullName);
    expect(new URL(data.mainEntityOfPage).pathname).toBe(writingContent.postHref(post.slug));
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    const image = await request.get(new URL(og!).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
  });
}

// The old check could pass without exercising scrolling on a wide code block.
test("Writing scrolls a focused overflowing code block by keyboard", async ({ page }) => {
  await page.goto(writingContent.postHref("offline-first-shops"));
  await waitForHydration(page);
  await page.evaluate(() => document.fonts.ready);
  const code = page.locator(".post-prose pre").first();
  await code.evaluate((element) => { element.style.maxWidth = "15rem"; });
  await expect.poll(() => code.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeGreaterThan(0);
  await code.focus();
  await expect(code).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => code.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press("ArrowLeft");
  await expect.poll(() => code.evaluate((element) => element.scrollLeft)).toBe(0);
});
