# Codex task 19 — Hardening, performance, content depth + intake for Alif (1.5–2h)

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
**Do NOT merge into main.** Push your branch only; Claude reviews, Alif approves the preview.
Alif may be away — don't stop to ask; decide sensibly and note decisions in the report.

## Run order (do exactly this)
1. **Sync:** fresh checkout of latest `main`, branch `codex-19-hardening`.
2. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/reports/CODEX-17-report.md` + `CODEX-18-report.md` (known issues) → `docs/CONTENT-GUIDE.md`.
3. **Plan:** Parts 1–7 + files; check "Do NOT edit".
4. **Execute Parts 1–7 in order**, commit after each (`Part N: <name>`).
5. **Verify:** `pnpm check` with **zero warnings**; full `pnpm test:e2e` **3 times in a row with 0 failures** (paste all three summaries); Lighthouse mobile on `/`, `/about`, `/lab`, `/estimate`, `/travel` (paste numbers).
6. **Report** to `docs/reports/CODEX-19-report.md` (commit; also final message): `DONE / check / e2e ×3 / Lighthouse table / Parts / Decisions / Issues found but not fixed (file + why) / Notes`.

## Do NOT edit
Puku (another agent) may be changing: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/**`, `src/lib/**`, home/about/approach/services/work page files. Leave them alone. If a fix needs one of them, don't do it — list it under "Issues found but not fixed" with the exact change needed.

## Part 1 — Kill flaky tests
Known flakes from Codex 17/18 reports: mobile Writing code-block ArrowRight check; Writing internal-link scan on preview. Find the root cause (timing, hydration, focus, network) and fix it properly in the test or in `src/app/writing/**` / `src/features/**` — never by skipping or loosening assertions without reason. Run each fixed spec 20× (`--repeat-each=20`) to prove it's stable.

## Part 2 — Lint + build hygiene
Zero ESLint warnings (e.g. the unused `eslint-disable` in `src/app/opengraph-image.tsx`). No TypeScript `any` leaks in `src/features/**`. Remove dead code/unused exports in files you own (`src/features/**`, `src/content/**`, `scripts/**`).

## Part 3 — Performance of interactive pages
`/estimate` (TBT ~410ms) and `/lab` (TBT ~340ms) are the heaviest. Reduce main-thread work: split the interactive parts with `next/dynamic` / lazy mounting below the fold, defer non-critical work with `requestIdleCallback`, avoid large client bundles (check with `next build` output). Target: Performance ≥ 95 on both, TBT < 200ms, no visual change.

## Part 4 — Case-study depth (content only)
In `src/content/projects.ts` (+ `schema.ts` only to add OPTIONAL fields, with tests): add `timeline` (phases with weeks), `challenges` (2–3 hard problems + how they were solved), `metrics` (label + value) for every project. For `multi-branch-pos` use only facts already in the file (rephrase, don't invent numbers — mark any new number `// DEMO`). Don't render them yet (page is Puku's) — list the render wiring in the report.

## Part 5 — Writing
Add 4 more published DEMO posts in `src/content/posts/` (600–900 words each, headings, a list, a code block or diagram description), on: "How I scope a project before writing code", "Role-based access control for small businesses", "Choosing SQLite + Postgres for offline-first apps", "What I learned building my first POS". Tag them; make sure RSS, sitemap, search index and OG images pick them up.

## Part 6 — Content intake for Alif (Bangla)
Create `docs/CONTENT-INTAKE-bn.md` — a checklist **in Bangla** (simple, short lines) of every DEMO item across the whole site, grouped by page (Home, About me, Work, Services, Writing, Travel, Lab/Estimate prices, Résumé, Uses, Now). For each: what it is now (1 line), the exact question for Alif ("আপনার কলেজের নাম ও পাসের সাল?"), and the file + field where the answer goes. Also list every image slot with its required size/orientation. Add a script `pnpm demo:list` that prints all `// DEMO` markers with file:line so this list can be regenerated.

## Part 7 — Site-wide audit (report only + safe fixes)
Run axe + Lighthouse SEO/best-practices on **every** route (use the route list helper). Fix issues inside files you own. For everything else write precise fix instructions in the report (file, line, change) so Claude can hand them to Puku.
Add Task 19 to `docs/ROADMAP.md` (tick).
