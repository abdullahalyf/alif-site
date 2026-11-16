import { expect, test } from "@playwright/test";
import { seo, shell, site } from "../src/content/site";
import { projects } from "../src/content/projects";

test("sitemap lists all pages and case studies with absolute canonical URLs", async ({ request }) => {
  const response = await request.get(seo.sitemapPath);
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
  const paths = [...Object.values(seo.pages).map((page) => page.path), ...projects.map((project) => shell.projectHref(project.slug))];
  expect(urls.map((url) => url.pathname).sort()).toEqual(paths.sort());
  expect(new Set(urls.map((url) => url.origin)).size).toBe(1);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`Sitemap: ${urls[0].origin}${seo.sitemapPath}`);
});

test("page and project metadata match content, and Home exposes Person JSON-LD", async ({ page, request }) => {
  for (const entry of [...Object.values(seo.pages), ...projects.map((project) => ({ title: project.title, description: project.summary, path: shell.projectHref(project.slug) }))]) {
    await page.goto(entry.path);
    await expect(page).toHaveTitle(entry.path === shell.home.href ? entry.title : `${entry.title} — ${site.name}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", entry.description);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /^https?:\/\//);
    expect(new URL((await canonical.getAttribute("href"))!).pathname).toBe(entry.path);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", entry.title);
  }
  await page.goto(shell.home.href);
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}");
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe(site.fullName);
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  const image = await request.get(new URL(imageUrl!).pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});
