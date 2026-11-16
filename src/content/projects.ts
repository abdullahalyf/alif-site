import { demoImage } from "./demo-images";
import type { Project } from "./schema";

// Single source of truth for all project copy. Edit text here, never in components.
export const projects = [
  {
    slug: "multi-branch-pos",
    title: "Multi-Branch POS & Operations Platform",
    client: "Boba tea chain, Bangladesh", // brand name hidden until the client approves
    year: 2026,
    role: "System architect & sole developer",
    category: "Client work",
    summary:
      "An offline-first point-of-sale and back-office system for a growing chain of tea shops.",
    problem:
      "The chain was running its counters by hand and growing from 5 to 10 branches fast. The owners needed fast, reliable billing at every counter, stock that tracks itself, and a clear view of every branch — without paying for heavy servers.",
    solution: [
      "Desktop POS (Electron) that keeps selling with no internet, using a local SQLite database, then syncs automatically when the connection returns.",
      "Idempotent sync with branch- and device-prefixed order IDs, so no sale is ever lost or counted twice.",
      "Role-based access for six roles, enforced at the database level with Postgres row-level security.",
      "Recipe-based inventory: every cup sold deducts its raw ingredients automatically.",
      "Owner dashboard with branch health monitoring, audit logs and nightly email reports.",
      "Staged rollouts and one-click rollback, so updates reach branches without site visits.",
    ],
    stack: [
      "Electron",
      "React",
      "TypeScript",
      "SQLite",
      "Supabase",
      "PostgreSQL",
      "Cloudflare",
      "GitHub Actions",
    ],
    results: [
      "Designed for 10+ branches on a single codebase",
      "Runs up to a full day offline without losing a sale",
      "Infrastructure kept under ~$30 per month",
    ],
    link: null,
    images: [demoImage("pos-overview", "DEMO photograph for the POS case study"), demoImage("pos-detail", "DEMO detail photograph for the POS case study")], // DEMO images only; project copy is unchanged.
  },
  {
    slug: "traffic-accident-risk",
    title: "Traffic Accident Risk Prediction",
    client: "Research — Daffodil International University",
    year: 2026,
    role: "Researcher (team project)", // TODO(Alif): confirm exact role
    category: "Research",
    summary:
      "Research on predicting traffic accident risk to support intelligent transportation systems.",
    problem:
      "Road accidents are a major cost in lives and money. Predicting where and when risk is high lets planners and traffic systems act before accidents happen.",
    solution: [
      "Built and evaluated models that estimate accident risk from traffic and road data.", // TODO(Alif): confirm method/data
    ],
    stack: ["Python", "Machine Learning"], // TODO(Alif): confirm
    results: ["Paper submitted for publication"],
    link: null,
    images: [demoImage("research-overview", "DEMO photograph for the research case study"), demoImage("research-detail", "DEMO detail photograph for the research case study")], // DEMO images only; project copy is unchanged.
  },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "stockroom-operations",
      "title": "Stockroom Operations Hub",
      "client": "DEMO — Distribution business",
      "year": 2026,
      "role": "DEMO — System design & development",
      "category": "Client work",
      "demo": true,
      "summary": "A shared workspace for purchasing, stock transfers and branch replenishment.",
      "problem": "Buyers and branch teams were making decisions from different spreadsheets.",
      "solution": [
          "Mapped purchasing and branch transfer workflows before designing the interface.",
          "Built a role-based stock ledger with clear transfer and receiving states.",
          "Added a daily replenishment view and an audit trail for every adjustment."
      ],
      "stack": [
          "TypeScript",
          "React",
          "PostgreSQL"
      ],
      "results": [
          "Demo outcome: one shared view of stock across departments.",
          "Demo outcome: fewer manual hand-offs between buying and receiving."
      ],
      "link": null,
      images: [demoImage("stockroom-operations-overview", "DEMO photograph for Stockroom Operations Hub"), demoImage("stockroom-operations-detail", "DEMO detail photograph for Stockroom Operations Hub"), demoImage("stockroom-operations-context", "DEMO context photograph for Stockroom Operations Hub")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "clinic-booking",
      "title": "Clinic Booking & Care Portal",
      "client": "DEMO — Community clinic",
      "year": 2026,
      "role": "DEMO — System design & development",
      "category": "Client work",
      "demo": true,
      "summary": "A web app for appointments, front-desk scheduling and patient follow-ups.",
      "problem": "Reception staff needed a reliable schedule without juggling paper diaries.",
      "solution": [
          "Designed appointment states with reception and care staff.",
          "Built a responsive booking flow and a clear daily schedule.",
          "Added permissions, reminders and a simple record of follow-up tasks."
      ],
      "stack": [
          "Next.js",
          "TypeScript",
          "PostgreSQL"
      ],
      "results": [
          "Demo outcome: a single appointment schedule for the whole team.",
          "Demo outcome: clearer follow-up ownership after each visit."
      ],
      "link": null,
      images: [demoImage("clinic-booking-overview", "DEMO photograph for Clinic Booking & Care Portal"), demoImage("clinic-booking-detail", "DEMO detail photograph for Clinic Booking & Care Portal"), demoImage("clinic-booking-context", "DEMO context photograph for Clinic Booking & Care Portal")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "field-service",
      "title": "Field Service Dispatch",
      "client": "DEMO — Maintenance team",
      "year": 2026,
      "role": "DEMO — System design & development",
      "category": "Client work",
      "demo": true,
      "summary": "A lightweight dashboard connecting office dispatchers and field technicians.",
      "problem": "Job updates arrived through scattered messages, leaving dispatchers without a clear picture.",
      "solution": [
          "Mapped the journey from incoming request to completed visit.",
          "Built job queues, technician assignments and mobile-friendly visit notes.",
          "Added an activity log and a weekly service overview."
      ],
      "stack": [
          "React",
          "TypeScript",
          "SQLite"
      ],
      "results": [
          "Demo outcome: a shared job history instead of scattered messages.",
          "Demo outcome: a clearer daily workload for each technician."
      ],
      "link": null,
      images: [demoImage("field-service-overview", "DEMO photograph for Field Service Dispatch"), demoImage("field-service-detail", "DEMO detail photograph for Field Service Dispatch"), demoImage("field-service-context", "DEMO context photograph for Field Service Dispatch")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "learning-dashboard",
      "title": "Learning Progress Dashboard",
      "client": "DEMO — Independent concept",
      "year": 2026,
      "role": "DEMO — System design & development",
      "category": "Personal",
      "demo": true,
      "summary": "An approachable dashboard for courses, study sessions and weekly goals.",
      "problem": "Learning notes and progress were spread across separate tools.",
      "solution": [
          "Designed a calm overview of current courses and study goals.",
          "Built accessible progress views and a weekly reflection flow.",
          "Kept the data model small and exportable."
      ],
      "stack": [
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
      ],
      "results": [
          "Demo outcome: one place to plan a week of study.",
          "Demo outcome: exportable notes and progress records."
      ],
      "link": null,
      images: [demoImage("learning-dashboard-overview", "DEMO photograph for Learning Progress Dashboard"), demoImage("learning-dashboard-detail", "DEMO detail photograph for Learning Progress Dashboard"), demoImage("learning-dashboard-context", "DEMO context photograph for Learning Progress Dashboard")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "sync-inspector",
      "title": "Sync Inspector",
      "client": "DEMO — Open-source concept",
      "year": 2026,
      "role": "DEMO — System design & development",
      "category": "Open source",
      "demo": true,
      "summary": "A developer tool for inspecting offline queues and explaining sync failures.",
      "problem": "Local-first apps can leave developers guessing which queued operation failed and why.",
      "solution": [
          "Designed a small event format for sync queues.",
          "Built an inspectable timeline with retry and conflict explanations.",
          "Added sample adapters, a CLI report and documentation for contributors."
      ],
      "stack": [
          "TypeScript",
          "Node.js",
          "SQLite"
      ],
      "results": [
          "Demo outcome: an understandable history for every queued operation.",
          "Demo outcome: a small adapter interface for future integrations."
      ],
      "link": null,
      images: [demoImage("sync-inspector-overview", "DEMO photograph for Sync Inspector"), demoImage("sync-inspector-detail", "DEMO detail photograph for Sync Inspector"), demoImage("sync-inspector-context", "DEMO context photograph for Sync Inspector")],
    },
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
