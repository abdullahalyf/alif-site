import { travelContent } from "../../src/content/travel";
import { searchContent } from "../../src/content/search";
import { diagramContent } from "../../src/content/diagrams";
import { projects } from "../../src/content/projects";
import { getPosts } from "../../src/content/posts";
import { writingContent } from "../../src/content/site";
import { shell } from "../../src/content/site";
import type { Page } from "@playwright/test";

/**
 * Waits until the client has taken over the page.
 *
 * The keyboard shortcut is attached by a client component, so a key pressed
 * straight after `goto` can arrive before the listener exists. This waits for
 * a marker that only the hydrated app sets.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const root = document.documentElement;
    return (
      root.dataset.hydrated === "true" ||
      document.body.dataset.hydrated === "true"
    );
  });
}


export const pageRoutes = [
  travelContent.path,
  ...searchContent.pages.map((page) => page.href),
  ...projects.map((project) => diagramContent.path(project.slug)),
  "/",
  "/about",
  "/approach",
  "/work",
  "/writing",
  "/now",
  ...getPosts({ includeDrafts: false }).map((post) =>
    writingContent.postHref(post.slug),
  ),
  ...projects.map((project) => shell.projectHref(project.slug)),
];

export const previewRoutes = getPosts({ includeDrafts: true })
  .filter((post) => post.draft)
  .map((post) => writingContent.postHref(post.slug));
