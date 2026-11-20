import { servicesSchema } from "./schemas/services";
export const servicesContent = servicesSchema.parse({
  title: "Software built around your business.",
  intro:
    "Give your team one place to run sales, track stock and keep working when the internet drops.",
  label: "Software services",
  browseLabel: "Explore services",
  deliverablesLabel: "Typical deliverables",
  timelineLabel: "Typical timeline",
  processTitle: "How an engagement works",
  recommendedModel: "Fixed-scope project",
  recommendedLabel: "Recommended for a first build",
  demoPriceLabel: "Demo price",
  modelsTitle: "Ways to work together",
  faqTitle: "Before we begin",
  cta: "Tell me about your project",
  contactPath: "/contact",
  estimateLabel: "Estimate this",
  startingLabel: "Demo starting point",
  demoNote: "Demo prices and timelines are examples for planning. I confirm scope and pricing with you before work starts.",
  // DEMO: indicative scope, timelines and engagement terms; confirm before offering.
  blocks: [
    {
      title: "System architecture",
      icon: "architecture",
      description: "Map how orders, stock and people fit together before you commit to building.",
      deliverables: [
        "A map of your data and workflows",
        "Risks and what to do if things fail",
        "A release plan and cost assumptions",
      ],
      timeline: "1–2 weeks",
      maxWeeks: 2,
      startingPrice: "From $650 USD",
    },
    {
      title: "Business software",
      icon: "operations",
      description: "Run sales and stock from one system, and see how each location is doing.",
      deliverables: [
        "A tailored checkout, stock or operations workflow",
        "A dashboard tailored to each role",
        "Tests, documentation and handover",
      ],
      timeline: "6–12 weeks",
      maxWeeks: 12,
      startingPrice: "From $3,650 USD",
    },
    {
      title: "Offline-first apps",
      icon: "offline",
      description: "Save orders and field updates on the device, then sync when the connection comes back.",
      deliverables: [
        "On-device storage and a queue for pending work",
        "Automatic retries that avoid duplicate updates",
        "A plan for recovery and conflicting changes",
      ],
      timeline: "4–8 weeks",
      maxWeeks: 8,
      startingPrice: "From $2,600 USD",
    },
    {
      title: "Database & access control",
      icon: "access",
      description: "Give staff access to the records they need and keep sensitive actions in the right hands.",
      deliverables: [
        "Database structure and migration plan",
        "A clear table of who can view or change records",
        "Backup and database performance review",
      ],
      timeline: "1–3 weeks",
      maxWeeks: 3,
      startingPrice: "From $650 USD",
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
      price: "From $3,650 USD / project",
    },
    {
      title: "Monthly retainer",
      bestFor: "Ongoing improvements and care for an existing system.",
      price: "From $1,300 USD / month",
    },
    {
      title: "Architecture review",
      bestFor: "An independent review before a major technical decision.",
      price: "From $650 USD / review",
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

export const serviceDetails = {
  audienceLabel: "Who it's for",
  whyTitle: "Why work with me",
  reasons: [
    { title: "Decisions with reasons", text: "I explain what each option buys, what it costs, and what would make me revisit the decision." },
    { title: "Small releases with AI", text: "I give agents defined tasks so you can review a working slice early." },
    { title: "Tested and reviewed", text: "I review changes and test realistic failure cases before release." },
    { title: "Offline-first experience", text: "I design for lost connections, retries, and reconciliation when work must keep moving." },
  ],
  byService: {
    architecture: {
      audience: "Teams preparing a build, replacing a fragile system, or facing a decision they want to validate first.",
    },
    operations: {
      audience: "Operators managing sales, stock or approvals across more than one role or location.",
    },
    offline: {
      audience: "Counter staff and field teams who need to finish work without steady internet.",
    },
    access: {
      audience: "Teams with shared records, branch boundaries or permissions that are hard to audit.",
    },
  },
};

export const serviceMockups = {
  hero: ["Your business", "Your system", "Your dashboard"],
  architecture: {
    title: "Order workflow",
    nodes: ["New order", "Check stock", "Send receipt"],
    labels: ["Sales", "Inventory", "Customer"],
  },
  operations: {
    title: "Sales overview",
    summary: "Sales this week",
    value: "$8,420",
    order: "Open order",
    amount: "$42.50",
    action: "Take payment",
    days: ["M", "T", "W", "T", "F", "S", "S"],
  },
  offline: {
    title: "Field orders",
    connection: "Connection lost",
    statuses: ["Saved on device", "Waiting to sync", "Synced when online"],
  },
  access: {
    title: "Staff permissions",
    headers: ["Role", "View", "Edit", "Refund"],
    roles: ["Owner", "Manager", "Cashier"],
  },
} as const;
