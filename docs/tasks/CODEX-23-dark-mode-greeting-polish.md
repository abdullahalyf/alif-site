# Codex task 23 — Dark mode, warmer light mode, multilingual greeting intro, photo-reveal cleanup, travel notes, skills

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Branch: fresh checkout of latest `main` → `codex-23`. **Do NOT merge into main.** Push branch only.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `src/app/globals.css` (tokens) → header, intro overlay, motion components, about page.
2. Plan Parts 1–8; execute in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` (zero warnings) + full `pnpm test:e2e` with 0 failures; axe in **both** themes; Lighthouse mobile `/` and `/about` (target Performance ≥ 90). Screenshots light + dark at 390/1440 → `docs/reports/codex-23/`.
4. **Report:** write `docs/reports/CODEX-23-report.md`, commit, push. Format:
   ```
   DONE: codex-23 · branch codex-23
   check: pass/fail · e2e: X passed / Y failed / Z skipped · Lighthouse: / and /about
   Parts: 1–8 ✅/❌
   Screenshots: docs/reports/codex-23/
   Notes: max 6 lines
   ```
   Final chat message only: `DONE codex-23 — report at docs/reports/CODEX-23-report.md`.

## Part 1 — Dark mode (done well)
- Theme toggle in the header (sun/moon icon, also in the side-drawer menu). Default = system preference; user choice persisted (`localStorage`, wrapped in try/catch). **No flash on load** (inline script sets `data-theme` before paint).
- A real, considered **warm dark palette** (not pure black, not inverted): e.g. bg ≈ `#1A1815`, surface ≈ `#24211D`, text ≈ `#EDE6DA`, muted ≈ `#A79F92`, hairlines ≈ `#3A3530`, same accent. Every token defined for both themes in `globals.css`; components use tokens only.
- Smooth theme switch: colours cross-fade ~300ms (disable transitions on first paint; reduced motion = instant).
- Images: slightly reduced brightness in dark mode; the dark "How I work" panel must still read as a distinct section in dark mode (use a slightly different surface + border).
- AA contrast in both themes (axe both).

## Part 2 — Warmer, more colourful light mode
Light mode feels too white/bright. Warm the background a touch (cream, never pure white), and introduce **subtle colour**: soft tinted section backgrounds (e.g. pale sage, pale sand, pale clay) alternating on Home/About, coloured category tags, accent colour on hover/underline. Calm, not loud. Update DESIGN.md tokens table.

## Part 3 — Multilingual greeting intro (when arriving on Home)
Replace the current intro with a fast greeting sequence (like Dennis Snellenberg's preloader): words flash one after another in the centre — **Hello · হ্যালো · Hola · Bonjour · こんにちは · 你好 · مرحبا · Hallo** — then end on **"Alif"** shown in several scripts in quick succession (Alif · আলিফ · アリフ · 阿利夫 · ألف), then the overlay slides up. Total ≤ 1.6s; each word ~120–150ms. Plays on first visit **and** whenever the user navigates to Home from another page (not on in-page reloads within 10s). Skippable with click/Esc; reduced motion = skip; no-JS = no overlay. Load only fonts needed for these glyphs efficiently (system fonts with fallbacks are fine) — don't hurt LCP (content renders underneath; overlay is decorative, `aria-hidden`).

## Part 4 — Photo blur reveal only on the Home hero
Keep the blur/desaturate → sharp reveal **only** on the Home hero photo. Remove it from every other image (About photo, education, travel, work, writing, services…) — those images show sharp immediately (a simple fade-in at most).

## Part 5 — Résumé label
Rename "Résumé" everywhere in UI to **"Resume / CV"** (nav, menu, footer, page title, OG). Keep route `/resume`.

## Part 6 — "A few notes from the road" (About → travel teaser)
Its purpose is unclear now. Make it a proper section: heading + one-line intro ("Places I've been and people I've met"), **larger cards** (photo ≥ 320px tall, place, date, 2-line note), horizontal wheel-scroll with progress bar (keep), and a clear "Open the travel journal →" link to `/travel`.

## Part 7 — Skills: add one more group
Add a 4th skills card so the grid is balanced, e.g. **"AI-assisted development & tooling"** (Codex, Claude, prompt-driven workflows, code review, testing) — DEMO levels/notes. Keep it compact.

## Part 8 — Home performance ≥ 90
Home was 88 (LCP 3.5s). Fix LCP: correct `priority`/`fetchPriority` + `sizes` on the hero image, smaller hero source size for mobile, avoid render-blocking work before LCP, make sure the intro overlay doesn't delay LCP. Prove with 3 Lighthouse runs (median ≥ 90).
