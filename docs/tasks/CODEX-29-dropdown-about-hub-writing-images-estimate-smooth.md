# Task 29 — Dropdown fix, About hub, Writing images, Estimate chips, butter-smooth

Builder: Codex web (GPT-6.2 Sol, Medium) **or** Sonnet directly — same file. Orchestrator: Claude.
**Start from branch `codex-28`** (not merged yet): `git fetch origin && git checkout -b codex-29 origin/codex-28`. Read `docs/reports/CODEX-28-report.md` first; keep everything (incl. Lenis `lerp: 0.14`, intro from first paint).
**Do NOT merge.** Push `codex-29` only. Don't stop to ask; record decisions.

## Run order
1. Read this file → `AGENTS.md` → `docs/DESIGN.md` → header/menu/footer, `/writing`, `/about`, `/estimate`, motion components, `BackgroundDots`.
2. Parts 1–6 in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` zero warnings; full `pnpm test:e2e` once, 0 failures; axe 0 serious/critical both themes; Lighthouse mobile `/` and `/writing` (3 runs, all listed). Screenshots 1440 + 390 (dark) of the open dropdowns, Writing list, Estimate → `docs/reports/codex-29/`.
4. Report `docs/reports/CODEX-29-report.md` (commit + push): `DONE / check / e2e / axe / Lighthouse / Parts / Decisions / Screenshots`. Final message only: `DONE codex-29`.

## Part 1 — Dropdown must close (bug Alif saw)
The Services dropdown stays open after clicking "Services" or an item, and while scrolling — it only closes after clicking somewhere else. Fix for every nav dropdown: close on link click / route change, on scroll, on pointer leave (short grace delay), on Escape, on outside click. Still opens on hover and keyboard focus. Add e2e: open → click item → closed; open → scroll 200px → closed.

## Part 2 — "About me" becomes a hub (like Services)
Top nav: **Services · About me · Contact** (Writing leaves the top level).
- About me dropdown: **About · Writing · Travel · Now** (Uses stays in drawer "More").
- In-page tabs on `/about`, `/writing`, `/travel`, `/now` (same pattern as the Services tabs); top item active on all of them and their sub-pages (`/writing/*`, `/travel/*`).
- Drawer group "About me" lists the same. Update unit + e2e tests.
- About page: add one clear short line that Alif loves travelling, with a link to Travel (content in `src/content/`, no new facts beyond "loves travelling").

## Part 3 — Writing: relevant images
Every Writing post (tech + travel) gets **1–2 images**: a cover on the list card + images inside the post. Use demo images for now as **photo slots** (`public/images/slots/writing-<slug>-1.jpg`, `-2.jpg`, neutral placeholder with label, correct ratio) and add them to `docs/PHOTO-SLOTS.md`. Trip posts may reuse their existing travel photos. Add the image field to schema + content + tests together; `next/image` with width/height, lazy below the fold, alt text from content.

## Part 4 — Estimate: all options visible at a glance
The project type is a `<select>` — visitors think Alif only builds "POS / business system". Replace it with a visible **chip/card radio group** (all options on screen, keyboard + screen-reader friendly, one selected).
Options (from `src/content/`): POS / business system · Inventory management · Business back-office (Business OS) · Business website · E-commerce store · Dashboard · Web app · Mobile-first app · Custom software. Each with demo timeline/price (still labelled DEMO). Same chip style for any other multi-choice field on the page.

## Part 5 — Butter-smooth scrolling
Alif (144 Hz laptop) feels small hitches in a few places while scrolling. Not faster — smoother.
- Record a Chrome performance trace while scrolling Home, Writing, Travel, About (desktop). Find long tasks / dropped frames.
- Typical fixes: no layout reads in scroll handlers; GSAP/ScrollTrigger and Lenis on one rAF; animate only `transform`/`opacity`; no `backdrop-filter`/large blur repaint on scroll; `BackgroundDots` cheaper (cap DPR 1.5, fewer links, skip frames while scrolling fast or pause during scroll); images decoded async with fixed sizes; `content-visibility: auto` for far-below sections where safe.
- Keep Lenis `lerp: 0.14` unless the trace shows a better value; record before/after (dropped frames or FPS) per page.

## Part 6 — Home speed (left over from CODEX-28)
Home Lighthouse mobile was 88/77/87. Get every run ≥ 90 without removing the intro or the dots. Record numbers.
