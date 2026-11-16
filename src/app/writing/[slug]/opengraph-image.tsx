import { notFound } from "next/navigation";
import { getPost, formatPostDate } from "@/content/posts";
import { site } from "@/content/site";
import { shareImage, shareImageSize } from "@/seo/share-image";

export const alt = site.name;
export const size = shareImageSize;
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return shareImage(post.title, formatPostDate(post.date));
}
