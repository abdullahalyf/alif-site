import { z } from "zod";

const image = z.object({
  src: z.string().refine((value) => {
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  }, "Use a local path or an HTTPS URL"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  caption: z.string().min(1).optional(),
});

const link = z.object({
  label: z.string().min(1),
  href: z.url(),
});

export const siteSchema = z.object({
  name: z.string().min(1),
  fullName: z.string().min(1),
  logoText: z.string().min(1),
  logoInitial: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  intro: z.string().min(1),
  now: z.array(z.string().min(1)).min(1),
  achievements: z.array(z.object({ title: z.string().min(1), org: z.string().min(1), year: z.number().int(), period: z.string().min(1).optional(), text: z.string().min(1), demo: z.boolean().optional() })).min(1),
  education: z.array(z.object({ title: z.string().min(1), org: z.string().min(1), years: z.string().min(1), text: z.string().min(1), image })).min(1),
  skills: z.array(z.object({
    title: z.string().min(1),
    icon: z.enum(["systems", "web", "data"]),
    items: z.array(z.object({
      name: z.string().min(1),
      level: z.number().int().min(1).max(5),
      note: z.string().min(1),
    })).min(1),
  })).min(1),
  languages: z.array(z.object({ name: z.string().min(1), level: z.string().min(1) })).min(1),
  interests: z.array(z.string().min(1)).min(1),
  stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  testimonials: z.array(z.object({ name: z.string().min(1), role: z.string().min(1), quote: z.string().min(1), published: z.boolean().optional() })),
  about: z.array(z.string().min(1)).min(1),
  email: z.email(),
  whatsapp: z.object({ display: z.string().min(1), href: z.url() }),
  socials: z.array(link).min(1),
  heroPhoto: image,
  heroPhotoCutout: image.optional(),
  avatar: image,
  aboutPhoto: image,
  heroSide: image,
  statusCard: z.object({
    availability: z.string().min(1),
    timezone: z.string().min(1),
    timezoneLabel: z.string().min(1),
    buildingLabel: z.string().min(1),
    building: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
  }),
  systemDiagram: z.object({
    label: z.string().min(1),
    steps: z.array(z.string().min(1)).min(2),
  }),
  services: z.array(z.string().min(1)).min(1),
  tagline: z.string().min(1),
  approach: z
    .array(z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      title: z.string().min(1),
      text: z.string().min(1),
      details: z.array(z.string().min(1)),
    }))
    .min(1),
  story: z
    .array(
      z.object({
        label: z.string().min(1),
        title: z.string().min(1),
        text: z.string().min(1),
        images: z.array(image),
        quote: z.object({ text: z.string().min(1), by: z.string().min(1) }).optional(),
        credit: z.string().min(1).optional(),
      }),
    )
    .min(1),
});

export const projectCategories = ["Client work", "Hackathons", "University", "Research"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.number().int().min(2000).optional(),
  role: z.string().min(1),
  category: z.enum(projectCategories),
  summary: z.string().min(1),
  problem: z.string().min(1).optional(),
  solution: z.array(z.string().min(1)),
  stack: z.array(z.string().min(1)),
  results: z.array(z.string().min(1)),
  timeline: z.array(z.object({ phase: z.string().min(1), weeks: z.string().min(1) })).min(1).optional(),
  decisions: z.array(z.object({
    decision: z.string().min(1),
    alternatives: z.string().min(1),
    why: z.string().min(1),
  })).min(3).max(4).optional(),
  challenges: z.array(z.object({ problem: z.string().min(1), resolution: z.string().min(1) })).min(2).max(3).optional(),
  metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1).optional(),
  link: z.url().nullable(),
  builtWith: z.string().min(1).optional(),
  images: z.array(image),
  galleries: z.array(z.object({
    title: z.string().min(1),
    text: z.string().min(1).optional(),
    link: link.optional(),
    images: z.array(image.extend({ caption: z.string().min(1) })).min(1),
  })).optional(),
});

export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, {
    message: "Project slugs must be unique",
  });

export const hackathonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  result: z.string().min(1),
  github: z.url().optional(),
  live: z.url().optional(),
});
export type Hackathon = z.infer<typeof hackathonSchema>;

export type Site = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ImageAsset = z.infer<typeof image>;
