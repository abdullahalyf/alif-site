import { demoImage } from "./demo-images";
import type { Project } from "./schema";

// Single source of truth for all project copy. Edit text here, never in components.
export const projects = [
  {
    slug: "multi-branch-pos",
    title: "Multi-Branch POS & Operations Platform",
    client: "Boba tea chain, Bangladesh", // brand name hidden until the client approves
    year: 2026,
    role: "System architect · Directed Codex and Claude · Reviewed and tested",
    category: "Client work",
    summary:
      "An offline-first point-of-sale and back-office system for a growing chain of tea shops. I designed the system and directed AI agents to build it, then reviewed and tested the implementation.",
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
    // DEMO: illustrative sequencing and durations.
    timeline: [
      { phase: "Counter workflow and data model", weeks: "DEMO · Weeks 1–2" },
      { phase: "Offline billing and reconciliation", weeks: "DEMO · Weeks 3–5" },
      { phase: "Branch permissions and staged rollout", weeks: "DEMO · Weeks 6–8" },
    ],
    decisions: [
      { decision: "Keep a local SQLite copy at each counter", alternatives: "A cloud-only checkout or a local store with automatic sync", why: "Counter sales must continue during outages. Local persistence makes the sale durable immediately, at the cost of designing a sync path." },
      { decision: "Give each sale a stable, branch- and device-prefixed ID", alternatives: "Rely on each server request as a new write or deduplicate by operation ID", why: "The same sale can be sent again after a lost response. Retrying the same ID avoids adding a duplicate to the ledger." },
      { decision: "Enforce branch rights with PostgreSQL row-level security", alternatives: "Application checks on every request or rules applied at the database", why: "The database protects records across the POS and back office. Each of the six roles still needs explicit policy tests." },
      { decision: "Stage updates and provide rollback", alternatives: "Update every branch at once or roll out in stages", why: "A rollout mistake should affect as few counters as possible. Staging reduces the blast radius and adds release coordination." },
    ],
    challenges: [
      { problem: "Unstable internet at the counter", resolution: "Store sales locally and reconcile automatically when the connection returns." },
      { problem: "Stock movements depend on recipes", resolution: "Capture the sale once, then deduct its ingredients using the defined recipe." },
      { problem: "Owners need visibility across the chain", resolution: "Use branch health checks, audits and nightly reports to surface what needs attention." },
    ],
    metrics: [
      { label: "Branch capacity", value: "10+ designed for" },
      { label: "Offline operation", value: "Up to a full day" },
      { label: "Infrastructure", value: "Under ~$30 per month" },
    ],
    images: [demoImage("pos-overview", "DEMO photograph for the POS case study"), demoImage("pos-detail", "DEMO detail photograph for the POS case study")], // DEMO images only; project copy is unchanged.
  },
  {
    slug: "traffic-accident-risk",
    title: "Traffic Accident Risk Prediction",
    client: "Research — Daffodil International University",
    year: 2026,
    role: "Research team member · Research and evaluation", // DEMO: confirm exact role
    category: "Research",
    summary:
      "Research on predicting traffic accident risk to support intelligent transportation systems.",
    problem:
      "Road accidents are a major cost in lives and money. Predicting where and when risk is high lets planners and traffic systems act before accidents happen.",
    solution: [
      "Compared and evaluated models intended to estimate accident risk from traffic and road data.", // DEMO: confirm method/data
    ],
    stack: ["Python", "Machine Learning"], // DEMO: confirm
    results: ["Paper submitted for publication"],
    link: null,
    // DEMO: candidate decisions and evaluation approach will be confirmed by the team.
    // DEMO: illustrative sequencing and durations.
    timeline: [
      { phase: "Frame the research question", weeks: "DEMO · Weeks 1–2" },
      { phase: "Compare candidate models", weeks: "DEMO · Weeks 3–5" },
      { phase: "Review the paper", weeks: "DEMO · Weeks 6–7" },
    ],
    decisions: [
      { decision: "Frame the target as accident risk", alternatives: "Count total incidents or estimate where and when risk is higher", why: "The risk framing makes the output more relevant to transportation planning." },
      { decision: "Compare candidate models", alternatives: "Start with a simple baseline or adopt one complex model immediately", why: "A baseline helps the team evaluate whether added complexity contributes to useful predictions." },
      { decision: "Keep research and deployment separate", alternatives: "Submit research for review or present it as an operational traffic service", why: "A paper can document evaluation without making claims about live performance." },
    ],
    challenges: [
      { problem: "A useful target must reflect road conditions", resolution: "The evaluation plan compares risk estimates against traffic and road data." },
      { problem: "Model findings need a clear account of limitations", resolution: "Separate the research outcome from any future deployment claims." },
    ],
    metrics: [
      { label: "Research status", value: "Paper submitted" },
    ],
    images: [demoImage("research-overview", "DEMO photograph for the research case study"), demoImage("research-detail", "DEMO detail photograph for the research case study")], // DEMO images only; project copy is unchanged.
  },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "stockroom-operations",
      "title": "Stockroom Operations Hub",
      "client": "DEMO — Distribution business",
      "year": 2026,
      "role": "DEMO — Architect · Directed AI agents · Reviewed and tested",
      "category": "Client work",
      "demo": true,
      "summary": "A purchasing and stock-transfer workspace designed for a distributor with six branches and a small central warehouse.",
      "problem": "In this demo scenario, six branches reconcile stock in separate spreadsheets. A transfer can be deducted at dispatch and again at receipt, while concurrent purchase edits erase the audit trail. The warehouse has intermittent connectivity, and the owner needs a daily replenishment decision without operating a large server estate.",
      "solution": [
    "Modelled purchase orders, dispatches and receipts as explicit state transitions; stock changes are append-only ledger entries rather than overwritten balances.",
    "Used PostgreSQL transactions and unique operation keys to make receipt retries safe, with branch-scoped permissions checked on the server.",
    "Designed a TypeScript reconciliation worker that compares branch movement totals against the ledger and puts discrepancies into a review queue.",
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
      // DEMO: illustrative sequencing and durations.
      timeline: [
        { phase: "Map transfers and stock", weeks: "DEMO · Weeks 1–2" },
        { phase: "Build the ledger and approvals", weeks: "DEMO · Weeks 3–5" },
        { phase: "Replay and reconcile", weeks: "DEMO · Week 6" },
      ],
      decisions: [
        { decision: "Use an append-only stock ledger", alternatives: "Overwrite a balance or retain each movement", why: "Explicit movement records support reconciliation and explain changes after concurrent edits." },
        { decision: "Deduplicate receipts in the database", alternatives: "Check once in the UI or enforce unique operation keys in a transaction", why: "Receipts can arrive more than once. Database enforcement protects the ledger regardless of retry source." },
        { decision: "Put exceptions on the home screen", alternatives: "Show every change equally or surface low stock and overdue transfers", why: "Operators need a short list of decisions, while the ledger remains available for investigation." },
      ],
      challenges: [
        { problem: "Dispatch and receipt can both deduct a transfer", resolution: "Use separate state transitions and test receipt retries against the ledger." },
        { problem: "Warehouse connectivity is intermittent", resolution: "Allow a receipt to be submitted again under the same operation key." },
      ],
      metrics: [
        { label: "DEMO replay", value: "10,000 events" },
        { label: "DEMO duplicate entries", value: "0" },
        { label: "DEMO replenishment prep", value: "45 → 12 minutes" },
      ],
      images: [demoImage("stockroom-operations-overview", "DEMO photograph for Stockroom Operations Hub"), demoImage("stockroom-operations-detail", "DEMO detail photograph for Stockroom Operations Hub"), demoImage("stockroom-operations-context", "DEMO context photograph for Stockroom Operations Hub")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "clinic-booking",
      "title": "Clinic Booking & Care Portal",
      "client": "DEMO — Community clinic",
      "year": 2026,
      "role": "DEMO — Architect · Directed AI agents · Reviewed and tested",
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
      // DEMO: illustrative sequencing and durations.
      timeline: [
        { phase: "Observe reception and define roles", weeks: "DEMO · Week 1" },
        { phase: "Build bookings and follow-up", weeks: "DEMO · Weeks 2–4" },
        { phase: "Test concurrency and keyboard use", weeks: "DEMO · Week 5" },
      ],
      decisions: [
        { decision: "Protect slots with a database constraint", alternatives: "Check availability in each browser or prevent overlap at write time", why: "Two receptionists may see the same slot. The constraint makes the decision atomic." },
        { decision: "Separate scheduling from clinical notes", alternatives: "A single shared patient record or permission-scoped records", why: "Reception staff can book visits without loading administrative notes they do not need." },
        { decision: "Reuse the booking operation ID on retries", alternatives: "Create a fresh attempt each time or return the existing appointment", why: "An interrupted response does not mean the original booking failed." },
      ],
      challenges: [
        { problem: "Concurrent requests target one slot", resolution: "Keep one reservation and make the collision explicit to the second receptionist." },
        { problem: "Cancelled visits and follow-up tasks can go missing", resolution: "Use explicit state transitions, cancellation reasons and assigned task owners." },
      ],
      metrics: [
        { label: "DEMO slot contention", value: "1 booking from 100 requests" },
        { label: "DEMO coverage", value: "36 acceptance scenarios" },
      ],
      images: [demoImage("clinic-booking-overview", "DEMO photograph for Clinic Booking & Care Portal"), demoImage("clinic-booking-detail", "DEMO detail photograph for Clinic Booking & Care Portal"), demoImage("clinic-booking-context", "DEMO context photograph for Clinic Booking & Care Portal")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "field-service",
      "title": "Field Service Dispatch",
      "client": "DEMO — Maintenance team",
      "year": 2026,
      "role": "DEMO — Architect · Directed AI agents · Reviewed and tested",
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
      // DEMO: illustrative sequencing and durations.
      timeline: [
        { phase: "Map dispatch and visit states", weeks: "DEMO · Week 1" },
        { phase: "Implement local notes and events", weeks: "DEMO · Weeks 2–4" },
        { phase: "Verify offline recovery", weeks: "DEMO · Weeks 5–6" },
      ],
      decisions: [
        { decision: "Use a durable local operation queue", alternatives: "Store notes in memory or persist submissions in SQLite", why: "A process restart should leave pending work intact, even during an outage." },
        { decision: "Separate assignment and completion", alternatives: "Represent both in a shared status field or model them as distinct changes", why: "Late photos should not reopen jobs or change who is responsible for them." },
        { decision: "Surface sync exceptions to dispatch", alternatives: "Use one global progress state or show pending and rejected records individually", why: "Dispatchers can tell delayed connectivity apart from records needing action." },
      ],
      challenges: [
        { problem: "A photo upload can arrive after completion", resolution: "Associate it with the visit and keep attachment status separate." },
        { problem: "Repeated offline submissions can create duplicates", resolution: "Replay stable operation IDs against a server event log." },
      ],
      metrics: [
        { label: "DEMO replay", value: "500 offline submissions" },
        { label: "DEMO recovery", value: "6-hour outage" },
      ],
      images: [demoImage("field-service-overview", "DEMO photograph for Field Service Dispatch"), demoImage("field-service-detail", "DEMO detail photograph for Field Service Dispatch"), demoImage("field-service-context", "DEMO context photograph for Field Service Dispatch")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "learning-dashboard",
      "title": "Learning Progress Dashboard",
      "client": "DEMO — Independent concept",
      "year": 2026,
      "role": "DEMO — Architect · Directed AI agents · Reviewed and tested",
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
      // DEMO: illustrative sequencing and durations.
      timeline: [
        { phase: "Model learning records", weeks: "DEMO · Week 1" },
        { phase: "Build summaries and export", weeks: "DEMO · Weeks 2–3" },
        { phase: "Verify round trips and keyboard use", weeks: "DEMO · Week 4" },
      ],
      decisions: [
        { decision: "Separate evidence from course activity", alternatives: "Count time as mastery or store evidence against an objective", why: "Time spent is useful history and offers only one part of the progress picture." },
        { decision: "Derive reports from durable sessions", alternatives: "Edit weekly summaries separately or rebuild them from source records", why: "Changing a session updates the report without creating inconsistent totals." },
        { decision: "Support versioned JSON and CSV", alternatives: "Lock data to the dashboard or provide portable records", why: "Readers retain access to their notes and can re-import them if the app changes." },
      ],
      challenges: [
        { problem: "Sessions span weekly boundaries", resolution: "Use deterministic date handling and test boundary cases." },
        { problem: "Graphics can hide progress from keyboard users", resolution: "Provide accessible table and text views alongside the charts." },
      ],
      metrics: [
        { label: "DEMO export verification", value: "2,000 records" },
        { label: "DEMO summary target", value: "Under 100 ms" },
      ],
      images: [demoImage("learning-dashboard-overview", "DEMO photograph for Learning Progress Dashboard"), demoImage("learning-dashboard-detail", "DEMO detail photograph for Learning Progress Dashboard"), demoImage("learning-dashboard-context", "DEMO context photograph for Learning Progress Dashboard")],
    },
  // DEMO: every text field and image in this illustrative project is replaceable sample content.
  {
      "slug": "sync-inspector",
      "title": "Sync Inspector",
      "client": "DEMO — Open-source concept",
      "year": 2026,
      "role": "DEMO — Architect · Directed AI agents · Reviewed and tested",
      "category": "Open source",
      "demo": true,
      "summary": "An open-source tool concept for tracing local-first operation queues and reproducing difficult synchronisation failures.",
      "problem": "The demo tool addresses a common debugging gap: an application reports that sync failed but cannot explain which operation was retried, whether the server committed it, or how a conflict was resolved. Debugging should work from a redacted capture without needing a production database or a specific frontend framework.",
      "solution": [
    "Defined a versioned event format containing operation identity, state transitions, acknowledgements and correlation IDs, while excluding payload values by default.",
    "Designed a TypeScript state reducer shared by the CLI and timeline view so both explain an operation using the same rules.",
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
      // DEMO: illustrative sequencing and durations.
      timeline: [
        { phase: "Define the capture format", weeks: "DEMO · Week 1" },
        { phase: "Build the reader and replay model", weeks: "DEMO · Weeks 2–3" },
        { phase: "Review redaction and fixtures", weeks: "DEMO · Week 4" },
      ],
      decisions: [
        { decision: "Redact source payloads by default", alternatives: "Collect full payloads or keep identifiers and transitions only", why: "Timing, ordering and acknowledgement can be inspected without copying user records." },
        { decision: "Share a reducer across the CLI and timeline", alternatives: "Interpret the events separately in each view or use common transition rules", why: "The same capture should tell the same story whichever view is open." },
        { decision: "Let adapters translate source events", alternatives: "Bind the inspector to one production database or use neutral fixtures", why: "Small local captures are easier to share, replay and test." },
      ],
      challenges: [
        { problem: "Retries and acknowledgements arrive out of order", resolution: "Use correlated operation IDs and fixture replay to explain the terminal state." },
        { problem: "A capture can expose business data", resolution: "Exclude payload values and test the exported format for redaction." },
      ],
      metrics: [
        { label: "DEMO coverage", value: "48 trace fixtures" },
        { label: "DEMO capture", value: "10,000 events under 1 s" },
      ],
      images: [demoImage("sync-inspector-overview", "DEMO photograph for Sync Inspector"), demoImage("sync-inspector-detail", "DEMO detail photograph for Sync Inspector"), demoImage("sync-inspector-context", "DEMO context photograph for Sync Inspector")],
    },
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
