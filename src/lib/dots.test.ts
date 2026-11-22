import { describe, expect, it } from "vitest";
import { ATTRACT_RADIUS, createDots, dotCount, linkAlpha, resizeDots, stepDots } from "./dots";

const seeded = () => {
  let seed = 7;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
};

const dot = (d: { x: number; y: number; vx: number; vy: number; bx: number; by: number }) => ({ ...d, size: 1.5, weight: 1 });

describe("dotCount", () => {
  it("stays within 60–120 on desktop", () => {
    expect(dotCount(1024, 600)).toBe(60);
    expect(dotCount(1440, 900)).toBe(100);
    expect(dotCount(3840, 2160)).toBe(120);
  });

  it("uses fewer dots on mobile", () => {
    expect(dotCount(390, 844)).toBeLessThan(dotCount(1440, 900));
    expect(dotCount(390, 844)).toBeGreaterThanOrEqual(30);
    expect(dotCount(390, 844)).toBeLessThanOrEqual(55);
  });
});

describe("createDots", () => {
  it("creates dots inside the viewport", () => {
    const dots = createDots(50, 800, 600, seeded());
    expect(dots).toHaveLength(50);
    for (const dot of dots) {
      expect(dot.x).toBeGreaterThanOrEqual(0);
      expect(dot.x).toBeLessThanOrEqual(800);
      expect(dot.y).toBeGreaterThanOrEqual(0);
      expect(dot.y).toBeLessThanOrEqual(600);
    }
  });
});

describe("stepDots", () => {
  it("drifts dots and wraps them around the edges", () => {
    const dots = [dot({ x: 799, y: 10, vx: 50, vy: 0, bx: 50, by: 0 })];
    stepDots(dots, 0.05, 800, 600, null);
    expect(dots[0].x).toBeGreaterThanOrEqual(0);
    expect(dots[0].x).toBeLessThan(10);
  });

  it("pulls nearby dots toward the pointer", () => {
    const dots = [dot({ x: 100, y: 100, vx: 0, vy: 0, bx: 0, by: 0 })];
    stepDots(dots, 0.016, 800, 600, { x: 180, y: 100 });
    expect(dots[0].vx).toBeGreaterThan(0);
  });

  it("ignores dots outside the attraction radius", () => {
    const dots = [dot({ x: 100, y: 100, vx: 0, vy: 0, bx: 0, by: 0 })];
    stepDots(dots, 0.016, 800, 600, { x: 100 + ATTRACT_RADIUS + 20, y: 100 });
    expect(dots[0].vx).toBe(0);
  });

  it("eases back to the base drift after the pointer leaves", () => {
    const dots = [dot({ x: 100, y: 100, vx: 60, vy: 0, bx: 5, by: 0 })];
    stepDots(dots, 0.016, 800, 600, null);
    expect(dots[0].vx).toBeLessThan(60);
    expect(dots[0].vx).toBeGreaterThan(5);
    for (let i = 0; i < 400; i += 1) stepDots(dots, 0.016, 800, 600, null);
    expect(dots[0].vx).toBeCloseTo(5, 0);
  });

  it("never exceeds the speed cap", () => {
    const dots = [dot({ x: 100, y: 100, vx: 500, vy: 0, bx: 0, by: 0 })];
    stepDots(dots, 0.016, 800, 600, null);
    expect(Math.hypot(dots[0].vx, dots[0].vy)).toBeLessThanOrEqual(140.001);
  });
});

describe("dot variety", () => {
  it("mixes a few prominent dots with many faint ones", () => {
    const dots = createDots(100, 800, 600, seeded());
    const prominent = dots.filter((d) => d.weight === 1);
    expect(prominent.length).toBeGreaterThan(8);
    expect(prominent.length).toBeLessThan(40);
    expect(Math.max(...dots.map((d) => d.size))).toBeGreaterThan(Math.min(...dots.map((d) => d.size)) * 1.5);
  });
});

describe("linkAlpha", () => {
  it("fades linearly to zero at the max distance", () => {
    expect(linkAlpha(0)).toBe(1);
    expect(linkAlpha(70, 140)).toBeCloseTo(0.5);
    expect(linkAlpha(140, 140)).toBe(0);
    expect(linkAlpha(300, 140)).toBe(0);
  });
});

describe("resizeDots", () => {
  it("rescales positions and matches the new count", () => {
    const dots = createDots(dotCount(1000, 600), 1000, 600, seeded());
    const next = resizeDots(dots, 1000, 600, 2000, 1200, seeded());
    expect(next).toHaveLength(dotCount(2000, 1200));
    expect(next[0].x).toBeCloseTo(dots[0].x * 2);
  });
});
