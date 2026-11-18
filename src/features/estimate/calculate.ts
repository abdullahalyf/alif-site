import { estimateInputSchema, estimateModelSchema, type EstimateInput, type EstimateModel } from "@/content/schemas/estimate";
import { estimateModel } from "@/content/estimate";

export type PhaseId = "discovery" | "architecture" | "build" | "rollout";
export type EstimateResult = { timeline: { low: number; high: number }; price: { low: number; high: number }; effortWeeks: number; phases: { id: PhaseId; weeks: number; share: number }[] };
export function calculateEstimate(raw: EstimateInput, rawModel: EstimateModel = estimateModel): EstimateResult {
  const input = estimateInputSchema.parse(raw), model = estimateModelSchema.parse(rawModel);
  const extraBranches = input.branches - 1, extraRoles = Math.max(0, input.roles - 2);
  const phaseWeeks: Record<PhaseId, number> = {
    discovery: model.discovery.base + input.roles * model.discovery.perRole + (input.migration ? model.discovery.migration : 0),
    architecture: model.architecture.base + extraBranches * model.architecture.perExtraBranch + (input.offline ? model.architecture.offline : 0) + input.integrations.length * model.architecture.perIntegration,
    build: model.baseBuildWeeks[input.projectType] + extraBranches * model.build.perExtraBranch + extraRoles * model.build.perExtraRole + (input.offline ? model.build.offline : 0) + (input.migration ? model.build.migration : 0) + input.integrations.reduce((sum, integration) => sum + model.integrationWeeks[integration], 0),
    rollout: model.rollout.base + extraBranches * model.rollout.perExtraBranch + (input.migration ? model.rollout.migration : 0),
  };
  const effortWeeks = Object.values(phaseWeeks).reduce((sum, weeks) => sum + weeks, 0);
  const urgency = model.urgency[input.urgency];
  const price = effortWeeks * model.weeklyRate * urgency.priceFactor;
  const lowWeeks = Math.max(1, Math.floor(effortWeeks * model.range.low * urgency.calendarFactor));
  const lowPrice = Math.max(100, Math.floor(price * model.range.low / 100) * 100);
  return {
    timeline: { low: lowWeeks, high: Math.max(lowWeeks, Math.ceil(effortWeeks * model.range.high * urgency.calendarFactor)) },
    price: { low: lowPrice, high: Math.max(lowPrice, Math.ceil(price * model.range.high / 100) * 100) },
    effortWeeks,
    phases: (Object.entries(phaseWeeks) as [PhaseId, number][]).map(([id, weeks]) => ({ id, weeks, share: weeks / effortWeeks })),
  };
}
