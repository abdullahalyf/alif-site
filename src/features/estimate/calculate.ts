import { estimateInputSchema, estimateModelSchema, type EstimateInput, type EstimateModel } from "@/content/schemas/estimate";
import { estimateModel } from "@/content/estimate";
import { calculateRange } from "./calculate-range";

export function calculateEstimate(input: EstimateInput, model: EstimateModel = estimateModel) {
  return calculateRange(estimateInputSchema.parse(input), estimateModelSchema.parse(model));
}
