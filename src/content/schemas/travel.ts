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
  scope: z.enum(["national", "international"]).default("national"),
  country: z.string().trim().min(1).default("Bangladesh"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).refine(color => contrastRatio(color, "#6A645A") >= 4.5 && contrastRatio(color, "#1E1C19") >= 4.5, "Trip tint must pass AA with ink and muted text"),
  district: z.string().min(1),
  place: z.string().min(1),
  region: z.string().min(1),
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM").optional(),
  title: z.string().min(1),
  story: z.string().min(1).refine((value) => {
    const count = value.trim().split(/(?<=[.!?।])\s+/).length;
    return count >= 2 && count <= 4;
  }, "Use two to four sentences"),
  photos: z.array(travelPhotoSchema).min(1).max(3),
  people: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).min(1),
}).refine(trip => trip.scope === "national" || trip.country !== "Bangladesh", {
  path: ["country"],
  message: "An international trip needs a destination country outside Bangladesh",
});
export const tripsSchema = z.array(tripSchema).min(1).refine((trips) => new Set(trips.map((trip) => trip.slug)).size === trips.length, "Trip slugs must be unique");
export type Trip = z.infer<typeof tripSchema>;

export function contrastRatio(first: string, second: string): number {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}
