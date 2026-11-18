import { z } from "zod";

export const projectTypeSchema = z.enum(["pos", "dashboard", "web", "mobile"]);
export const integrationSchema = z.enum(["payments", "sms", "email", "accounting"]);
export const urgencySchema = z.enum(["flexible", "standard", "urgent"]);
export const estimateInputSchema = z.object({
  projectType: projectTypeSchema,
  branches: z.number().int().min(1).max(100),
  roles: z.number().int().min(1).max(20),
  offline: z.boolean(),
  integrations: z.array(integrationSchema).max(4).refine(values => new Set(values).size === values.length, "Integrations must be unique"),
  migration: z.boolean(),
  urgency: urgencySchema,
});
const positive = z.number().positive();
const nonnegative = z.number().nonnegative();
export const estimateModelSchema = z.object({
  currency: z.enum(["USD", "BDT"]),
  weeklyRate: positive,
  baseBuildWeeks: z.record(projectTypeSchema, positive),
  discovery: z.object({ base: positive, perRole: nonnegative, migration: nonnegative }),
  architecture: z.object({ base: positive, perExtraBranch: nonnegative, offline: nonnegative, perIntegration: nonnegative }),
  build: z.object({ perExtraBranch: nonnegative, perExtraRole: nonnegative, offline: nonnegative, migration: nonnegative }),
  rollout: z.object({ base: positive, perExtraBranch: nonnegative, migration: nonnegative }),
  integrationWeeks: z.record(integrationSchema, nonnegative),
  range: z.object({ low: positive, high: positive }).refine(value => value.low <= value.high, "Range must be ordered"),
  urgency: z.record(urgencySchema, z.object({ calendarFactor: positive, priceFactor: positive })),
});
export type EstimateInput = z.infer<typeof estimateInputSchema>;
export type EstimateModel = z.infer<typeof estimateModelSchema>;
