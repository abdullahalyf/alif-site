import { allTrips, travelContent } from "@/content/travel";
import { labRoutes } from "@/content/lab";
import { estimateContent } from "@/content/estimate";
import { searchContent } from "@/content/search";
import { diagramContent } from "@/content/diagrams";
import { getPosts } from "@/content/posts";
import { writingContent } from "@/content/site";
import type { MetadataRoute } from "next";
import { seo, shell } from "@/content/site";
import { projects } from "@/content/projects";
import { getBaseUrl } from "@/seo/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...labRoutes, estimateContent.path,
    travelContent.path,
    ...allTrips.map(trip => travelContent.tripHref(trip.slug)),
    ...searchContent.pages.map((page) => page.href),
    ...projects.map((project) => diagramContent.path(project.slug)),
    ...Object.values(seo.pages).map((page) => page.path),
    ...projects.map((project) => shell.projectHref(project.slug)),
    ...getPosts({ includeDrafts: false }).map((post) =>
      writingContent.postHref(post.slug),
    ),
  ];
  return paths.map((path) => ({ url: new URL(path, getBaseUrl()).href }));
}
