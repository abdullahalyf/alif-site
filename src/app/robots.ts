import type { MetadataRoute } from "next";
import { seo, shell } from "@/content/site";
import { getBaseUrl } from "@/seo/base-url";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: shell.home.href }, sitemap: new URL(seo.sitemapPath, getBaseUrl()).href };
}
