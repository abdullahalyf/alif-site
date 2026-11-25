import { site } from "@/content/site";
import { estimateContent as c } from "@/content/estimate";
import type { EstimateInput } from "@/content/schemas/estimate";
import type { EstimateResult } from "./calculate-range";

export function estimateSummary(input: EstimateInput, result: EstimateResult): string[] {
  const fields: [string, string][] = [
    [c.summaryLabels.projectType, c.projectTypes[input.projectType]],
    [c.summaryLabels.branches, String(input.branches)],
    [c.summaryLabels.roles, String(input.roles)],
    [c.summaryLabels.offline, input.offline ? c.yes : c.no],
    [c.summaryLabels.integrations, input.integrations.length ? input.integrations.map(value => c.integrationLabels[value]).join(", ") : c.none],
    [c.summaryLabels.migration, input.migration ? c.yes : c.no],
    [c.summaryLabels.urgency, c.urgencyLabels[input.urgency]],
    [c.summaryLabels.timeline, result.timeline ? c.weeksRange(result.timeline) : c.customQuote],
    [c.summaryLabels.price, result.price ? c.priceRange(result.price) : c.customQuote],
  ];
  return [...fields.map(([label, value]) => `${label}: ${value}`), c.rangeNotice];
}
/** Same explicit mailto/WhatsApp handoff as the contact brief; no background submission. */
export function estimateUrl(input: EstimateInput, result: EstimateResult, channel: "email" | "whatsapp"): string {
  const body = estimateSummary(input, result).join("\n\n");
  if (channel === "email") return `mailto:${site.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
  const url = new URL(site.whatsapp.href); url.searchParams.set("text", `${c.subject}\n\n${body}`); return url.href;
}
