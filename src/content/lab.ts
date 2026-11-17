import { labSchema } from "./schemas/lab";

export const labContent = {
  path: "/lab",
  title: "Lab — things you can play with",
  description: "Small, interactive demonstrations of offline-first systems and the rules that keep business data reliable.",
  label: "From the systems notebook",
  intro: "A few working ideas, made small enough to explore. Try a disconnected counter, follow a sale to the cloud, or test the boundaries of a role.",
  tryDemo: "Try it",
  back: "All lab demos",
  estimatePath: "/estimate",
  estimateLink: "Plan a project",
  estimateIntro: "Thinking about a system for your own team? Start with a few practical questions.",
  demos: [
    { id: "offline-sync", path: "/lab/offline-sync", title: "Offline-first sync", summary: "Disconnect a branch, keep selling, and reconnect without counting the same sale twice." },
    { id: "access-control", path: "/lab/access-control", title: "Who can do what?", summary: "Explore six POS roles and see which rule allows or denies an action." },
  ],
};
labSchema.parse(labContent);

// DEMO: illustrative terminals, transactions and amounts; no live client data.
export const syncContent = {
  ...labContent.demos[0],
  intro: "Turn a counter’s connection off, make a few sales, then reconnect. Each order keeps its identity all the way from the local queue to the owner’s dashboard.",
  note: "A browser simulation inspired by the POS case study. These are demo transactions, not a connection to a real shop.",
  caseStudyPath: "/work/multi-branch-pos",
  caseStudyLink: "Read the POS case study",
  staticNote: "Interactive controls need JavaScript. The system diagram and starting state are readable without it.",
  branches: [{ id: "dhaka", name: "Dhaka", prefix: "DHK-02" }, { id: "sylhet", name: "Sylhet", prefix: "SYL-01" }, { id: "khulna", name: "Khulna", prefix: "KHL-03" }],
  firstSequence: 117,
  saleAmount: 25000,
  currency: "BDT",
  packetDelay: 650,
  diagramTitle: "Three local counters, one shared cloud database and an owner dashboard",
  diagramDescription: "Sales are saved at each terminal. Connected terminals send their queued orders to the cloud. The dashboard counts only unique orders accepted by the cloud.",
  diagramHint: "The diagram scrolls horizontally on smaller screens. The controls and totals are below it.",
  cloud: "Cloud database",
  owner: "Owner dashboard",
  online: "Online",
  offline: "Offline",
  pending: "Local queue",
  noPending: "No pending orders",
  queued: "Queued",
  sending: "Sending",
  createSale: "Create sale",
  disconnect: "Go offline",
  reconnect: "Reconnect",
  localSales: "Saved on this device",
  dashboardTitle: "What the owner can see",
  acceptedSales: "Accepted sales",
  salesCount: (count: number) => `${count} ${count === 1 ? "sale" : "sales"}`,
  duplicateCount: (count: number) => `${count} duplicate ${count === 1 ? "delivery" : "deliveries"} ignored`,
  doubleSend: "Simulate double-send",
  doubleSendNote: "Replays the latest accepted order with the same ID. It must not add another sale.",
  logTitle: "Follow the events",
  reset: "Reset the demo",
  money: (amount: number) => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(amount / 100),
  eventText: (event: { kind: string; saleId?: string }, branch: string) => {
    const messages: Record<string, string> = {
      started: "Three counters are connected. Create a sale or take a branch offline to begin.",
      created: `${branch} saved ${event.saleId} on the device.`,
      queued: `${event.saleId} is waiting locally; the shop can keep selling.`,
      sending: `${branch} is sending ${event.saleId} to the cloud.`,
      accepted: `The cloud accepted ${event.saleId} once. Dashboard totals updated.`,
      acknowledged: `${branch} received confirmation for ${event.saleId} and cleared it from the queue.`,
      offline: `${branch} is offline. New sales will stay in its local queue.`,
      reconnected: `${branch} reconnected. Pending orders will sync in their original order.`,
      interrupted: `${event.saleId} lost its acknowledgement; the same order ID is queued for retry.`,
      duplicate: `Duplicate ${event.saleId} ignored. The original sale is already counted.`,
      conflict: `${event.saleId} had a different payload under an existing ID. It was rejected for review.`,
    };
    return messages[event.kind] ?? messages.started;
  },
};
