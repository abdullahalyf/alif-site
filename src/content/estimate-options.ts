export const projectTypes = ["pos", "dashboard", "web", "mobile"] as const;
export const integrations = ["payments", "sms", "email", "accounting"] as const;
export const urgencyLevels = ["flexible", "standard", "urgent"] as const;
export const estimateLimits = { branches: 100, roles: 20 };

export function validEstimateCount(value: number, field: keyof typeof estimateLimits) {
  return Number.isInteger(value) && value >= 1 && value <= estimateLimits[field];
}
