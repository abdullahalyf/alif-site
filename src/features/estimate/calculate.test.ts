import { expect, it } from "vitest";
import { estimateDefaults, estimateModel, estimateContent as c } from "@/content/estimate";
import { estimateInputSchema, type EstimateInput } from "@/content/schemas/estimate";
import { site } from "@/content/site";
import { calculateEstimate } from "./calculate";
import { estimateSummary, estimateUrl } from "./summary";

it("produces ordered, finite ranges and an effort allocation that sums to the whole", () => {
  const result = calculateEstimate(estimateDefaults);
  expect(result.timeline.low).toBeGreaterThan(0); expect(result.timeline.high).toBeGreaterThanOrEqual(result.timeline.low);
  expect(result.price.low).toBeGreaterThan(0); expect(result.price.high).toBeGreaterThanOrEqual(result.price.low);
  expect(result.phases.reduce((sum, phase) => sum + phase.weeks, 0)).toBeCloseTo(result.effortWeeks);
  expect(result.phases.reduce((sum, phase) => sum + phase.share, 0)).toBeCloseTo(1);
});
it("increases effort for branches, roles, offline operation, migration and every integration", () => {
  const baseline = calculateEstimate(estimateDefaults);
  const patches: Partial<EstimateInput>[] = [{ branches: 8 }, { roles: 6 }, { offline: true }, { migration: true }, ...(["payments", "sms", "email", "accounting"] as const).map(value => ({ integrations: [value] }))];
  for (const patch of patches) { const result = calculateEstimate({ ...estimateDefaults, ...patch }); expect(result.effortWeeks).toBeGreaterThan(baseline.effortWeeks); expect(result.price.high).toBeGreaterThanOrEqual(baseline.price.high); }
});
it("keeps urgency separate from effort, shortening the calendar with a higher demo price", () => {
  const standard = calculateEstimate(estimateDefaults), urgent = calculateEstimate({ ...estimateDefaults, urgency: "urgent" });
  expect(urgent.effortWeeks).toBe(standard.effortWeeks); expect(urgent.timeline.high).toBeLessThanOrEqual(standard.timeline.high); expect(urgent.price.high).toBeGreaterThan(standard.price.high);
});
it("takes all pricing rates from editable content and responds to a changed model", () => {
  const baseline = calculateEstimate(estimateDefaults), edited = calculateEstimate(estimateDefaults, { ...estimateModel, weeklyRate: estimateModel.weeklyRate * 2 });
  expect(edited.price.low).toBeGreaterThan(baseline.price.low); expect(edited.effortWeeks).toBe(baseline.effortWeeks);
});
it("changes phase shares when offline architecture and rollout scope grow", () => {
  const small = calculateEstimate(estimateDefaults), offline = calculateEstimate({ ...estimateDefaults, offline: true, branches: 10 });
  expect(offline.phases.find(phase => phase.id === "architecture")!.share).not.toBe(small.phases.find(phase => phase.id === "architecture")!.share);
});
it("handles the largest supported scope without overflow or unordered ranges", () => {
  const result = calculateEstimate({ ...estimateDefaults, branches: 100, roles: 20, offline: true, integrations: ["payments", "sms", "email", "accounting"], migration: true, urgency: "urgent" });
  expect(Number.isFinite(result.price.high)).toBe(true); expect(result.timeline.high).toBeGreaterThan(result.timeline.low);
});
it("rejects invalid counts, enums, duplicated integrations and reversed model ranges", () => {
  for (const patch of [{ branches: 0 }, { branches: 101 }, { roles: 1.5 }, { roles: 21 }, { branches: NaN }, { integrations: ["email", "email"] }, { projectType: "unknown" }]) expect(estimateInputSchema.safeParse({ ...estimateDefaults, ...patch }).success).toBe(false);
  expect(() => calculateEstimate({ ...estimateDefaults, branches: -1 })).toThrow();
  expect(() => calculateEstimate(estimateDefaults, { ...estimateModel, range: { low: 2, high: 1 } })).toThrow();
});
it("encodes a complete, explicitly DEMO summary into both contact destinations", () => {
  const input = { ...estimateDefaults, branches: 8, offline: true, integrations: ["payments", "email"] as EstimateInput["integrations"] }, result = calculateEstimate(input);
  const lines = estimateSummary(input, result), email = new URL(estimateUrl(input, result, "email")), whatsapp = new URL(estimateUrl(input, result, "whatsapp"));
  expect(email.pathname).toBe(site.email); expect(email.searchParams.get("subject")).toBe(c.subject);
  for (const line of lines) { expect(email.searchParams.get("body")).toContain(line); expect(whatsapp.searchParams.get("text")).toContain(line); }
  expect(lines.join("\n")).toContain(c.demoNotice); expect(lines.join("\n")).toContain(`${c.summaryLabels.branches}: 8`);
});
