import { z } from "zod";
const text = z.string().min(1);
export const briefProjectTypes = [
  "POS software",
  "Back-office / inventory",
  "Business website",
  "Landing page",
  "Personal or portfolio website",
  "E-commerce",
  "Dashboard or web app",
  "Mobile-first app",
  "Custom software",
  "Not sure yet",
] as const;
export const briefBudgets = ["Not sure yet", "Under ৳15,000", "৳15,000–50,000", "৳50,000–1,50,000", "৳1,50,000+"] as const;
export const contactContentSchema = z.object({
  title: text,
  heading: text,
  intro: text,
  response: text,
  availability: text,
  fallback: text,
  emailButton: text,
  whatsappButton: text,
  ready: text,
  subject: text,
  selectPlaceholder: text,
  invalid: text,
  channelsLabel: text,
  cards: z.array(z.object({ id: text, label: text, value: text, note: text, href: text.optional(), external: z.boolean().optional() })).min(1),
  formTitle: text,
  formIntro: text,
  offersLabel: text,
  cvPrompt: text,
  cvLabel: text,
  fields: z.array(
    z.object({
      name: z.enum([
        "name",
        "email",
        "company",
        "projectType",
        "budget",
        "timeline",
        "message",
      ]),
      label: text,
      options: z.array(text).optional(),
    }),
  ),
});
export const briefSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Use no more than 120 characters."),
  email: z.email("Enter a valid email address.").max(254),
  company: z.string().trim().max(200, "Use no more than 200 characters."),
  projectType: z.enum(briefProjectTypes, { error: "Choose a project type." }),
  budget: z.enum(briefBudgets, { error: "Choose a budget range." }),
  timeline: z.enum(["Flexible", "Within a month", "1–3 months", "3+ months"], {
    error: "Choose a timeline.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more (at least 20 characters).")
    .max(3000, "Keep your brief under 3,000 characters."),
});
export type Brief = z.infer<typeof briefSchema>;
