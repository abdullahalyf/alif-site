import { z } from "zod";
const text = z.string().min(1);
export const servicesSchema = z.object({
  title: text,
  intro: text,
  label: text,
  browseLabel: text,
  allServicesLabel: text,
  timelineLabel: text,
  processTitle: text,
  modelsTitle: text,
  faqTitle: text,
  cta: text,
  contactPath: text,
  estimateLabel: text,
  rangeLabel: text,
  rangeNote: text,
  recommendedModel: text,
  recommendedLabel: text,
  priceLabel: text,
  blocks: z
    .array(
      z.object({
        id: z.enum(["custom", "pos", "backoffice", "business", "landing", "portfolio", "ecommerce", "dashboard", "mobile"]),
        title: text,
        description: text,
        timeline: text,
        range: text,
        rangeNote: text.optional(),
      }),
    )
    .length(9),
  steps: z.array(z.object({ title: text, text })).length(5),
  models: z
    .array(z.object({ title: text, bestFor: text, price: text }))
    .length(3),
  faqs: z.array(z.object({ question: text, answer: text })).length(8),
});
