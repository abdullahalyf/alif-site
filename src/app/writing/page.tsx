import Link from "next/link";
import { seo, writingContent } from "@/content/site";
import { getPosts, formatPostDate } from "@/content/posts";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";
import "./writing.css";

export const metadata = {
  ...pageMetadata(seo.pages.writing.title, seo.pages.writing.description, seo.pages.writing.path),
  alternates: { canonical: seo.pages.writing.path, types: { "application/rss+xml": writingContent.rssPath } },
};
export default function Writing() {
  const posts = getPosts();
  return <div className="container writing-page">
    <SectionLabel>{writingContent.title}</SectionLabel>
    <header className="writing-heading"><Reveal><h1>{writingContent.title}</h1></Reveal><Reveal><p>{writingContent.intro}</p></Reveal>
      <Reveal><div className="writing-links"><a href={writingContent.rssPath}>{writingContent.rssLabel}</a><Link href={writingContent.nowPath}>{writingContent.nowLabel}</Link></div></Reveal>
    </header>
    {posts.length ? <ul className="post-list">{posts.map((post) => <Reveal as="li" key={post.slug} lines>
      <time className="post-date" dateTime={post.date}>{formatPostDate(post.date)}</time>
      <h2><Link href={writingContent.postHref(post.slug)}>{post.title}</Link></h2>
      {post.draft && <p className="label">{writingContent.draft}</p>}
      <p>{post.summary}</p><ul className="post-tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </Reveal>)}</ul> : <p>{writingContent.empty}</p>}
  </div>;
}
