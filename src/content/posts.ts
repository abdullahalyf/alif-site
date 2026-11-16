import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, "Use a real calendar date (YYYY-MM-DD)"),
  summary: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)),
  draft: z.boolean(),
});
export type Post = z.infer<typeof postSchema> & { slug: string; body: string };
const postsDirectory = join(process.cwd(), "src/content/posts");

export function parsePost(source: string, slug: string): Post {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid post slug: ${slug}`);
  if (!/^---\r?\n/.test(source)) throw new Error("Posts must start with YAML frontmatter");
  const { data, content } = matter(source);
  if (data.date instanceof Date && !Number.isNaN(data.date.valueOf())) data.date = data.date.toISOString().slice(0, 10);
  return { ...postSchema.parse(data), slug, body: content.trim() };
}

export function loadPosts(files: { name: string; source: string }[], { includeDrafts = process.env.NODE_ENV !== "production" } = {}): Post[] {
  return files.filter((file) => file.name.endsWith(".md")).map((file) => {
    try { return parsePost(file.source, file.name.slice(0, -3)); }
    catch (error) { throw new Error(`Invalid post ${file.name}`, { cause: error }); }
  }).filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPosts(options?: Parameters<typeof loadPosts>[1]): Post[] {
  const files = readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
  return loadPosts(files.map((name) => ({ name, source: readFileSync(join(process.cwd(), "src/content/posts", name), "utf8") })), options);
}

export function getPost(slug: string, options?: Parameters<typeof getPosts>[0]): Post | undefined {
  return getPosts(options).find((post) => post.slug === slug);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}
function safeHref(href: string): boolean {
  try { return ["http:", "https:", "mailto:"].includes(new URL(href, "https://markdown.invalid").protocol); }
  catch { return false; }
}
const markdown = new Marked({ renderer: {
  html: ({ text }) => escapeHtml(text),
  heading({ tokens, depth }) { const level = Math.max(2, depth); return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>`; },
  link({ href, tokens }) { const text = this.parser.parseInline(tokens); return safeHref(href) ? `<a href="${escapeHtml(href)}">${text}</a>` : text; },
  image: ({ text }) => escapeHtml(text),
} });

export function renderPost(body: string): string {
  return markdown.parse(body, { async: false });
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
