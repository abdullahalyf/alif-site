import { z } from "zod";

export const travelPhotoSchema = z.object({
  src: z.string().refine((value) => {
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  }, "Use a local image path or HTTPS URL"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  caption: z.string().min(1),
});
export const tripSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  place: z.string().min(1),
  region: z.string().min(1),
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM"),
  title: z.string().min(1),
  story: z.string().min(1).refine((value) => {
    const count = value.trim().split(/(?<=[.!?।])\s+/).length;
    return count >= 2 && count <= 4;
  }, "Use two to four sentences"),
  photos: z.array(travelPhotoSchema).min(1).max(3),
  people: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).min(1),
});
export const tripsSchema = z.array(tripSchema).min(1).refine((trips) => new Set(trips.map((trip) => trip.slug)).size === trips.length, "Trip slugs must be unique");
export type Trip = z.infer<typeof tripSchema>;
