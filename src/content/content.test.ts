import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projectSchema, projectsSchema, siteSchema } from "./schema";
import { heroPhotos, site } from "./site";
import { allTrips } from "./travel";
import { getProject, projects } from "./projects";

describe("content", () => {
  it("site content is valid", () => {
    expect(() => siteSchema.parse(site)).not.toThrow();
  });

  it("requires non-empty Now content", () => {
    expect(siteSchema.safeParse({ ...site, now: [] }).success).toBe(false);
    expect(siteSchema.safeParse({ ...site, now: [""] }).success).toBe(false);
  });

  it("requires a valid image for every education entry", () => {
    const [first, ...others] = site.education;
    expect(siteSchema.safeParse({ ...site, education: [{ ...first, image: undefined }, ...others] }).success).toBe(false);
    expect(siteSchema.safeParse({ ...site, education: [{ ...first, image: { ...first.image, width: 0 } }, ...others] }).success).toBe(false);
  });

  it("limits illustrative skill levels to the five-point scale", () => {
    const [group, ...groups] = site.skills;
    for (const level of [0, 1.5, 6]) {
      const skills = [{ ...group, items: [{ ...group.items[0], level }] }, ...groups];
      expect(siteSchema.safeParse({ ...site, skills }).success).toBe(false);
    }
  });

  it("projects content is valid and slugs are unique", () => {
    expect(() => projectsSchema.parse(projects)).not.toThrow();
  });

  it("validates case-study details and accepts older project entries", () => {
    const flagship = getProject("multi-branch-pos");
    expect(flagship?.decisions?.length).toBeGreaterThanOrEqual(3);
    expect(flagship?.challenges?.length).toBeGreaterThanOrEqual(2);
    expect(flagship?.metrics?.length).toBeGreaterThan(0);
    const legacy = { ...projects[0], timeline: undefined, decisions: undefined, challenges: undefined, metrics: undefined };
    expect(projectSchema.safeParse(legacy).success).toBe(true);
    expect(projectSchema.safeParse({ ...legacy, decisions: [{ decision: "Use SQLite", why: "Offline", alternatives: "" }] }).success).toBe(false);
  });

  it("every referenced image exists in public/", () => {
    const srcs = [
      site.heroPhoto,
      ...(site.heroPhotoCutout ? [site.heroPhotoCutout] : []),
      site.avatar,
      site.aboutPhoto,
      site.heroSide,
      ...heroPhotos.images,
      ...allTrips.flatMap((trip) => trip.photos),
      ...site.education.map((item) => item.image),
      ...site.story.flatMap((c) => c.images),
      ...projects.flatMap((p) => [...p.images, ...(p.galleries ?? []).flatMap((gallery) => gallery.images)]),
    ]
      .filter((img) => img !== null)
      .map((img) => img.src);
    expect(srcs.every((src) => src.startsWith("/images/"))).toBe(true);
    for (const src of srcs) {
      expect(existsSync(join(process.cwd(), "public", src)), src).toBe(true);
    }
  });

  it("accepts HTTPS images and rejects insecure or protocol-relative sources", () => {
    expect(siteSchema.safeParse({ ...site, heroPhoto: { ...site.heroPhoto, src: "https://example.com/photo.jpg" } }).success).toBe(true);
    for (const src of ["http://example.com/a.jpg", "//example.com/a.jpg", "javascript:alert(1)"]) expect(siteSchema.safeParse({ ...site, heroPhoto: { ...site.heroPhoto, src } }).success).toBe(false);
  });
  it("lists the eight real projects, none of them demo content", () => {
    expect(projects.map((project) => project.slug)).toEqual(["multi-branch-pos", "cloudsentinel", "jomi-barta", "optinode", "client-sites", "campus-navigator", "console-ecommerce", "traffic-accident-risk"]);
    expect(JSON.stringify(projects)).not.toMatch(/DEMO|Stockroom|Clinic|Field Service|Sync Inspector/);
    expect(new Set(projects.map((project) => project.category))).toEqual(new Set(["Client work", "Hackathons", "University", "Research"]));
    const alez = getProject("multi-branch-pos");
    expect(alez?.galleries?.map((gallery) => gallery.title)).toEqual(["In-shop POS software", "Online management portal", "POS output"]);
    expect(getProject("client-sites")?.galleries?.map((gallery) => gallery.title)).toEqual(["Yousha Ahmad", "Fahmida Jannat Shruty", "Ratul Hasan"]);
    for (const project of projects) for (const gallery of project.galleries ?? []) for (const image of gallery.images) expect(image.caption.length).toBeGreaterThan(0);
    expect(site.achievements[0].title).toBe("Exchange semester at IIT Bombay");
  });

  it("getProject finds by slug", () => {
    expect(getProject("multi-branch-pos")?.title).toBe("Alez POS");
    expect(getProject("nope")).toBeUndefined();
  });
});
