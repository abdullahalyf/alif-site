import { allTrips, travelContent } from "../src/content/travel";
import { expect, test } from "@playwright/test";
import { getPosts } from "../src/content/posts";
import { seo, site, writingContent } from "../src/content/site";
import { waitForHydration } from "./helpers/routes";

const published = getPosts({ includeDrafts: false });
const datedTrips = allTrips.filter((trip) => trip.date);
const drafts = getPosts({ includeDrafts: true }).filter((post) => post.draft);
test("Writing lists published posts and hides drafts from production", async ({ page, request }) => {
  await page.goto(seo.pages.writing.path);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(writingContent.title);
  for (const post of published) await expect(page.getByRole("link", { name: post.title, exact: true })).toHaveAttribute("href", writingContent.postHref(post.slug));
  if (!published.length) await expect(page.getByText(writingContent.empty)).toBeVisible();
  for (const post of drafts) {
    await expect(page.getByRole("link", { name: post.title, exact: true })).toHaveCount(0);
    const response = await request.get(writingContent.postHref(post.slug)); expect(response.status()).toBe(404);
    expect(await response.text()).not.toContain(post.body);
  }
});
test("RSS opens as a readable page in a browser and the footer links to it", async ({ page, request }) => {
  const response = await request.get(writingContent.rssPath, { headers: { accept: "text/html" } });
  expect(response.headers()["content-type"]).toContain("text/html");
  expect(await response.text()).toContain(writingContent.rssPage.title);
  await page.goto(seo.pages.writing.path);
  await expect(page.getByRole("link", { name: writingContent.rssLabel })).toHaveAttribute("href", writingContent.rssPath);
});
test("RSS is valid XML and includes published tech and travel posts", async ({ request, page }) => {
  const response = await request.get(writingContent.rssPath); expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await response.text();
  const parsed = await page.evaluate((source) => {
    const document = new DOMParser().parseFromString(source, "application/xml");
    return { errors: document.querySelectorAll("parsererror").length, items: document.querySelectorAll("channel > item").length };
  }, xml);
  expect(parsed.errors).toBe(0);
  expect(parsed.items).toBe(published.length + datedTrips.length);
  for (const post of published) expect(xml).toContain(writingContent.postHref(post.slug));
  for (const trip of datedTrips) expect(xml).toContain(travelContent.tripHref(trip.slug));
  for (const post of drafts) expect(xml).not.toContain(writingContent.postHref(post.slug));
  expect((xml.match(/<item>/g) || []).length).toBe(published.length + datedTrips.length);
});
test("a post opens with its cover, read time and a route back", async ({ page }) => {
  const post = published[0];
  await page.goto(writingContent.postHref(post.slug));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(post.title);
  await expect(page).toHaveTitle(`${post.title} — ${site.name}`);
  await expect(page.locator(".post-cover img")).toBeVisible();
  await expect(page.getByText(writingContent.draft, { exact: true })).toHaveCount(0);
  await waitForHydration(page);
  await page.getByRole("link", { name: writingContent.back, exact: true }).click();
  await expect(page).toHaveURL(seo.pages.writing.path, { timeout: 15_000 });
});

test("Writing filters tech and travel and links back from a trip", async ({ page }) => {
  const { filters, filterLabel } = writingContent;
  await page.goto(filters.all.href);
  await waitForHydration(page);
  const nav = page.getByRole("navigation", { name: filterLabel });
  const list = page.locator(".post-list:visible");
  await nav.getByRole("link", { name: filters.travel.label, exact: true }).click();
  await expect(page).toHaveURL(filters.travel.href);
  await expect(list.locator(":scope > li")).toHaveCount(datedTrips.length);
  for (const trip of datedTrips) {
    await expect(list.getByRole("link", { name: trip.title })).toHaveAttribute("href", travelContent.tripHref(trip.slug));
  }
  await list.getByRole("link", { name: datedTrips[0].title }).click();
  await expect(page.getByRole("heading", { name: travelContent.moreStories })).toBeVisible();
  await page.getByRole("link", { name: travelContent.writingTravelLink }).click();
  await expect(page).toHaveURL(filters.travel.href);
  await nav.getByRole("link", { name: filters.tech.label, exact: true }).click();
  await expect(list.locator(":scope > li")).toHaveCount(published.filter((post) => post.category === "tech").length);
  for (const key of ["tech-economy", "my-take"] as const) {
    await page.goto(filters[key].href);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(writingContent.title);
    await expect(list.locator(":scope > li")).toHaveCount(published.filter((post) => post.category === key).length || 0);
  }
});
