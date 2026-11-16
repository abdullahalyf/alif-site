import { z } from "zod";

const image = z.object({
  src: z.string().startsWith("/"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

const link = z.object({
  label: z.string().min(1),
  href: z.url(),
});

export const siteSchema = z.object({
  name: z.string().min(1),
  fullName: z.string().min(1),
  logoText: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  intro: z.string().min(1),
  about: z.array(z.string().min(1)).min(1),
  email: z.email(),
  whatsapp: z.object({ display: z.string().min(1), href: z.url() }),
  socials: z.array(link).min(1),
  heroPhoto: image,
  avatar: image,
  aboutPhoto: image,
  services: z.array(z.string().min(1)).min(1),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.number().int().min(2000),
  role: z.string().min(1),
  category: z.enum(["Client work", "Research", "Personal"]),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  results: z.array(z.string().min(1)),
  link: z.url().nullable(),
  images: z.array(image),
});

export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, {
    message: "Project slugs must be unique",
  });

export type Site = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ImageAsset = z.infer<typeof image>;
