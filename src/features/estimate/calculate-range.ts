import type { EstimateInput, EstimateModel } from "@/content/schemas/estimate";
import { estimateModel } from "@/content/estimate";

export type PhaseId = "discovery" | "architecture" | "build" | "rollout";
type Range = { low: number; high: number };
export type EstimateResult = { timeline: Range | null; price: Range | null; effortWeeks: number | null; phases: { id: PhaseId; weeks: number; share: number }[] };

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

export function calculateRange(input: EstimateInput, model: EstimateModel = estimateModel): EstimateResult {
  const type = model.types[input.projectType];
  if (!type.price || !type.weeks) return { timeline: null, price: null, effortWeeks: null, phases: [] };
  const g = model.growth;
  const growth = Math.min(g.max,
    (type.counts ? (input.branches - 1) * g.perExtraBranch + Math.max(0, input.roles - 2) * g.perExtraRole : 0)
    + (type.offline && input.offline ? g.offline : 0)
    + input.integrations.length * g.perIntegration
    + (type.migration && input.migration ? g.migration : 0));
  const urgency = model.urgency[input.urgency];
  const weeksFactor = 1 + growth * model.calendarGrowth;
  const effortWeeks = (type.weeks.low + type.weeks.high) / 2 * weeksFactor;
  const lowWeeks = Math.max(1, Math.floor(type.weeks.low * weeksFactor * urgency.calendarFactor));
  const lowPrice = Math.max(500, roundTo(type.price.low * (1 + growth) * urgency.priceFactor, 500));
  return {
    timeline: { low: lowWeeks, high: Math.max(lowWeeks, Math.ceil(type.weeks.high * weeksFactor * urgency.calendarFactor)) },
    price: { low: lowPrice, high: Math.max(lowPrice, roundTo(type.price.high * (1 + growth) * urgency.priceFactor, 500)) },
    effortWeeks,
    phases: (Object.entries(type.shares) as [PhaseId, number][]).map(([id, share]) => ({ id, weeks: effortWeeks * share, share })),
  };
}
