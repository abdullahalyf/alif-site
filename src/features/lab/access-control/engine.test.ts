import { expect, it } from "vitest";
import { operationSchema, resourceSchema, roleSchema, type AccessRequest } from "@/content/schemas/lab";
import { evaluateAccess } from "./engine";
const request: AccessRequest = { role: "cashier", resource: "sales", operation: "write", context: { actorBranch: "DHK", recordBranch: "DHK", actorId: "me", recordOwnerId: "me" } };
it("lets the owner operate on any resource in any branch", () => {
  for (const resource of resourceSchema.options) for (const operation of operationSchema.options) expect(evaluateAccess({ ...request, role: "owner", resource, operation, context: { ...request.context, recordBranch: "SYL", recordOwnerId: "other" } })).toEqual({ allowed: true, rule: "owner-global" });
});
it("allows a cashier to edit their own sale but denies a teammate's row", () => {
  expect(evaluateAccess(request)).toEqual({ allowed: true, rule: "own-sale" });
  expect(evaluateAccess({ ...request, context: { ...request.context, recordOwnerId: "other" } })).toEqual({ allowed: false, rule: "cashier-owner-denied" });
});
it("checks branch scope even when the role has the underlying permission", () => {
  expect(evaluateAccess({ ...request, context: { ...request.context, recordBranch: "SYL" } })).toEqual({ allowed: false, rule: "branch-denied" });
  expect(evaluateAccess({ ...request, role: "manager", resource: "refunds", operation: "approve" })).toEqual({ allowed: true, rule: "branch-grant" });
  expect(evaluateAccess({ ...request, role: "manager", resource: "refunds", operation: "approve", context: { ...request.context, recordBranch: "SYL" } }).allowed).toBe(false);
});
it("does not turn a refund request into approval or allow inventory clerks to alter prices", () => {
  expect(evaluateAccess({ ...request, resource: "refunds", operation: "write" }).allowed).toBe(true);
  expect(evaluateAccess({ ...request, resource: "refunds", operation: "approve" })).toEqual({ allowed: false, rule: "role-denied" });
  expect(evaluateAccess({ ...request, role: "inventory", resource: "stock" }).allowed).toBe(true);
  expect(evaluateAccess({ ...request, role: "inventory", resource: "prices" }).allowed).toBe(false);
});
it("permits cross-branch finance reads but keeps financial writes scoped", () => {
  const finance: AccessRequest = { ...request, role: "accountant", resource: "reports", operation: "read", context: { ...request.context, recordBranch: "SYL" } };
  expect(evaluateAccess(finance)).toEqual({ allowed: true, rule: "finance-read" });
  expect(evaluateAccess({ ...finance, operation: "write" }).allowed).toBe(false);
});
it("allows auditors to inspect every resource but never mutate or approve", () => {
  for (const resource of resourceSchema.options) {
    expect(evaluateAccess({ ...request, role: "auditor", resource, operation: "read", context: { ...request.context, recordBranch: "SYL" } })).toEqual({ allowed: true, rule: "audit-read" });
    for (const operation of ["write", "approve"] as const) expect(evaluateAccess({ ...request, role: "auditor", resource, operation }).allowed).toBe(false);
  }
});
it("returns an explicit rule for all role/resource/operation combinations without mutating inputs", () => {
  for (const role of roleSchema.options) for (const resource of resourceSchema.options) for (const operation of operationSchema.options) {
    const input = { ...request, role, resource, operation }, snapshot = JSON.stringify(input);
    expect(evaluateAccess(input).rule).toBeTruthy(); expect(JSON.stringify(input)).toBe(snapshot);
  }
});
it("rejects unknown roles and missing scope instead of granting a default", () => {
  expect(() => evaluateAccess({ ...request, role: "superuser" } as unknown as AccessRequest)).toThrow();
  expect(() => evaluateAccess({ ...request, context: { ...request.context, actorBranch: "" } })).toThrow();
});
