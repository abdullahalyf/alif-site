import { z } from "zod";
const text = z.string().min(1);
export const searchEntrySchema = z.object({
  title: text,
  description: text,
  href: z.string().startsWith("/"),
  type: z.enum(["page", "project", "post"]),
});
export const searchIndexSchema = z.array(searchEntrySchema);
export type SearchEntry = z.infer<typeof searchEntrySchema>;
export const searchContentSchema = z.object({
  title: text,
  intro: text,
  resultsLabel: text,
  open: text,
  close: text,
  label: text,
  loading: text,
  error: text,
  empty: text,
  hint: text,
  indexPath: text,
  groups: z.object({ page: text, project: text, post: text }),
  pages: z.array(
    z.object({
      title: text,
      description: text,
      href: z.string().startsWith("/"),
    }),
  ),
});
