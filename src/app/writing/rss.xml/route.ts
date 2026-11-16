import { getPosts } from "@/content/posts";
import { seo, writingContent, site } from "@/content/site";
import { getBaseUrl } from "@/seo/base-url";

function xml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
}
export function GET() {
  const base = getBaseUrl();
  const items = getPosts({ includeDrafts: false }).map((post) => {
    const url = xml(new URL(writingContent.postHref(post.slug), base).href);
    return `<item><title>${xml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(post.summary)}</description>${post.tags.map((tag) => `<category>${xml(tag)}</category>`).join("")}</item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(site.name)} — ${xml(writingContent.title)}</title><link>${xml(new URL(seo.pages.writing.path, base).href)}</link><description>${xml(writingContent.intro)}</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
