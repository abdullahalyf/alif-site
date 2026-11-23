import { allTrips, travelContent } from "../src/content/travel";
import { expect, test } from "@playwright/test";
import { getPosts } from "../src/content/posts";
import { seo, site, writingContent } from "../src/content/site";
import { waitForHydration } from "./helpers/routes";

const published = getPosts({ includeDrafts: false });
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
test("Now renders the current factual update and is linked from Writing", async ({ page }) => {
  await page.goto(seo.pages.writing.path);
  await waitForHydration(page);
  // The footer also links to Now, so the link in the page body is the one
  // that should be followed.
  await page.locator("main").getByRole("link", { name: writingContent.nowLabel, exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(writingContent.nowTitle);
  for (const item of site.now) await expect(page.getByText(item, { exact: true })).toBeVisible();
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
  expect(parsed.items).toBe(published.length + allTrips.length);
  for (const post of published) expect(xml).toContain(writingContent.postHref(post.slug));
  for (const trip of allTrips) expect(xml).toContain(travelContent.tripHref(trip.slug));
  for (const post of drafts) expect(xml).not.toContain(writingContent.postHref(post.slug));
  expect((xml.match(/<item>/g) || []).length).toBe(published.length + allTrips.length);
});
test.describe("development draft article", () => {
  test.use({ baseURL: "http://localhost:3100" });
  test("renders the sample Markdown article with metadata, body and a route back", async ({ page }) => {
    const post = drafts.find((post) => post.slug === "hello-im-alif")!;
    await page.goto(writingContent.postHref(post.slug));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(post.title);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(28, 27, 24)");
    await expect(page).toHaveTitle(`${post.title} — ${site.name}`);
    await expect(page.locator(".post-prose")).toContainText("TODO(Alif)");
    await expect(page.getByText(writingContent.draft, { exact: true })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    await waitForHydration(page);
    await page.getByRole("link", { name: writingContent.back, exact: true }).click();
    await expect(page).toHaveURL(seo.pages.writing.path, { timeout: 15_000 });
    await expect(page.getByRole("link", { name: post.title, exact: true })).toBeVisible();
  });
});

test("Writing filters tech and travel and links back from a trip", async ({ page }) => {
  const { filters, filterLabel } = writingContent;
  await page.goto(filters.all.href);
  await waitForHydration(page);
  const nav = page.getByRole("navigation", { name: filterLabel });
  const list = page.locator(".post-list:visible");
  await nav.getByRole("link", { name: filters.travel.label }).click();
  await expect(page).toHaveURL(filters.travel.href);
  await expect(list.locator(":scope > li")).toHaveCount(allTrips.length);
  for (const trip of allTrips) {
    await expect(list.getByRole("link", { name: trip.title })).toHaveAttribute("href", travelContent.tripHref(trip.slug));
  }
  await list.getByRole("link", { name: allTrips[0].title }).click();
  await expect(page.getByRole("heading", { name: travelContent.moreStories })).toBeVisible();
  await page.getByRole("link", { name: travelContent.writingTravelLink }).click();
  await expect(page).toHaveURL(filters.travel.href);
  await nav.getByRole("link", { name: filters.tech.label }).click();
  await expect(list.locator(":scope > li")).toHaveCount(published.length);
});
