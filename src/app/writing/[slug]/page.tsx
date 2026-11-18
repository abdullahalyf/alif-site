import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, renderPost, formatPostDate } from "@/content/posts";
import { writingContent, seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { Reveal } from "@/components/motion";
import { PostProse } from "./PostProse";
import "../writing.css";

export const ensureStatic = "navigation";
export const instant = false;
export function generateStaticParams() {
  const posts = getPosts();
  // Next's static navigation requires a parameter even when no posts are published.
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "_empty" }];
}
export async function generateMetadata({ params }: PageProps<"/writing/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return { ...pageMetadata(post.title, post.summary, writingContent.postHref(post.slug)), ...(post.draft ? { robots: { index: false, follow: false } } : {}) };
}
export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const posts = getPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = posts[index + 1];
  const next = posts[index - 1];
  return <div className="container writing-page"><article className="post-article">
    <Link href={seo.pages.writing.path}>{writingContent.back}</Link>
    <header className="writing-heading"><Reveal><time className="post-date" dateTime={post.date}>{formatPostDate(post.date)}</time></Reveal><Reveal><h1>{post.title}</h1></Reveal><Reveal><p>{post.summary}</p></Reveal>
      {post.draft && <p className="label">{writingContent.draft}</p>}
      <Reveal><ul className="post-tags">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></Reveal>
    </header>
    <PostProse html={renderPost(post.body)} />
    {(previous || next) && <nav className="post-neighbours" aria-label={writingContent.title}>
      {previous && <Link href={writingContent.postHref(previous.slug)}><span className="label">{writingContent.previous}</span>{previous.title}</Link>}
      {next && <Link href={writingContent.postHref(next.slug)}><span className="label">{writingContent.next}</span>{next.title}</Link>}
    </nav>}
  </article></div>;
}
