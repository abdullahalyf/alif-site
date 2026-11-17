import { z } from "zod";

export const labDemoSchema = z.object({
  id: z.string().regex(/^[a-z]+(?:-[a-z]+)*$/),
  path: z.string().startsWith("/lab/"),
  title: z.string().min(1),
  summary: z.string().min(1),
});
export const labSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  demos: z.array(labDemoSchema).min(1).refine(items => new Set(items.map(item => item.path)).size === items.length, "Demo paths must be unique"),
});

export const terminalSchema = z.object({
  id: z.string().regex(/^[a-z]+$/),
  name: z.string().min(1),
  prefix: z.string().regex(/^[A-Z]{3}-\d{2}$/),
});
export type TerminalDefinition = z.infer<typeof terminalSchema>;
