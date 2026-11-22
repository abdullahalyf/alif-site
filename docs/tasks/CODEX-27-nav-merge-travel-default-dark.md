# Codex task 27 — Simpler nav, merged pages, travel everywhere, default dark, no "empty until scroll"

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
**Start from branch `sonnet-final`** (PR #18, newest work, not merged yet): `git fetch origin && git checkout -b codex-27 origin/sonnet-final`. Read `docs/reports/SONNET-FINAL-report.md` first — keep everything it did (dots background, facts, copy guard, intro, tone rules).
**Do NOT merge into main.** Push branch `codex-27` only. Don't stop to ask; record decisions.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/reports/SONNET-FINAL-report.md` → header/menu/footer, `/travel`, `/writing`, `/resume`, `/contact`, motion components, theme bootstrap (`src/lib/theme.ts`).
2. Plan Parts 1–8; execute in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` zero warnings; full `pnpm test:e2e` twice, 0 failures; axe 0 serious/critical both themes; Lighthouse mobile `/`, `/travel`, `/contact` (median of 3, ≥ 90 / ≥ 95). Screenshots 390 + 1440 (dark default + light) → `docs/reports/codex-27/`.
4. **Report:** `docs/reports/CODEX-27-report.md` (commit + push): `DONE / check / e2e ×2 / axe / Lighthouse / Parts / Decisions / Redirects added / Screenshots`. Final chat message only: `DONE codex-27 — report at docs/reports/CODEX-27-report.md`.

## Part 1 — Nav: fewer items (Alif: "too many sections")
Desktop nav becomes exactly: **Work · Writing · About me · Contact** (+ Search, theme toggle, Menu).
- **Work** = one hub covering Projects, Services and Approach: hovering/focusing "Work" opens a small dropdown (Projects / Services / Approach / Lab demos / Estimate a project). Keep the existing routes working (`/work`, `/services`, `/approach`, `/lab`, `/estimate`); add an in-page sub-nav (tabs) at the top of those pages so they feel like one section.
- Side-drawer Menu keeps everything, grouped (Work / Writing & Travel / About / Contact & CV / More: Uses, Now).
- Mobile: same structure in the drawer.

## Part 2 — Contact + Resume/CV merged
One page **`/contact`** titled e.g. "Contact & CV": top = ways to reach + availability + the brief form (existing); then a **CV section** (summary, experience, education, skills — from content) with **Download CV (PDF)**. `/resume` → permanent redirect to `/contact#cv` (keep print styles working for the CV section, or keep a print-only `/resume` route if simpler — decide, record). Nav label "Contact". Alif will provide his real CV later — structure the CV content in `src/content/` so it's easy to replace; don't invent new facts.

## Part 3 — Nothing hidden until you scroll (bug Alif saw on /resume)
On `/resume` the "Experience" heading showed with empty space under it until he scrolled further — a visitor who scrolls a little thinks there's no content. Site-wide fix: any element already in (or within 15% of) the viewport on load renders immediately; scroll reveals start at `top 92%`; reveals never hide content for more than ~400ms; elements that are passed quickly by fast scrolling are shown instantly. Add an e2e test: after load and after a 300px scroll, every visible heading's following content is visible (opacity 1, not clipped) on `/contact`, `/about`, `/work`.

## Part 4 — Default theme = dark
First-time visitors get **dark** by default (ignore system preference); the toggle still switches and persists the choice. Update the no-flash bootstrap and tests.

## Part 5 — Travel map: curved routes
The route between places is drawn with straight lines — looks crude. Use smooth curved paths (quadratic/cubic Bézier between consecutive points, gentle arcs, consistent curvature direction, dashed), with the progress drawing still following the book. Same for the international route (already curved — match style).

## Part 6 — Travel page empty space
Under the journey book (below the place name "Kuakata" in the left panel and below the book) there's a big empty area. Tighten: the left panel content fills its height (place name + date + short note + small stats), reduce bottom padding of the book section, and make the next section start closer.

## Part 7 — Travel visible from Home + inside Writing
- Home: add a compact **"I travel"** section high on the page (after the intro/about teaser): 3–4 travel photo cards (horizontal, wheel-scroll) + one line ("I travel across Bangladesh and talk to people — it shapes how I design systems") + "Open the travel journal →".
- Writing: add filter tabs **All · Tech · Travel**. Every travel trip page (`/travel/<slug>`) also appears as a Travel post in `/writing` (card linking to the trip page), and RSS includes them. On a trip page, show "More travel stories" + link back to Writing (Travel).

## Part 8 — Sub-pages easy to find
Uses, Now, Lab, Estimate, Travel must be reachable in ≤ 1 click from somewhere obvious: the Work dropdown (Lab, Estimate), Menu "More" group (Uses, Now), Footer columns, and a small "Also on this site" strip at the end of About me. Update footer columns to the new grouping. Add Task 27 to `docs/ROADMAP.md` (tick).
