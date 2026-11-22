import Link from "next/link";
import { writingContent } from "@/content/site";
import { formatPostDate } from "@/content/posts";
import { getWritingEntries } from "@/content/writing";
import { formatTripDate } from "@/features/travel/book";
import { Reveal } from "@/components/motion";
import "./writing.css";

export function WritingIndex({ category }: { category: keyof typeof writingContent.filters }) {
  const posts = getWritingEntries().filter((post) => category === "all" || post.category === category);
  return <div className="container writing-page">
    <header className="writing-heading"><Reveal><h1>{writingContent.title}</h1></Reveal><Reveal><p>{writingContent.intro}</p></Reveal>
      <Reveal><div className="writing-links"><a href={writingContent.rssPath}>{writingContent.rssLabel}</a><Link href={writingContent.nowPath}>{writingContent.nowLabel}</Link></div></Reveal>
    </header>
    <nav className="writing-filters" aria-label={writingContent.filterLabel}>
      {Object.entries(writingContent.filters).map(([key, { label, href }]) =>
        <Link key={key} href={href} aria-current={key === category ? "page" : undefined}>{label}</Link>
      )}
    </nav>
    {posts.length ? <ul className="post-list">{posts.map((post) => <Reveal as="li" key={post.href} lines>
      <time className="post-date" dateTime={post.date}>{post.category === "travel" ? formatTripDate(post.date) : formatPostDate(post.date)}</time>
      <h2><Link href={post.href}>{post.title}</Link></h2>
      {post.draft && <p className="label">{writingContent.draft}</p>}
      <p>{post.summary}</p><ul className="post-tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </Reveal>)}</ul> : <p>{writingContent.empty}</p>}
  </div>;
}
