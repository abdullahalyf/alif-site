# Codex task 22 — Side-drawer menu, About me layout, skills visual, local demo images + hardening (task 19 folded in)

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Branch: fresh checkout of latest `main` → `codex-22`. **Do NOT merge into main.** Push branch only.
Alif may be away — don't stop to ask; decide sensibly and record decisions.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/tasks/CODEX-19-hardening-content.md` (Parts A–E below come from it) → `docs/reports/CODEX-21-report.md`.
2. Plan Parts 1–8 + A–E briefly; execute in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` (zero warnings) + full `pnpm test:e2e` twice with 0 failures; Lighthouse mobile `/`, `/about`, `/travel`, `/estimate`. Screenshots 390px + 1440px of every changed area → `docs/reports/codex-22/`.
4. **Report:** write `docs/reports/CODEX-22-report.md`, commit, push. Format:
   ```
   DONE: codex-22 · branch codex-22
   check: pass/fail · e2e: run1 X/Y, run2 X/Y · Lighthouse: table
   Parts: 1–8 ✅/❌ · A–E ✅/❌
   Screenshots: docs/reports/codex-22/
   Notes: max 8 lines
   ```
   Final chat message only: `DONE codex-22 — report at docs/reports/CODEX-22-report.md`.

## Part 1 — Menu = side drawer (not full screen)
The Menu button must open a **side drawer from the right** (≈ 380–440px wide on desktop, full width on mobile), page behind dimmed (click outside closes). Same grouped links + search field. Smooth slide, focus trap, Esc, closes on navigation, reduced-motion safe.

## Part 2 — About me top: remove empty areas
(Alif marked two empty areas.) 1) The big empty band right of the "About me" title: put a short intro line + **quick facts** there (based in Savar, Dhaka · from Jhenaidah · CSE @ DIU · languages · currently building…) as small labelled items, plus CTA buttons (Email, Résumé). 2) The empty space under the about paragraphs next to the photo: add a compact **"At a glance" / "What I'm into" strip** or signature + social links so the text column ends level with the photo. Reduce the gap above the title.

## Part 3 — Education + Milestones
- Move **"Milestones along the way"** to **below** the Education section (not beside it).
- Education timeline: each entry gets an **image slot on the right** (institution photo, DEMO local image, 4:3, rounded, PhotoReveal), so the right side is never empty. Content field `image` per education item (schema + content + tests). Mobile: image above text.

## Part 4 — Skills: visual, compact, with short notes
Replace the airy chip lists with a compact visual: per group a card with an **icon**, skills as rows each with a small **visual level indicator** (e.g. 5-dot or thin bar — DEMO levels Alif can edit) and a **one-line note** field Alif can write ("Used in the multi-branch POS sync"). No big empty gaps; bento-like grid with Languages and Interests.

## Part 5 — "A few notes from the road" (travel teaser)
Add a small **progress bar/scrubber** under the strip showing position, and make it scroll sideways with the wheel inside (shared horizontal hook).

## Part 6 — Whitespace pass (again, everywhere)
Alif still feels too much white space. Measure: section padding, heading margins, empty tails. Cut another ~25%, especially About, Work, Services. Verify at 1440/1024/390.

## Part 7 — Work + Services first pass
Work list: denser rows with thumbnail, category, year, one-line outcome; filter by category. Services: blocks with icons, tighter layout, each with a "typical timeline" and a CTA to `/estimate`. (Alif will refine later — make it solid, not final.)

## Part 8 — Easy photo replacement
Make sure every image on the site comes from `src/content/` (no hard-coded paths in components). Update `docs/CONTENT-GUIDE.md` with a short **Bangla** section: "ছবি বদলাবেন কীভাবে" — put the photo in `public/images/...` or run `pnpm add:image <file> <name>`, then change the `src` in the listed content field. List every image slot (page → content field → recommended size).

## Parts A–E (from task 19 — do them too)
- **A** Kill flaky tests (Writing code-block keyboard, Writing link scan); prove with `--repeat-each=20`.
- **B** Performance of `/estimate` and `/lab` (TBT < 200ms, Performance ≥ 95).
- **C** **All demo images local:** download every remote `picsum.photos` image into `public/images/demo/` (≤ 1600px, JPEG q≈75) and point content at local paths; then remove picsum from `remotePatterns`. (Remote images failed to load in task 21 captures.)
- **D** 4 new DEMO blog posts (topics listed in task 19 Part 5).
- **E** `docs/CONTENT-INTAKE-bn.md` (Bangla questionnaire of every DEMO item + image slots) and `pnpm demo:list` script (task 19 Part 6).
Add Task 22 to `docs/ROADMAP.md` (tick); mark Task 19 as merged into 22.
