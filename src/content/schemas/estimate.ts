import { z } from "zod";
import { estimateLimits, integrations, projectTypes, urgencyLevels } from "../estimate-options";

export const projectTypeSchema = z.enum(projectTypes);
export const integrationSchema = z.enum(integrations);
export const urgencySchema = z.enum(urgencyLevels);
export const estimateInputSchema = z.object({
  projectType: projectTypeSchema,
  branches: z.number().int().min(1).max(estimateLimits.branches),
  roles: z.number().int().min(1).max(estimateLimits.roles),
  offline: z.boolean(),
  integrations: z.array(integrationSchema).max(integrations.length).refine(values => new Set(values).size === values.length, "Integrations must be unique"),
  migration: z.boolean(),
  urgency: urgencySchema,
});
const positive = z.number().positive();
const nonnegative = z.number().nonnegative();
const range = z.object({ low: positive, high: positive }).refine(value => value.low <= value.high, "Range must be ordered");
const shares = z.object({ discovery: positive, architecture: positive, build: positive, rollout: positive }).refine(value => Math.abs(value.discovery + value.architecture + value.build + value.rollout - 1) < 1e-9, "Phase shares must add up to 1");
export const estimateModelSchema = z.object({
  currency: z.literal("BDT"),
  types: z.record(projectTypeSchema, z.object({
    price: range.nullable(),
    weeks: range.nullable(),
    shares,
    counts: z.boolean(),
    offline: z.boolean(),
    migration: z.boolean(),
  })),
  growth: z.object({ perExtraBranch: nonnegative, perExtraRole: nonnegative, offline: nonnegative, perIntegration: nonnegative, migration: nonnegative, max: positive }),
  calendarGrowth: positive,
  urgency: z.record(urgencySchema, z.object({ calendarFactor: positive, priceFactor: positive })),
});
export type EstimateInput = z.infer<typeof estimateInputSchema>;
export type EstimateModel = z.infer<typeof estimateModelSchema>;
