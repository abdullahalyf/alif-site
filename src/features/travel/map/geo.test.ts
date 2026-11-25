import { expect, it } from "vitest";
import { trips } from "@/content/travel";
import { contrastRatio, tripSchema } from "@/content/schemas/travel";
import { distanceKm, project, routeDistanceKm } from "./geo";

it("projects every journey inside the Bangladesh viewbox and preserves compass directions", () => {
  for (const trip of trips) {
    const { x, y } = project(trip);
    expect(x).toBeGreaterThan(0); expect(x).toBeLessThan(400);
    expect(y).toBeGreaterThan(0); expect(y).toBeLessThan(520);
  }
  expect(project({ lat: 25, lng: 90 }).y).toBeLessThan(project({ lat: 24, lng: 90 }).y);
  expect(project({ lat: 24, lng: 91 }).x).toBeGreaterThan(project({ lat: 24, lng: 90 }).x);
});
it("computes great-circle kilometres symmetrically and sums the journey legs", () => {
  const a = { lat: 0, lng: 0 }, b = { lat: 0, lng: 1 };
  expect(distanceKm(a, a)).toBe(0);
  expect(distanceKm(a, b)).toBeCloseTo(111.195, 2);
  expect(distanceKm(a, b)).toBe(distanceKm(b, a));
  expect(routeDistanceKm([a, b, a])).toBeCloseTo(222.39, 2);
  expect(routeDistanceKm([])).toBe(0);
  expect(routeDistanceKm(trips)).toBeGreaterThan(200);
});
it("requires valid coordinates and hex tints that pass AA for all travel text", () => {
  for (const trip of trips) {
    expect(tripSchema.safeParse(trip).success).toBe(true);
    expect(contrastRatio(trip.color, "#6A645A")).toBeGreaterThanOrEqual(4.5);
  }
  for (const patch of [{ lat: 91 }, { lng: -181 }, { color: "red" }, { color: "#222222" }]) expect(tripSchema.safeParse({ ...trips[0], ...patch }).success).toBe(false);
});
