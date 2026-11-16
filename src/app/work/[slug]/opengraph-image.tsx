import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { shareImage, shareImageSize } from "@/seo/share-image";

export const alt = site.name;
export const size = shareImageSize;
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return shareImage(project.title, `${project.category} · ${project.year}`);
}
