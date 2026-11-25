import { z } from "zod";
const text = z.string().min(1);
const entry = z.object({ title: text, org: text.optional(), period: text.optional(), note: text.optional(), bullets: z.array(text).optional(), links: z.array(z.object({ label: text, href: text })).optional() });
export const resumeSchema = z.object({
  title: text,
  description: text,
  name: text,
  role: text,
  location: text,
  profile: text,
  download: z.object({ label: text, href: text }),
  print: text,
  note: text,
  contactLabel: text,
  sections: z.array(z.object({
    id: text,
    title: text,
    entries: z.array(entry).optional(),
    lines: z.array(z.object({ label: text.optional(), value: text })).optional(),
  })).min(1),
});
