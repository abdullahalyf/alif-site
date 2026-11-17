import { accessRequestSchema, type AccessRequest, type Operation, type Resource, type Role } from "@/content/schemas/lab";

export type AccessRule = "owner-global" | "role-denied" | "branch-denied" | "cashier-owner-denied" | "audit-read" | "finance-read" | "own-sale" | "branch-grant";
export type AccessDecision = { allowed: boolean; rule: AccessRule };
const permissions: Record<Exclude<Role, "owner">, Partial<Record<Resource, readonly Operation[]>>> = {
  manager: { sales: ["read", "write"], refunds: ["read", "write", "approve"], stock: ["read", "write", "approve"], prices: ["read", "write", "approve"], reports: ["read"], staff: ["read"] },
  cashier: { sales: ["read", "write"], refunds: ["read", "write"], prices: ["read"] },
  inventory: { stock: ["read", "write"], prices: ["read"] },
  accountant: { sales: ["read"], refunds: ["read", "approve"], reports: ["read", "write"] },
  auditor: { sales: ["read"], refunds: ["read"], stock: ["read"], prices: ["read"], reports: ["read"], staff: ["read"] },
};
/** A demonstrative server-style policy: permission, branch scope, then row ownership. */
export function evaluateAccess(input: AccessRequest): AccessDecision {
  const { role, resource, operation, context } = accessRequestSchema.parse(input);
  if (role === "owner") return { allowed: true, rule: "owner-global" };
  if (!permissions[role][resource]?.includes(operation)) return { allowed: false, rule: "role-denied" };
  if (operation === "read" && role === "auditor") return { allowed: true, rule: "audit-read" };
  if (operation === "read" && role === "accountant") return { allowed: true, rule: "finance-read" };
  if (context.actorBranch !== context.recordBranch) return { allowed: false, rule: "branch-denied" };
  if (role === "cashier" && resource === "sales" && operation === "write") {
    return context.actorId === context.recordOwnerId ? { allowed: true, rule: "own-sale" } : { allowed: false, rule: "cashier-owner-denied" };
  }
  return { allowed: true, rule: "branch-grant" };
}
