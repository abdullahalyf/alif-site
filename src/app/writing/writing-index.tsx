import Image from "next/image";
import Link from "next/link";
import { writingContent } from "@/content/site";
import { formatPostDate } from "@/content/posts";
import { getWritingEntries, type WritingCategory } from "@/content/writing";
import { formatTripDate } from "@/features/travel/book";
import { Reveal } from "@/components/motion";
import "./writing.css";

export function WritingIndex({ category }: { category: WritingCategory }) {
  const posts = getWritingEntries().filter((post) => category === "all" || post.category === category);
  return <div className="container writing-page">
    <header className="writing-heading"><Reveal><h1>{writingContent.title}</h1></Reveal><Reveal><p>{writingContent.intro}</p></Reveal>
      <Reveal><div className="writing-links"><Link href={writingContent.nowPath}>{writingContent.nowLabel}</Link></div></Reveal>
    </header>
    <nav className="writing-filters" aria-label={writingContent.filterLabel}>
      {Object.entries(writingContent.filters).map(([key, { label, href }]) =>
        <Link key={key} href={href} aria-current={key === category ? "page" : undefined}>{label}</Link>
      )}
    </nav>
    {posts.length ? <ul className="post-list">{posts.map((post) => <li key={post.href} className="post-card">
      {post.cover && <Link href={post.href} className="post-card__cover" tabIndex={-1} aria-hidden="true">
        <Image src={post.cover.src} alt="" width={post.cover.width} height={post.cover.height} sizes="(min-width: 48rem) 20rem, 100vw" loading="eager" fetchPriority="low" />
      </Link>}
      <div className="post-card__body">
        <p className="post-meta"><time className="post-date" dateTime={post.date}>{post.category === "travel" ? formatTripDate(post.date) : formatPostDate(post.date)}</time>{post.readMinutes && <span>{writingContent.readTime(post.readMinutes)}</span>}</p>
        <h2><Link href={post.href}>{post.title}</Link></h2>
        {post.draft && <p className="label">{writingContent.draft}</p>}
        <p>{post.summary}</p>
        <ul className="post-tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        {post.cover?.credit && <p className="photo-credit">{post.cover.credit}</p>}
      </div>
    </li>)}</ul> : <p>{writingContent.empty}</p>}
  </div>;
}
