import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { trips } from "@/content/travel";
import { tripsSchema, tripSchema } from "@/content/schemas/travel";
import { frameRotation, formatTripDate } from "./book";

it("validates eight unique demo journeys with dated stories and one to three local demo photos", () => {
  expect(tripsSchema.parse(trips)).toHaveLength(8);
  for (const trip of trips) {
    expect(trip.photos.length).toBeGreaterThanOrEqual(1);
    expect(trip.photos.length).toBeLessThanOrEqual(3);
    for (const [index, photo] of trip.photos.entries()) {
      expect(photo.src).toBe(`/images/travel/${trip.slug}/${index + 1}.jpg`);
      if (photo.src.startsWith("/")) expect(existsSync(join(process.cwd(), "public", photo.src))).toBe(true);
    }
  }
});
it("rejects invalid dates, slugs, stories, unsafe images and duplicate journeys", () => {
  const trip = trips[0];
  for (const value of [{ ...trip, date: "2026-13" }, { ...trip, date: "October 2026" }, { ...trip, slug: "../secret" }, { ...trip, story: "One sentence." }, { ...trip, photos: [] }, { ...trip, photos: Array(4).fill(trip.photos[0]) }, { ...trip, photos: [{ ...trip.photos[0], src: "http://example.com/photo.jpg" }] }]) expect(tripSchema.safeParse(value).success).toBe(false);
  expect(tripsSchema.safeParse([trip, trip]).success).toBe(false);
});
it("makes stable frame angles within three degrees and formats month/year without timezone shifts", () => {
  for (const trip of trips) for (let index = 0; index < 3; index++) {
    expect(frameRotation(trip.slug, index)).toBe(frameRotation(trip.slug, index));
    expect(Math.abs(frameRotation(trip.slug, index))).toBeLessThanOrEqual(3);
  }
  expect(formatTripDate("2026-01")).toBe("January 2026");
});
