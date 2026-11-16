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

  it("getProject finds by slug", () => {
    expect(getProject("multi-branch-pos")?.title).toMatch(/POS/);
    expect(getProject("nope")).toBeUndefined();
  });
});
