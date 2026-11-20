import { servicesSchema } from "./schemas/services";
export const servicesContent = servicesSchema.parse({
  title: "Software built around your business.",
  intro:
    "Start with the decisions that matter: how work flows, who needs access, and what must keep working when things go wrong.",
  deliverablesLabel: "Typical deliverables",
  timelineLabel: "Typical timeline",
  processTitle: "How an engagement works",
  modelsTitle: "Ways to work together",
  faqTitle: "Before we begin",
  cta: "Tell me about your project",
  contactPath: "/contact",
  estimatePath: "/estimate",
  estimateLabel: "Estimate this service",
  // DEMO: indicative scope, timelines and engagement terms; confirm before offering.
  blocks: [
    {
      title: "System architecture",
      icon: "architecture",
      description: "A practical blueprint before committing to a build.",
      deliverables: [
        "Domain and data model",
        "Risk and failure-mode review",
        "Release plan and cost assumptions",
      ],
      timeline: "DEMO — 1–2 weeks, depending on scope",
    },
    {
      title: "Business software",
      icon: "operations",
      description: "Make daily operations clear, traceable and easier to run.",
      deliverables: [
        "POS, inventory or operations workflows",
        "Role-based dashboard",
        "Tests, documentation and handover",
      ],
      timeline: "DEMO — 6–12 weeks for an initial release",
    },
    {
      title: "Offline-first apps",
      icon: "offline",
      description:
        "Keep essential work moving through unreliable connectivity.",
      deliverables: [
        "Local persistence and operation queue",
        "Retry-safe synchronisation",
        "Recovery and conflict scenarios",
      ],
      timeline: "DEMO — 4–8 weeks for a focused workflow",
    },
    {
      title: "Database & access control",
      icon: "access",
      description:
        "Design the rules that protect the system beneath the interface.",
      deliverables: [
        "Schema and migration plan",
        "Permission matrix and RLS policies",
        "Backup and query review",
      ],
      timeline: "DEMO — 1–3 weeks",
    },
  ],
  steps: [
    {
      title: "Share the context",
      text: "Describe the business, users and current pain points.",
    },
    {
      title: "Map the constraints",
      text: "Agree on access, connectivity, budget and responsibilities.",
    },
    {
      title: "Define the first release",
      text: "Write down scope, acceptance criteria and a delivery plan.",
    },
    {
      title: "Build and review",
      text: "I direct AI agents to implement scoped changes, then review and test small releases with the people using them.",
    },
    {
      title: "Launch and hand over",
      text: "Test recovery, document ownership and agree on support.",
    },
  ],
  models: [
    {
      title: "Fixed-scope project",
      bestFor: "A defined problem with clear acceptance criteria.",
      price: "DEMO — starting price to be agreed after discovery",
    },
    {
      title: "Monthly retainer",
      bestFor: "Ongoing improvements and care for an existing system.",
      price: "DEMO — monthly starting price to be confirmed",
    },
    {
      title: "Architecture review",
      bestFor: "An independent review before a major technical decision.",
      price: "DEMO — review starting price to be confirmed",
    },
  ],
  faqs: [
    {
      question: "What should I send first?",
      answer:
        "A short description of your users, current process and main problem is enough.",
    },
    {
      question: "Can you work with an existing system?",
      answer:
        "Yes. We first review its constraints, ownership and deployment process.",
    },
    {
      question: "Do you work remotely?",
      answer:
        "Remote collaboration starts with written decisions and regular working demos.",
    },
    {
      question: "Can the app work offline?",
      answer:
        "We identify which workflows need local data and how conflicts should be resolved.",
    },
    {
      question: "How is pricing decided?",
      answer:
        "Scope, risks and acceptance criteria come first; a proposal follows.",
    },
    {
      question: "Who owns the code?",
      answer:
        "Ownership and licensing are agreed in writing before work begins.",
    },
    {
      question: "What happens after launch?",
      answer:
        "Handover and any ongoing support responsibilities are agreed in the proposal.",
    },
    {
      question: "Can we start small?",
      answer:
        "A focused architecture review or first workflow is often a useful starting point.",
    },
  ],
});
