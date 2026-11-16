import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projectsSchema, siteSchema } from "./schema";
import { site } from "./site";
import { getProject, projects } from "./projects";

describe("content", () => {
  it("site content is valid", () => {
    expect(() => siteSchema.parse(site)).not.toThrow();
  });

  it("requires non-empty Now content", () => {
    expect(siteSchema.safeParse({ ...site, now: [] }).success).toBe(false);
    expect(siteSchema.safeParse({ ...site, now: [""] }).success).toBe(false);
  });

  it("projects content is valid and slugs are unique", () => {
    expect(() => projectsSchema.parse(projects)).not.toThrow();
  });

  it("every referenced image exists in public/", () => {
    const srcs = [
      site.heroPhoto,
      site.avatar,
      site.aboutPhoto,
      ...site.story.map((c) => c.image),
      ...projects.flatMap((p) => p.images),
    ]
      .filter((img) => img !== null)
      .map((img) => img.src).filter((src) => src.startsWith("/"));
    for (const src of srcs) {
      expect(existsSync(join(process.cwd(), "public", src)), src).toBe(true);
    }
  });

  it("accepts HTTPS images and rejects insecure or protocol-relative sources", () => {
    expect(siteSchema.safeParse({ ...site, heroPhoto: { ...site.heroPhoto, src: "https://picsum.photos/seed/test/1600/1000" } }).success).toBe(true);
    for (const src of ["http://example.com/a.jpg", "//example.com/a.jpg", "javascript:alert(1)"]) expect(siteSchema.safeParse({ ...site, heroPhoto: { ...site.heroPhoto, src } }).success).toBe(false);
  });
  it("has seven complete projects and the supplied real exchange nomination", () => {
    expect(projects).toHaveLength(7); expect(projects.filter((project) => project.demo)).toHaveLength(5);
    expect(projects.some((project) => project.slug === "portfolio")).toBe(false);
    for (const project of projects) expect(project.images.length).toBeGreaterThanOrEqual(2);
    expect(site.achievements[0].title).toContain("Nominated for a semester exchange at IIT Bombay");
  });

  it("getProject finds by slug", () => {
    expect(getProject("multi-branch-pos")?.title).toMatch(/POS/);
    expect(getProject("nope")).toBeUndefined();
  });
});
