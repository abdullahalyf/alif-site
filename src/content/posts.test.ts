// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { getPost, getPosts, loadPosts, parsePost, postSchema, renderPost } from "./posts";

function source(date = "2026-11-17", draft = false) {
  return `---\ntitle: Hello\ndate: "${date}"\nsummary: A summary\ntags: [systems, learning]\ndraft: ${draft}\ncategory: tech\ncover: "/images/stock/writing-chips.jpg"\ncoverAlt: A chip\n---\n## Heading\n\nSome **text**.`;
}
afterEach(() => vi.unstubAllEnvs());

it("parses frontmatter and preserves the Markdown body", () => {
  expect(parsePost(source(), "hello")).toMatchObject({ title: "Hello", date: "2026-11-17", tags: ["systems", "learning"], draft: false, slug: "hello", body: expect.stringContaining("**text**") });
});
it("rejects missing fields, invalid dates, non-boolean drafts and unsafe filenames", () => {
  const post = parsePost(source(), "hello");
  for (const value of [{ ...post, title: "" }, { ...post, summary: "" }, { ...post, date: "2026-02-30" }, { ...post, date: "invalid" }, { ...post, draft: "false" }, { ...post, tags: [""] }, { ...post, category: "other" }, { ...post, cover: "https://example.com/a.jpg" }, { ...post, coverAlt: "" }]) expect(postSchema.safeParse(value).success).toBe(false);
  expect(() => parsePost("No frontmatter", "hello")).toThrow();
  expect(() => parsePost(source(), "../private")).toThrow();
  expect(() => parsePost("---js\n({ title: 'unsafe' })\n---", "hello")).toThrow();
});
it("sorts published posts newest first with deterministic ties and ignores non-Markdown files", () => {
  const files = [
    { name: "old.md", source: source("2025-01-01") },
    { name: "new.md", source: source() },
    { name: "another.md", source: source() },
    { name: "draft.md", source: source("2026-11-18", true) },
    { name: "ignore.txt", source: "ignore" },
  ];
  expect(loadPosts(files, { includeDrafts: false }).map((post) => post.slug)).toEqual(["another", "new", "old"]);
  expect(getPost("draft", { includeDrafts: false })).toBeUndefined();
  expect(getPost("../private")).toBeUndefined();
});
it("shows drafts on Vercel preview deployments only", () => {
  const files = [{ name: "draft.md", source: source("2026-11-17", true) }];
  vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("VERCEL_ENV", "preview"); expect(loadPosts(files)).toHaveLength(1);
  vi.stubEnv("VERCEL_ENV", "production"); expect(loadPosts(files)).toEqual([]);
});
it("hides drafts by default in production and previews them in development", () => {
  const files = [{ name: "draft.md", source: source("2026-11-17", true) }];
  vi.stubEnv("NODE_ENV", "production"); expect(loadPosts(files)).toEqual([]);
  vi.stubEnv("NODE_ENV", "development"); expect(loadPosts(files)).toHaveLength(1);
});
it("reports invalid posts instead of silently dropping them", () => {
  expect(() => loadPosts([{ name: "bad.md", source: "---\ntitle: Incomplete\n---" }])).toThrow("Invalid post bad.md");
});

it("renders readable Markdown without injecting HTML or unsafe links", () => {
  const html = renderPost('# Heading\n\n**Bold**\n\n```ts\nconst x = 1;\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert%281%29) [good](/now)');
  expect(html).toContain("<h2>Heading</h2>"); expect(html).toContain("<strong>Bold</strong>");
  expect(html).toContain('<pre tabindex="0">');
  expect(html).toContain('<code class="language-ts">'); expect(html).not.toContain("<script>"); expect(html).not.toContain('href="javascript:'); expect(html).toContain('href="/now"');
});
it("validates the repository posts and keeps demo text out of them", () => {
  const posts = getPosts({ includeDrafts: true }); expect(posts.length).toBeGreaterThan(0);
  expect(posts.every((post) => !post.draft)).toBe(true);
  expect(posts.some((post) => /DEMO|TODO\(/.test(post.body))).toBe(false);
});

it("keeps editorial HTML comments out of rendered articles", () => {
  expect(renderPost("<!-- // DEMO: editorial note -->\n\nReadable text.")).toBe("<p>Readable text.</p>\n");
});

it("derives a reading time and renders local images as captioned figures only", () => {
  const long = parsePost(source().replace("Some **text**.", Array(450).fill("word").join(" ")), "long");
  expect(long.readMinutes).toBe(3);
  expect(parsePost(source(), "short").readMinutes).toBe(1);
  const html = renderPost('Intro.\n\n![A chip](/images/stock/writing-chips.jpg "Photo: Someone / Pexels")\n\n![remote](https://example.com/x.jpg)');
  expect(html).toContain('<figure class="post-figure"><img src="/images/stock/writing-chips.jpg" alt="A chip"');
  expect(html).toContain("<figcaption>Photo: Someone / Pexels</figcaption>");
  expect(html).not.toContain("example.com");
  expect(html).not.toContain("<p><figure");
});
