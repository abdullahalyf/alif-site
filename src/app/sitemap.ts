import type { MetadataRoute } from "next";
import { seo, shell } from "@/content/site";
import { projects } from "@/content/projects";
import { getBaseUrl } from "@/seo/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(seo.pages).map((page) => page.path), ...projects.map((project) => shell.projectHref(project.slug))];
  return paths.map((path) => ({ url: new URL(path, getBaseUrl()).href }));
}
