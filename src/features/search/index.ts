import { projects } from "@/content/projects";
import { getPosts } from "@/content/posts";
import { seo } from "@/content/site";
import { searchContent } from "@/content/search";
import { diagrams, diagramContent } from "@/content/diagrams";
import { searchIndexSchema } from "@/content/schemas/search";
export function buildSearchIndex() {
  return searchIndexSchema.parse([
    ...[
      ...Object.values(seo.pages).map((page) => ({
        title: page.title,
        description: page.description,
        href: page.path,
      })),
      ...searchContent.pages,
    ].map((page) => ({ ...page, type: "page" })),
    ...projects.map((project) => ({
      title: project.title,
      description: project.summary,
      href: `/work/${project.slug}`,
      type: "project",
    })),
    ...projects.map((project) => ({
      title: diagrams[project.slug].title,
      description: diagrams[project.slug].description,
      href: diagramContent.path(project.slug),
      type: "page",
    })),
    ...getPosts({ includeDrafts: false }).map((post) => ({
      title: post.title,
      description: post.summary,
      href: `/writing/${post.slug}`,
      type: "post",
    })),
  ]);
}
