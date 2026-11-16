# Roadmap

One task = one Codex run = one PR. Do them in order. Read `docs/DESIGN.md` for every task.

## Phase 0 — Foundation (done)
- [x] Task 0: Next.js 16 scaffold, Tailwind 4, Zod content + schema, Vitest, Playwright, CI, AGENTS.md, fonts, photos, design spec.

## Phase A — Structure

- [ ] **Task 1: Design tokens, fonts, layout shell**
  - Colours, type scale and fonts from DESIGN.md (`src/fonts/` via `next/font/local`, CSS variables + Tailwind `@theme`).
  - `Header` (desktop nav + mobile menu overlay, keyboard accessible), `Footer` (night section with contact), `Button`, `SectionLabel` components.
  - Routes with placeholder content from `site`/`projects`: `/`, `/about`, `/approach`, `/work`, `/work/[slug]` (`generateStaticParams`, `notFound()`), custom `not-found`.
  - Tests: unit tests for `Header` (links, menu toggle) and `Button`; e2e: every nav link works on desktop + mobile, unknown slug → 404.

- [ ] **Task 2: SEO + metadata**
  - Per-page `metadata` / `generateMetadata` (case studies use title + summary).
  - `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (uses `site`), JSON-LD `Person` on home.
  - Base URL: `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`.
  - Tests: unit test for the base-URL helper; e2e: `/sitemap.xml` lists all routes.

- [ ] **Task 3: Motion foundation**
  - `src/lib/use-reduced-motion.ts`, `SmoothScroll` provider (Lenis, off under reduced motion), `src/lib/gsap.ts` (GSAP + ScrollTrigger registered once, synced with Lenis).
  - Reusable client components: `Reveal` (text reveal) and `PhotoReveal` (blur/desaturate → sharp, DESIGN.md animation 3). Both render content visible on the server; JS sets initial state.
  - Tests: hook (both states); `SmoothScroll` and `PhotoReveal` do nothing under reduced motion.

## Phase B — Pages (follow DESIGN.md exactly)

- [ ] Task 4: Home — hero (with stripes + cutout), about teaser, services.
- [ ] Task 5: Home — "How I work" night section + selected work card row.
- [ ] Task 6: About — photo + paragraphs + Atlas-style story chapters.
- [ ] Task 7: Approach page + Work list + case study page.
- [ ] Task 8: Intro animation + remaining animations from DESIGN.md (each with reduced-motion fallback). Use high reasoning.

## Phase C — Polish + launch

- [ ] Task 9: Performance + accessibility pass (Lighthouse mobile ≥ 90 / ≥ 95), fix findings.
- [ ] Task 10: Final content check, Vercel production deploy.
