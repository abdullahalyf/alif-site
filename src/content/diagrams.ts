import { projects } from "./projects";
import { diagramSchema, type Diagram } from "./schemas/diagrams";
export const diagramContent = {
  title: "System architecture",
  back: "Back to case study",
  connections: "Connections",
  nodes: "Components",
  path: (slug: string) => `/work/${slug}/architecture`,
};
const pos = diagramSchema.parse({
  title: "Multi-branch POS architecture",
  description:
    "Conceptual flow based on the project description. Terminals persist sales locally, synchronise safely, and expose branch operations to the owner. Infrastructure links show supporting delivery services, not a production deployment specification.",
  nodes: [
    { id: "pos", label: "POS terminals", kind: "client" },
    { id: "local", label: "Local SQLite", kind: "db" },
    { id: "sync", label: "Sync service", kind: "service" },
    { id: "pg", label: "Supabase Postgres (RLS)", kind: "db" },
    { id: "owner", label: "Owner dashboard", kind: "client" },
    { id: "edge", label: "Cloudflare", kind: "external" },
    { id: "ci", label: "GitHub Actions", kind: "external" },
  ],
  edges: [
    { from: "pos", to: "local", label: "Persist sales" },
    { from: "local", to: "sync", label: "Retry-safe queue" },
    { from: "sync", to: "pg", label: "Role-scoped writes" },
    { from: "pg", to: "owner", label: "Branch reporting" },
    { from: "edge", to: "sync", label: "Delivery boundary" },
    { from: "ci", to: "pos", label: "Staged releases" },
  ],
});
const research = diagramSchema.parse({
  title: "Traffic accident risk pipeline",
  description:
    "Conceptual research pipeline, not a claim about the final dataset, model or published results. Each stage produces inputs for the next evaluation step.",
  nodes: [
    { id: "data", label: "Data sources", kind: "external" },
    { id: "prep", label: "Preprocessing", kind: "service" },
    { id: "train", label: "Model training", kind: "service" },
    { id: "eval", label: "Evaluation", kind: "service" },
    { id: "map", label: "Risk map", kind: "client" },
  ],
  edges: [
    { from: "data", to: "prep", label: "Raw observations" },
    { from: "prep", to: "train", label: "Prepared features" },
    { from: "train", to: "eval", label: "Model predictions" },
    { from: "eval", to: "map", label: "Evaluated risk" },
  ],
});
// DEMO: generic conceptual diagrams for illustrative projects; replace with verified architecture.
export const diagrams: Record<string, Diagram> = Object.fromEntries(
  projects.map((project) => [
    project.slug,
    project.slug === "multi-branch-pos"
      ? pos
      : project.slug === "traffic-accident-risk"
        ? research
        : diagramSchema.parse({
            title: `DEMO — ${project.title} architecture`,
            description:
              "DEMO — illustrative client, service and storage boundaries, not an implemented deployment.",
            nodes: [
              { id: "client", label: "User interface", kind: "client" },
              { id: "service", label: "Application service", kind: "service" },
              { id: "db", label: "Durable storage", kind: "db" },
            ],
            edges: [
              { from: "client", to: "service", label: "Validated request" },
              { from: "service", to: "db", label: "Transactional write" },
            ],
          }),
  ]),
);
