import { notFound } from "next/navigation";
import { getPost } from "@/content/posts";
import { seo, site, writingContent } from "@/content/site";
import { getBaseUrl } from "@/seo/base-url";

export default async function WritingLayout({ children, params }: LayoutProps<"/writing/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = new URL(writingContent.postHref(post.slug), getBaseUrl()).href;
  const data = {
    "@context": seo.schemaContext,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    keywords: post.tags,
    author: { "@type": "Person", name: site.fullName },
  };
  return <>{children}{!post.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />}</>;
}
