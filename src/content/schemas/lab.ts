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

export const roleSchema = z.enum(["owner", "manager", "cashier", "inventory", "accountant", "auditor"]);
export const resourceSchema = z.enum(["sales", "refunds", "stock", "prices", "reports", "staff"]);
export const operationSchema = z.enum(["read", "write", "approve"]);
export const accessContextSchema = z.object({ actorBranch: z.string().min(1), recordBranch: z.string().min(1), actorId: z.string().min(1), recordOwnerId: z.string().min(1) });
export const accessRequestSchema = z.object({ role: roleSchema, resource: resourceSchema, operation: operationSchema, context: accessContextSchema });
export type Role = z.infer<typeof roleSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type Operation = z.infer<typeof operationSchema>;
export type AccessContext = z.infer<typeof accessContextSchema>;
export type AccessRequest = z.infer<typeof accessRequestSchema>;
