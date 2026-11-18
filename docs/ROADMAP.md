# Roadmap

One task = one Codex run = one PR. Do them in order. Read `docs/DESIGN.md` for every task.

## Phase 0 — Foundation (done)
- [x] Task 0: Next.js 16 scaffold, Tailwind 4, Zod content + schema, Vitest, Playwright, CI, AGENTS.md, fonts, photos, design spec.

## Phase A — Structure

- [x] **Task 1: Design tokens, fonts, layout shell**
  - Colours, type scale and fonts from DESIGN.md (`src/fonts/` via `next/font/local`, CSS variables + Tailwind `@theme`).
  - `Header` (desktop nav + mobile menu overlay, keyboard accessible), `Footer` (night section with contact), `Button`, `SectionLabel` components.
  - Routes with placeholder content from `site`/`projects`: `/`, `/about`, `/approach`, `/work`, `/work/[slug]` (`generateStaticParams`, `notFound()`), custom `not-found`.
  - Tests: unit tests for `Header` (links, menu toggle) and `Button`; e2e: every nav link works on desktop + mobile, unknown slug → 404.

- [x] **Task 2: SEO + metadata**
  - Per-page `metadata` / `generateMetadata` (case studies use title + summary).
  - `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (uses `site`), JSON-LD `Person` on home.
  - Base URL: `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`.
  - Tests: unit test for the base-URL helper; e2e: `/sitemap.xml` lists all routes.

- [x] **Task 3: Motion foundation**
  - `src/lib/use-reduced-motion.ts`, `SmoothScroll` provider (Lenis, off under reduced motion), `src/lib/gsap.ts` (GSAP + ScrollTrigger registered once, synced with Lenis).
  - Reusable client components: `Reveal` (text reveal) and `PhotoReveal` (blur/desaturate → sharp, DESIGN.md animation 3). Both render content visible on the server; JS sets initial state.
  - Tests: hook (both states); `SmoothScroll` and `PhotoReveal` do nothing under reduced motion.

## Phase B — Pages (follow DESIGN.md exactly)

- [x] Task 4: Home — hero (photo panel + stripes), about teaser, services.
- [x] Task 5: Home — "How I work" night section + selected work card row.
- [x] Task 6: About — photo + paragraphs + Atlas-style story chapters.
- [x] Task 7: Approach page + Work list + case study page.
- [x] Task 8: Intro animation + remaining animations from DESIGN.md (each with reduced-motion fallback). Use high reasoning.

## Phase C — Polish + launch

- [x] Task 9: Performance + accessibility pass (Lighthouse mobile ≥ 90 / ≥ 95), fix findings.
- [ ] Task 10: Final content check, Vercel production deploy.

- [x] Task 11: Writing (Markdown posts, schema/loader, article pages, draft filtering, RSS) + Now page, navigation, sitemap and tests.

- [x] Task 12: Demo content, seven complete projects, remote demo images, achievements, About details, Home stats/testimonials and latest published writing; schema and browser tests.

- [x] Task 13: Quality pass — Lighthouse CI warnings, per-project/post share images, security/cache headers, professional demo content, JSON-LD and Playwright cache.

- [x] Task 14: Template groundwork — content validator, image tool, starter kit, theme inventory and guides (non-breaking).
- [x] Task 15: Services, Contact, Resume, Uses, case-study architecture diagrams and site search.
- [x] Task 16: Travel photo-book, typed demo journeys, accessible horizontal scroll/pinning, /travel page and unwired About teaser; tests and sitemap.

- [x] Task 17: Unpinned travel journey with scoped wheel/drag scrolling, Bangladesh route map, place colours, trip pages and accessible galleries, computed stats, filters and local demo photos.
- [x] Task 18: Interactive Lab index, offline-sync simulator and scoped access explorer, editable project estimator, contact summaries, reduced-motion/no-JS fallbacks and tests. Full regression has an existing pinned Travel blocker; see `docs/reports/CODEX-18-report.md`.
- [x] Task 23: Site themes, multilingual Home greeting, photo reveal cleanup, Resume / CV, About travel notes and skills, and Home performance.

- [x] Task 19: Hardening and content intake, merged into Task 22.

- [x] Task 20: Free-scroll travel book, detailed maps and Malaysia demo, fixed header, local dark transition, mobile hero, grouped footer, and Home photo motion. See [the report](reports/CODEX-20-report.md).

- [x] Task 21: Full menu and search, direction-aware navbar, inset hero portrait and floating photo strip, shared horizontal wheel scrolling, denser layouts, and responsive footer. See [the report](reports/CODEX-21-report.md).

- [x] Task 22: Side drawer, About layout, visual skills, travel scrubber, Work and Services polish, local demo images, Writing and hardening. See [the report](reports/CODEX-22-report.md).
