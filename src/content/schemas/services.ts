import { z } from "zod";
const text = z.string().min(1);
export const servicesSchema = z.object({
  title: text,
  intro: text,
  label: text,
  browseLabel: text,
  deliverablesLabel: text,
  timelineLabel: text,
  processTitle: text,
  modelsTitle: text,
  faqTitle: text,
  cta: text,
  contactPath: text,
  estimateLabel: text,
  startingLabel: text,
  demoNote: text,
  recommendedModel: text,
  recommendedLabel: text,
  demoPriceLabel: text,
  blocks: z
    .array(
      z.object({
        title: text,
        icon: z.enum(["architecture", "operations", "offline", "access"]),
        description: text,
        deliverables: z.array(text).min(1),
        timeline: text,
        maxWeeks: z.number().int().positive(),
        startingPrice: text,
      }),
    )
    .length(4),
  steps: z.array(z.object({ title: text, text })).length(5),
  models: z
    .array(z.object({ title: text, bestFor: text, price: text }))
    .length(3),
  faqs: z.array(z.object({ question: text, answer: text })).length(8),
});
