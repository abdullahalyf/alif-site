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
      .map((img) => img.src);
    for (const src of srcs) {
      expect(existsSync(join(process.cwd(), "public", src)), src).toBe(true);
    }
  });

  it("getProject finds by slug", () => {
    expect(getProject("multi-branch-pos")?.title).toMatch(/POS/);
    expect(getProject("nope")).toBeUndefined();
  });
});
