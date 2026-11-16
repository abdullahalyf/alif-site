import Link from "next/link";
import { seo, writingContent } from "@/content/site";
import { getPosts, formatPostDate } from "@/content/posts";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import "./writing.css";

export const metadata = {
  ...pageMetadata(seo.pages.writing.title, seo.pages.writing.description, seo.pages.writing.path),
  alternates: { canonical: seo.pages.writing.path, types: { "application/rss+xml": writingContent.rssPath } },
};
export default function Writing() {
  const posts = getPosts();
  return <div className="container writing-page">
    <SectionLabel>{writingContent.title}</SectionLabel>
    <header className="writing-heading"><h1>{writingContent.title}</h1><p>{writingContent.intro}</p>
      <div className="writing-links"><a href={writingContent.rssPath}>{writingContent.rssLabel}</a><Link href={writingContent.nowPath}>{writingContent.nowLabel}</Link></div>
    </header>
    {posts.length ? <ul className="post-list">{posts.map((post) => <li key={post.slug}>
      <time className="post-date" dateTime={post.date}>{formatPostDate(post.date)}</time>
      <h2><Link href={writingContent.postHref(post.slug)}>{post.title}</Link></h2>
      {post.draft && <p className="label">{writingContent.draft}</p>}
      <p>{post.summary}</p><ul className="post-tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </li>)}</ul> : <p>{writingContent.empty}</p>}
  </div>;
}
