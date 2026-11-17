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
