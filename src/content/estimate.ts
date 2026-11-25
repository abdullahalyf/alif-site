import type { EstimateInput, EstimateModel } from "./schemas/estimate";

const systemShares = { discovery: 0.15, architecture: 0.2, build: 0.5, rollout: 0.15 };
const siteShares = { discovery: 0.1, architecture: 0.1, build: 0.65, rollout: 0.15 };
// Typical Bangladesh-market ranges in BDT. The final quote is agreed after a short call.
export const estimateModel: EstimateModel = {
  currency: "BDT",
  types: {
    custom: { price: null, weeks: null, shares: systemShares, counts: true, offline: true, migration: true },
    pos: { price: { low: 40000, high: 120000 }, weeks: { low: 4, high: 8 }, shares: systemShares, counts: true, offline: true, migration: true },
    backoffice: { price: { low: 50000, high: 150000 }, weeks: { low: 5, high: 10 }, shares: systemShares, counts: true, offline: true, migration: true },
    business: { price: { low: 15000, high: 40000 }, weeks: { low: 2, high: 4 }, shares: siteShares, counts: false, offline: false, migration: true },
    landing: { price: { low: 8000, high: 15000 }, weeks: { low: 1, high: 2 }, shares: siteShares, counts: false, offline: false, migration: false },
    portfolio: { price: { low: 5000, high: 12000 }, weeks: { low: 1, high: 2 }, shares: siteShares, counts: false, offline: false, migration: false },
    ecommerce: { price: { low: 30000, high: 80000 }, weeks: { low: 3, high: 6 }, shares: siteShares, counts: false, offline: false, migration: true },
    dashboard: { price: { low: 25000, high: 200000 }, weeks: { low: 3, high: 12 }, shares: systemShares, counts: true, offline: true, migration: true },
    mobile: { price: { low: 80000, high: 250000 }, weeks: { low: 6, high: 12 }, shares: systemShares, counts: true, offline: true, migration: true },
  },
  growth: { perExtraBranch: 0.06, perExtraRole: 0.04, offline: 0.2, perIntegration: 0.07, migration: 0.12, max: 1.5 },
  calendarGrowth: 0.6,
  urgency: { flexible: { calendarFactor: 1.15, priceFactor: 0.95 }, standard: { calendarFactor: 1, priceFactor: 1 }, urgent: { calendarFactor: 0.85, priceFactor: 1.25 } },
};
export const estimateDefaults: EstimateInput = { projectType: "pos", branches: 1, roles: 3, offline: false, integrations: [], migration: false, urgency: "standard" };
export const serviceEstimatePresets: Readonly<Record<string, Pick<EstimateInput, "projectType" | "offline">>> = Object.fromEntries(
  (["custom", "pos", "backoffice", "business", "landing", "portfolio", "ecommerce", "dashboard", "mobile"] as const).map((id) => [id, { projectType: id, offline: false }]),
);

const taka = (amount: number) => `৳${amount.toLocaleString("en-IN")}`;
export const estimateContent = {
  path: "/estimate",
  title: "A first shape for your project",
  description: "Pick what you need and see a typical price range in Bangladeshi taka and a typical timeline.",
  label: "Before we build",
  intro: "Choose what you want built, then adjust a few details to see a typical price range and timeline. Final prices are agreed after a short call.",
  rangeNotice: "Typical range, final quote after a short call",
  rangeExplanation: "This is a starting range for planning. I give a fixed quote after a short call about your project.",
  customQuote: "Quote after a short call",
  customHint: "Custom software depends too much on the problem for a typical range. Tell me what you need and I will quote after a short call.",
  staticNote: "Interactive controls need JavaScript. The starting example and its contact links remain readable and usable without it.",
  formTitle: "Tell me about the system",
  fields: { projectType: "Project type", branches: "Branches / locations", roles: "Number of user roles", offline: "Needs to work offline", integrations: "Integrations", migration: "Existing data needs migrating", urgency: "Timeline urgency" },
  projectTypes: { custom: "Custom software", pos: "POS software", backoffice: "Back-office & inventory", business: "Business website", landing: "Landing page", portfolio: "Personal / portfolio site", ecommerce: "E-commerce", dashboard: "Dashboard / web app", mobile: "Mobile-first app" },
  integrationLabels: { payments: "Payments", sms: "SMS", email: "Email", accounting: "Accounting" },
  urgencyLabels: { flexible: "Flexible", standard: "Standard", urgent: "Urgent" },
  offlineHint: "Include local storage, a sync queue and reconciliation when connectivity returns.",
  urgencyHint: "Urgency changes calendar and pricing assumptions; it does not remove the work of a careful rollout.",
  branchesError: "Enter a whole number from 1 to 100.",
  rolesError: "Enter a whole number from 1 to 20.",
  invalid: "Check the highlighted scope values to see a planning range.",
  resultTitle: "A planning range",
  timelineLabel: "Estimated timeline",
  priceLabel: "Typical price",
  phasesTitle: "Where the effort goes",
  phaseLabels: { discovery: "Discovery", architecture: "Architecture", build: "Build", rollout: "Rollout" },
  phaseNote: "Relative effort across the four phases. Calendar weeks depend on scope, feedback and rollout needs.",
  phaseWeeks: (weeks: number) => `${weeks.toFixed(1)} effort weeks`,
  weeksRange: (range: { low: number; high: number }) => `${range.low}–${range.high} weeks`,
  priceRange: (range: { low: number; high: number }) => `${taka(range.low)}–${taka(range.high)}`,
  phaseChartLabel: "Relative effort allocation: discovery, architecture, build and rollout. Exact values are listed below.",
  sendTitle: "Send this to Alif",
  sendIntro: "Use this as a starting brief. Add your context in the message before sending it.",
  emailLink: "Email this estimate",
  whatsappLink: "Send on WhatsApp",
  subject: "Project planning estimate",
  yes: "Yes", no: "No", none: "None",
  summaryLabels: { projectType: "Project type", branches: "Branches / locations", roles: "User roles", offline: "Offline required", integrations: "Integrations", migration: "Data migration", urgency: "Urgency", timeline: "Timeline", price: "Typical price" },
  labPath: "/lab",
  labLink: "Explore the systems lab",
};
