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
    images: [], // TODO(Alif): POS + dashboard screenshots (demo data only)
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
    images: [],
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    client: "Personal",
    year: 2026,
    role: "Design & development",
    category: "Personal",
    summary:
      "A fast, animated portfolio that feels premium without 3D or heavy assets.",
    problem:
      "Show clients who I am and how I think — on any device, on any connection.",
    solution: [
      "Next.js App Router with all content in two typed files, validated by Zod.",
      "Smooth scroll and GSAP animations that switch off for reduced-motion users.",
      "Tested with Vitest and Playwright; tuned for Lighthouse mobile scores.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Vercel"],
    results: ["Lighthouse mobile target: Performance 90+, Accessibility 95+"],
    link: null,
    images: [],
  },
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
