# Codex task 26 — Services made visual + better colour grading

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Branch: fresh checkout of latest `main` → `codex-26`. **Do NOT merge into main.** Push branch only. Don't stop to ask; record decisions.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `src/app/globals.css` (tokens) → `/services` page + content → `docs/reports/CODEX-25-report.md`.
2. Plan; execute Parts 1–3; commit after each.
3. Verify: `pnpm check` zero warnings; full `pnpm test:e2e` twice, 0 failures; axe 0 serious/critical light + dark on every route; Lighthouse mobile `/services` and `/` (median of 3, ≥ 90 / ≥ 95). Screenshots light + dark, 390 + 1440 of `/services`, `/`, `/about` → `docs/reports/codex-26/` (include before/after of the colour change).
4. **Report:** `docs/reports/CODEX-26-report.md` (commit + push): `DONE / check / e2e ×2 / axe / Lighthouse / Parts / Decisions / Screenshots`. Final chat message only: `DONE codex-26 — report at docs/reports/CODEX-26-report.md`.

## Part 1 — `/services`: from text to visual (Alif: "I only see text — make it appealing so a client instantly understands")
Redesign the page so a non-technical business owner gets it in 10 seconds:
- **Hero**: short promise + a visual — an animated mini illustration (SVG) of "your business → system → dashboard" or a collage of 3 product-style mockup cards (POS screen, dashboard, mobile app) built in HTML/CSS/SVG (no stock screenshots needed).
- **Each service = a visual card/section**, alternating image left/right: a **mockup visual** that shows the outcome (e.g. POS counter screen mockup, owner dashboard with small chart, offline-sync diagram, permission matrix preview) — built with HTML/CSS/SVG and on-brand colours, light + dark aware. Next to it: who it's for, what you get (icon checklist), typical timeline as a small bar, starting point "from …" (DEMO), CTA "Estimate this →" to `/estimate?service=…` (prefill the estimator if easy).
- **Process** as a horizontal visual timeline with numbered nodes and icons (scroll-revealed line drawing), not a text list.
- **"Why work with me"** as 4 icon tiles with one-line proof each (decisions with reasons · fast delivery with AI agents · tested & reviewed · offline-first experience).
- **Engagement models** as 3 pricing-style cards (highlight the recommended one), DEMO prices clearly labelled.
- FAQ stays (accordion), tighter.
- Motion: calm reveals, mockups gently float/parallax (≤ 12px), chart bars grow when visible, reduced-motion = static. Mobile: stacked, visuals scaled, no overflow.
All copy in `src/content/` (services content file); keep the honest framing.

## Part 2 — Colour grading (Alif: "background colours could be better")
Current cream/sage/sand/clay feels flat/muddy. Create a **more refined, harmonious palette**:
- Light: a cleaner warm off-white base (less yellow/grey), one confident brand accent (e.g. deep olive or forest green) + one warm secondary (terracotta/amber) used sparingly; section tints become subtle and clearly related (same hue family, small lightness steps), not random.
- Dark: matching warm charcoal base with the same accents tuned for dark.
- Define it as a small token scale (bg, surface-1, surface-2, tint-a, tint-b, ink, ink-muted, line, accent, accent-2) in `globals.css`; replace ad-hoc colours across components with tokens.
- Check every page in both themes for harmony and AA contrast; update the colour table in `docs/DESIGN.md`. Provide before/after screenshots.

## Part 3 — ROADMAP
Add Task 26 to `docs/ROADMAP.md` (tick).
