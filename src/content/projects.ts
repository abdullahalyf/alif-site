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
      "summary": "A purchasing and stock-transfer workspace designed for a distributor with six branches and a small central warehouse.",
      "problem": "In this demo scenario, six branches reconcile stock in separate spreadsheets. A transfer can be deducted at dispatch and again at receipt, while concurrent purchase edits erase the audit trail. The warehouse has intermittent connectivity, and the owner needs a daily replenishment decision without operating a large server estate.",
      "solution": [
    "Modelled purchase orders, dispatches and receipts as explicit state transitions; stock changes are append-only ledger entries rather than overwritten balances.",
    "Used PostgreSQL transactions and unique operation keys to make receipt retries safe, with branch-scoped permissions checked on the server.",
    "Built a TypeScript reconciliation worker that compares branch movement totals against the ledger and puts discrepancies into a review queue.",
    "Kept the interface focused on exceptions: low-stock suggestions, overdue transfers and adjustments requiring a second approval."
],
      "stack": [
          "TypeScript",
          "React",
          "PostgreSQL"
      ],
      "results": [
    "DEMO benchmark: replaying 10,000 stock events produced zero duplicate ledger entries.",
    "DEMO acceptance test: all 24 branch-to-warehouse reconciliation scenarios matched expected balances.",
    "DEMO workflow estimate: preparing the daily replenishment list fell from 45 minutes to 12 minutes."
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
      "summary": "A scheduling and follow-up portal designed for a four-practitioner clinic with one shared reception desk.",
      "problem": "The demo clinic takes bookings by telephone and in person. Two receptionists can offer the same slot, cancellations do not reliably release capacity, and follow-up tasks sit in personal notebooks. The design must handle a busy morning on ordinary phones while keeping administrative notes separate from appointment data.",
      "solution": [
    "Defined appointment states and an immutable history before building screens; a database exclusion constraint prevents overlapping active bookings for a practitioner.",
    "Separated scheduling, contact details and follow-up tasks into permission-scoped records; the browser never receives unrestricted patient exports.",
    "Made booking requests idempotent so reconnecting after a slow response returns the original appointment instead of creating another.",
    "Delivered a keyboard-friendly daily schedule, explicit cancellation reasons and a task queue with an assigned owner and due date."
],
      "stack": [
          "Next.js",
          "TypeScript",
          "PostgreSQL"
      ],
      "results": [
    "DEMO concurrency test: 100 simultaneous requests for one slot resulted in one confirmed booking.",
    "DEMO usability exercise: a repeat appointment required four interactions instead of nine in the paper-process prototype.",
    "DEMO acceptance suite: 36 booking, cancellation and follow-up scenarios passed."
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
      "summary": "A dispatch dashboard and offline visit record designed for a maintenance team serving 120 sites.",
      "problem": "In this demo, dispatchers coordinate eight technicians through chat messages. Job status becomes stale during travel, duplicate submissions create confusing visit records, and a photograph can upload after a job has already been marked complete. Technicians need to finish notes without reception while dispatchers need an honest picture of sync status.",
      "solution": [
    "Stored visit notes and pending attachments in a local SQLite queue with stable operation identifiers and explicit pending, acknowledged and rejected states.",
    "Separated job assignment from visit completion so a late upload cannot silently reassign or reopen a finished job.",
    "Used a server-side event log and role checks to resolve assignment changes, retaining both the original visit time and the time it reached the server.",
    "Built a dispatcher exception view for overdue jobs, unsynced visits and missing attachments instead of treating every delay as a failure."
],
      "stack": [
          "React",
          "TypeScript",
          "SQLite"
      ],
      "results": [
    "DEMO reliability run: 500 offline visit submissions were replayed three times without duplicate visit records.",
    "DEMO recovery test: all queued notes survived a process restart during a simulated six-hour outage.",
    "DEMO workflow target: dispatchers can identify unacknowledged visits from one exception list rather than eight chat threads."
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
      "summary": "A personal learning dashboard that turns course notes and study sessions into an exportable weekly record.",
      "problem": "The demo learner has five active courses, notes in three tools and a habit of confusing time spent with progress made. The constraint is deliberately small: a responsive web app, no social features, and ownership of the underlying records even if the application is abandoned.",
      "solution": [
    "Modelled courses, learning objectives, study sessions and evidence separately so a completed session does not automatically imply a mastered objective.",
    "Kept durable records in PostgreSQL and derived weekly summaries from sessions; summaries can be rebuilt rather than edited as a second source of truth.",
    "Built accessible table and text views alongside progress graphics, with plain-language empty states and an explicit unfinished-task queue.",
    "Added versioned JSON and CSV export, deterministic date handling and tests for sessions spanning month boundaries."
],
      "stack": [
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
      ],
      "results": [
    "DEMO round-trip test: 2,000 session records exported and re-imported without losing identifiers or timestamps.",
    "DEMO accessibility check: the weekly workflow is usable with a keyboard and without relying on chart colours.",
    "DEMO performance target: a five-course weekly summary stays under 100 ms in a local seeded-data benchmark."
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
      "summary": "An open-source tool concept for tracing local-first operation queues and reproducing difficult synchronisation failures.",
      "problem": "The demo tool addresses a common debugging gap: an application reports that sync failed but cannot explain which operation was retried, whether the server committed it, or how a conflict was resolved. Debugging should work from a redacted capture without needing a production database or a specific frontend framework.",
      "solution": [
    "Defined a versioned event format containing operation identity, state transitions, acknowledgements and correlation IDs, while excluding payload values by default.",
    "Built a TypeScript state reducer shared by the CLI and timeline view so both explain an operation using the same rules.",
    "Used small SQLite captures for reproducible fixtures, with adapters responsible for translating application-specific events into the neutral format.",
    "Added deterministic replay, schema validation and regression fixtures for late acknowledgements, interrupted retries and out-of-order delivery."
],
      "stack": [
          "TypeScript",
          "Node.js",
          "SQLite"
      ],
      "results": [
    "DEMO fixture suite: 48 retry, conflict and recovery traces reduce to their expected terminal states.",
    "DEMO redaction test: exported captures exclude configured sensitive fields while retaining correlation IDs.",
    "DEMO benchmark: a 10,000-event capture can be summarised in under one second on the reference development machine."
],
      "link": null,
      images: [demoImage("sync-inspector-overview", "DEMO photograph for Sync Inspector"), demoImage("sync-inspector-detail", "DEMO detail photograph for Sync Inspector"), demoImage("sync-inspector-context", "DEMO context photograph for Sync Inspector")],
    },
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
