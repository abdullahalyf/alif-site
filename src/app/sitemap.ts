import { getPosts } from "@/content/posts";
import { writingContent } from "@/content/site";
import type { MetadataRoute } from "next";
import { seo, shell } from "@/content/site";
import { projects } from "@/content/projects";
import { getBaseUrl } from "@/seo/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(seo.pages).map((page) => page.path), ...projects.map((project) => shell.projectHref(project.slug)), ...getPosts({ includeDrafts: false }).map((post) => writingContent.postHref(post.slug))];
  return paths.map((path) => ({ url: new URL(path, getBaseUrl()).href }));
}
