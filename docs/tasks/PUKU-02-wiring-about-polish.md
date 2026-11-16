# Puku task 02 — Wire new pages, search, diagrams + richer About me

Agent: Puku (Opus) · Folder: `E:\Projects\alif-site` · Orchestrator: Claude (follow exactly).
Do this **after PUKU-01 is finished** (all 5 parts committed). Same branch, same PR — this extends it.

## Run order (do exactly this)
1. **Finish PUKU-01 first** (Parts 1–5 committed). If not done, finish it before starting here.
2. **Bring in the latest main** on your PUKU-01 branch: `git fetch origin && git merge origin/main`. Resolve conflicts carefully (main now has new pages: services, contact, resume, uses, writing, now, search, diagrams in `src/features/`). Run `pnpm install` (new deps) and `pnpm check`. Commit the merge.
3. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/ORCHESTRATION.md` ("Pending wiring") → `docs/reports/CODEX-15-report.md` (its "Wiring needed" list).
4. **Plan first:** list Parts 1–6 and files.
5. **Execute Parts 1–6 in order**, commit after each (`PUKU-02 Part N: <name>`).
6. **Verify:** `pnpm check` + `pnpm test:e2e` pass (paste final lines). Push; update the same PR (retitle: "Puku 1+2: animations, brand, hero, wiring, About me"). 
7. **Report** to `docs/reports/PUKU-02-report.md` (commit it + paste into the PR body):
   ```
   DONE: puku-02 · PR #<n> · branch <name>
   check: <pass/fail> · e2e: <x passed / y failed>
   Parts: 1 ✅ … 6 ✅ (❌ + reason)
   Notes: <max 5 lines>
   ```
Use your skills heavily (frontend-design, test-driven-development, systematic-debugging, verification-before-completion, requesting-code-review, any GSAP/Next.js/a11y/perf skill).

## Do NOT edit
`src/features/travel/`, `src/app/travel/`, `src/content/travel.ts` — Codex is building those now.

## Part 1 — Navigation
- Header nav (desktop): Work, Services, Approach, Writing, About me, Contact (`/contact`). Search button (icon + "⌘K" hint) at the right.
- Mobile menu overlay: all of the above + Resume, Uses, Now; big serif links that stagger in; closes on route change; focus trapped; Esc closes.
- Footer: add a links column: Resume, Uses, Now, Writing RSS. All labels/links in `src/content/site.ts`.

## Part 2 — Search
Render `SearchDialog` (from `@/features/search/SearchDialog` + its CSS) once in the layout/header; ⌘K / Ctrl+K and the header button open it. Keep the `/search` route working. Tests: keyboard open from any page.

## Part 3 — Architecture diagrams in case studies
Render `<ArchitectureDiagram diagram={diagrams[project.slug]} />` (+ its CSS) in the case-study page as a "System design" section (skip gracefully if no diagram). Animate: boxes fade/scale in, edges draw in (stroke-dashoffset) in order, once, on scroll; static under reduced motion.

## Part 4 — Motion on every newer page
Apply `Reveal` / `PhotoReveal` / `StaggerIn` consistently to: services (blocks, steps, FAQ), contact, resume (screen only — print stays static), uses, writing list + post page, now, search page, highlights, testimonials, stats strip (count-up numbers when visible).

## Part 5 — About me, richer (steno + atlasnyc feel)
- Intro: split layout — large `aboutPhoto` (PhotoReveal) + serif h1 + `about` paragraphs.
- Story chapters: Atlas-style staggered layout (big/small photos alternating sides, captions `[LABEL]`), photos drift slightly with scroll (parallax), text Reveal.
- Education timeline with a vertical line that fills as you scroll; skills + languages as chips; highlights/achievements cards.
- Leave a clearly commented slot `{/* TravelTeaser goes here (Codex task 16) */}` after the story.

## Part 6 — Final pass
Every page at 375px and 1440px: no overflow, consistent spacing rhythm, headings scale, hover/focus states. Lighthouse mobile on `/` and `/about` (Performance ≥ 90, Accessibility ≥ 95) — fix regressions.
