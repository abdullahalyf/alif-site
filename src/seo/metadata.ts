import type { Metadata } from "next";
import { site, seo } from "@/content/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, title, description, url: path },
    twitter: { card: "summary_large_image", title, description, images: [seo.imagePath] },
  };
}
