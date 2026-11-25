import { expect, it } from "vitest";
import { estimateDefaults, estimateModel, estimateContent as c } from "@/content/estimate";
import { projectTypes } from "@/content/estimate-options";
import { estimateInputSchema, estimateModelSchema, type EstimateInput } from "@/content/schemas/estimate";
import { site } from "@/content/site";
import { calculateEstimate } from "./calculate";
import { estimateSummary, estimateUrl } from "./summary";

it("validates the editable model", () => {
  expect(() => estimateModelSchema.parse(estimateModel)).not.toThrow();
  expect(estimateModel.currency).toBe("BDT");
});
it("produces ordered, finite ranges and an effort allocation that sums to the whole", () => {
  const result = calculateEstimate(estimateDefaults);
  expect(result.timeline!.low).toBeGreaterThan(0); expect(result.timeline!.high).toBeGreaterThanOrEqual(result.timeline!.low);
  expect(result.price!.low).toBeGreaterThan(0); expect(result.price!.high).toBeGreaterThanOrEqual(result.price!.low);
  expect(result.phases.reduce((sum, phase) => sum + phase.weeks, 0)).toBeCloseTo(result.effortWeeks!);
  expect(result.phases.reduce((sum, phase) => sum + phase.share, 0)).toBeCloseTo(1);
});
it("starts every service inside its published typical range", () => {
  const published = { pos: [40000, 120000], backoffice: [50000, 150000], business: [15000, 40000], landing: [8000, 15000], portfolio: [5000, 12000], ecommerce: [30000, 80000], dashboard: [25000, 200000], mobile: [80000, 250000] } as const;
  for (const [type, [low, high]] of Object.entries(published)) {
    const result = calculateEstimate({ ...estimateDefaults, projectType: type as EstimateInput["projectType"], roles: 2 });
    expect(result.price).toEqual({ low, high });
  }
});
it("gives no price or timeline for custom software", () => {
  const result = calculateEstimate({ ...estimateDefaults, projectType: "custom" });
  expect(result.price).toBeNull(); expect(result.timeline).toBeNull(); expect(result.phases).toEqual([]);
});
it("increases the range for branches, roles, offline operation, migration and every integration", () => {
  const baseline = calculateEstimate(estimateDefaults);
  const patches: Partial<EstimateInput>[] = [{ branches: 8 }, { roles: 6 }, { offline: true }, { migration: true }, ...(["payments", "sms", "email", "accounting"] as const).map(value => ({ integrations: [value] }))];
  for (const patch of patches) { const result = calculateEstimate({ ...estimateDefaults, ...patch }); expect(result.effortWeeks!).toBeGreaterThan(baseline.effortWeeks!); expect(result.price!.high).toBeGreaterThan(baseline.price!.high); }
});
it("ignores branches and offline for a landing page", () => {
  const base = calculateEstimate({ ...estimateDefaults, projectType: "landing" });
  expect(calculateEstimate({ ...estimateDefaults, projectType: "landing", branches: 9, roles: 9, offline: true })).toEqual(base);
});
it("keeps urgency separate from effort, shortening the calendar at a higher price", () => {
  const standard = calculateEstimate(estimateDefaults), urgent = calculateEstimate({ ...estimateDefaults, urgency: "urgent" });
  expect(urgent.effortWeeks).toBe(standard.effortWeeks); expect(urgent.timeline!.high).toBeLessThanOrEqual(standard.timeline!.high); expect(urgent.price!.high).toBeGreaterThan(standard.price!.high);
});
it("takes all prices from editable content and responds to a changed model", () => {
  const baseline = calculateEstimate(estimateDefaults);
  const edited = calculateEstimate(estimateDefaults, { ...estimateModel, types: { ...estimateModel.types, pos: { ...estimateModel.types.pos, price: { low: 80000, high: 240000 } } } });
  expect(edited.price!.low).toBeGreaterThan(baseline.price!.low);
});
it("gives systems a larger architecture share than websites", () => {
  const system = calculateEstimate(estimateDefaults), site_ = calculateEstimate({ ...estimateDefaults, projectType: "business" });
  expect(system.phases.find(phase => phase.id === "architecture")!.share).toBeGreaterThan(site_.phases.find(phase => phase.id === "architecture")!.share);
});
it("handles the largest supported scope without overflow or unordered ranges", () => {
  for (const projectType of projectTypes) {
    const result = calculateEstimate({ ...estimateDefaults, projectType, branches: 100, roles: 20, offline: true, integrations: ["payments", "sms", "email", "accounting"], migration: true, urgency: "urgent" });
    if (result.price) { expect(Number.isFinite(result.price.high)).toBe(true); expect(result.price.high).toBeGreaterThanOrEqual(result.price.low); }
  }
});
it("rejects invalid counts, enums, duplicated integrations and reversed model ranges", () => {
  for (const patch of [{ branches: 0 }, { branches: 101 }, { roles: 1.5 }, { roles: 21 }, { branches: NaN }, { integrations: ["email", "email"] }, { projectType: "unknown" }]) expect(estimateInputSchema.safeParse({ ...estimateDefaults, ...patch }).success).toBe(false);
  expect(() => calculateEstimate({ ...estimateDefaults, branches: -1 })).toThrow();
  const reversed = { ...estimateModel, types: { ...estimateModel.types, pos: { ...estimateModel.types.pos, price: { low: 2, high: 1 } } } };
  expect(() => calculateEstimate(estimateDefaults, reversed)).toThrow();
});
it("encodes a complete summary with the range notice into both contact destinations", () => {
  const input = { ...estimateDefaults, branches: 8, offline: true, integrations: ["payments", "email"] as EstimateInput["integrations"] }, result = calculateEstimate(input);
  const lines = estimateSummary(input, result), email = new URL(estimateUrl(input, result, "email")), whatsapp = new URL(estimateUrl(input, result, "whatsapp"));
  expect(email.pathname).toBe(site.email); expect(email.searchParams.get("subject")).toBe(c.subject);
  for (const line of lines) { expect(email.searchParams.get("body")).toContain(line); expect(whatsapp.searchParams.get("text")).toContain(line); }
  expect(lines.join("\n")).toContain(c.rangeNotice); expect(lines.join("\n")).toContain(`${c.summaryLabels.branches}: 8`); expect(lines.join("\n")).toContain("৳");
});
