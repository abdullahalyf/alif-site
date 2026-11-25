import { getWritingEntries } from "@/content/writing";
import { seo, writingContent, site } from "@/content/site";
import { getBaseUrl } from "@/seo/base-url";

function xml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
}
const page = writingContent.rssPage;
function feedPage(feedUrl: string, items: { title: string; url: string; summary: string }[]): string {
  const list = items.map((item) => `<li><a href="${xml(item.url)}">${xml(item.title)}</a><p>${xml(item.summary)}</p></li>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${xml(page.title)} · ${xml(site.name)}</title><style>
body{margin:0;font:1rem/1.6 system-ui,sans-serif;background:#f7f5f0;color:#1b1b1b}main{max-width:42rem;margin:0 auto;padding:3rem 1.25rem}h1{font:400 2.5rem/1.1 Georgia,serif;margin:0 0 1rem}code{display:block;overflow-wrap:anywhere;padding:.85rem 1rem;border:1px solid #d8d3c8;border-radius:.6rem;background:#fff}h2{font:400 1.5rem Georgia,serif;margin-top:2.5rem}ul{list-style:none;padding:0}li{padding:1rem 0;border-top:1px solid #d8d3c8}li a{font-size:1.15rem}li p{margin:.35rem 0 0;color:#4a4a4a}a{color:inherit}a:focus-visible{outline:2px solid #1b1b1b;outline-offset:3px}@media(prefers-color-scheme:dark){body{background:#121212;color:#f1efe9}code{background:#1b1b1b;border-color:#333}li{border-color:#333}li p{color:#b9b5aa}a:focus-visible{outline-color:#f1efe9}}
</style></head><body><main><h1>${xml(page.title)}</h1><p>${xml(page.intro)}</p><p>${xml(page.addressLabel)}</p><code>${xml(feedUrl)}</code><h2>${xml(page.latest)}</h2><ul>${list}</ul><p><a href="${xml(seo.pages.writing.path)}">${xml(page.back)}</a></p></main></body></html>`;
}
export function GET(request: Request) {
  const base = getBaseUrl();
  const entries = getWritingEntries({ includeDrafts: false });
  const feedUrl = new URL(writingContent.rssPath, base).href;
  if (request.headers.get("accept")?.includes("text/html")) {
    return new Response(feedPage(feedUrl, entries.map((post) => ({ title: post.title, url: new URL(post.href, base).href, summary: post.summary }))), { headers: { "Content-Type": "text/html; charset=utf-8", Vary: "Accept" } });
  }
  const items = entries.map((post) => {
    const url = xml(new URL(post.href, base).href);
    return `<item><title>${xml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${post.feedDate}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(post.summary)}</description>${post.tags.map((tag) => `<category>${xml(tag)}</category>`).join("")}</item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(site.name)} — ${xml(writingContent.title)}</title><link>${xml(new URL(seo.pages.writing.path, base).href)}</link><description>${xml(writingContent.intro)}</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", Vary: "Accept" } });
}
