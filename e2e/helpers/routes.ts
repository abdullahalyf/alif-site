import { searchContent } from "../../src/content/search";
import { diagramContent } from "../../src/content/diagrams";
import { projects } from "../../src/content/projects";
import { getPosts } from "../../src/content/posts";
import { writingContent } from "../../src/content/site";
import { shell } from "../../src/content/site";

export const pageRoutes = [
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
