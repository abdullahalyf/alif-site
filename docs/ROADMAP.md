# Roadmap

One task = one Codex run = one PR. Do them in order. Phase B waits until `docs/DESIGN.md` is filled in.

## Phase 0 — Foundation (done)
- [x] Task 0: Next.js 16 scaffold, Tailwind 4, Zod content + schema, Vitest, Playwright, CI, AGENTS.md.

## Phase A — Structure (design-independent)

- [ ] **Task 1: Routes + layout skeleton**
  - Pages: `/` (home), `/about`, `/work` (all projects), `/work/[slug]` (case study, `generateStaticParams` from `projects`, `notFound()` for unknown slugs), custom `not-found`.
  - Shared `Header` (logo text, nav: Work, About, Contact) and `Footer` (email, WhatsApp, socials, © year). "Contact" links to a `#contact` section in the footer.
  - Home: hero (name as `h1`, role, intro), services list, featured projects (cards linking to case studies), short about teaser linking to `/about`.
  - About: about paragraphs, services. Work: list of all projects. Case study: title, client, year, role, summary, problem, solution, stack, results.
  - Neutral styling only. Don't render photos yet (files may not exist).
  - Tests: unit test for `ProjectCard`; e2e: every nav link works, every case study page returns 200, unknown slug shows 404.

- [ ] **Task 2: SEO + metadata**
  - Per-page `metadata` / `generateMetadata` (case studies use project title + summary).
  - `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (text-only, uses `site` content), JSON-LD `Person` on home.
  - Base URL from `NEXT_PUBLIC_SITE_URL`, fallback to `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`.
  - Tests: unit test for the base-URL helper; e2e: `/sitemap.xml` lists all routes.

- [ ] **Task 3: Motion foundation (no visible animation yet)**
  - `src/lib/use-reduced-motion.ts` hook.
  - `SmoothScroll` client provider using Lenis; disabled when reduced motion is on.
  - `src/lib/gsap.ts`: registers GSAP + ScrollTrigger once, syncs ScrollTrigger with Lenis.
  - Tests: unit tests for the hook (both states) and that `SmoothScroll` does not start Lenis under reduced motion.

## Phase B — Design (after Alif fills `docs/DESIGN.md`)

- [ ] Task 4: Design tokens + local fonts (colours, type scale, spacing) from DESIGN.md.
- [ ] Task 5: Home page visual design.
- [ ] Task 6: About page visual design (with photos).
- [ ] Task 7: Work list + case study visual design.
- [ ] Task 8: Animations from DESIGN.md (each one with a reduced-motion fallback).

## Phase C — Polish + launch

- [ ] Task 9: Performance + accessibility pass (Lighthouse mobile ≥ 90 / ≥ 95), fix findings.
- [ ] Task 10: Final content check, Vercel production deploy.
