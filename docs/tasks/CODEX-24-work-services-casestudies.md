# Codex task 24 — Work, Services and case studies: make them client-winning

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Branch: fresh checkout of latest `main` → `codex-24`. **Do NOT merge into main.** Push branch only.

Context: Alif's real profile (see Skills on `/about`): a systems architect who designs, decides with clear trade-offs, and builds by orchestrating AI agents. Every page here must sell **that** honestly — clear thinking, real decisions, results — not hand-coding claims.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `src/content/projects.ts` + `schema.ts` → `/work`, `/work/[slug]`, `/services` code → `docs/reports/CODEX-22-report.md`, `CODEX-23-report.md`.
2. Plan Parts 1–6; execute in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` (zero warnings) + full `pnpm test:e2e` 0 failures; axe both themes; Lighthouse mobile `/work`, a case study, `/services` (≥ 90 / ≥ 95). Screenshots light + dark, 390 + 1440 → `docs/reports/codex-24/`.
4. **Report:** write `docs/reports/CODEX-24-report.md`, commit, push. Format:
   ```
   DONE: codex-24 · branch codex-24
   check: pass/fail · e2e: X/Y/Z · Lighthouse table
   Parts: 1–6 ✅/❌
   Screenshots: docs/reports/codex-24/
   Notes: max 6 lines
   ```
   Final chat message only: `DONE codex-24 — report at docs/reports/CODEX-24-report.md`.

## Part 1 — Case-study depth (content)
Add OPTIONAL schema fields + content for every project: `timeline` (phases with weeks), `decisions` (3–4 key architecture decisions, each: decision, alternatives considered, why — this is Alif's strongest skill), `challenges` (2–3 hard problems + how solved), `metrics` (label + value), `role` wording that matches reality ("Architect; built with AI agents (Codex, Claude); reviewed and tested"). For `multi-branch-pos` use only facts already in the file (rephrase; any new number gets `// DEMO`). Tests for schema.

## Part 2 — Case-study page layout
Structured, scannable, premium: hero (title, client, year, role, 1-line outcome, key metrics strip) → Problem → **Key decisions & trade-offs** (cards: decision / alternatives / why) → System design (existing diagram) → Timeline (horizontal phase bar) → Challenges → Results → Stack ("built with" + "orchestrated with AI") → "Try the live demo" (where it exists) → next project. Sticky mini table-of-contents on desktop. Calm motion (Reveal), no blur reveal.

## Part 3 — Work index
Denser, more convincing: featured project at the top (large card with metric), then a grid/list with thumbnail, category, year, 1-line outcome; category filter (keep); hover preview (desktop). Empty-state-proof.

## Part 4 — Services
Each service: icon, who it's for, what you get (deliverables), typical timeline, how AI-orchestrated building makes it faster/cheaper (honest), CTA to `/estimate`. Add a short "Why work with me" strip (decisions with reasons · fast delivery with AI · tested & reviewed · offline-first experience). FAQ stays. Tighten whitespace.

## Part 5 — Consistency with honest skills
Search all content (projects, services, resume, uses, now, posts) for claims of hand-coding expertise and align them with the honest framing. Keep tone confident, not apologetic.

## Part 6 — Whitespace + dark mode check
Re-check these pages for excess whitespace and dark-mode contrast/visual issues; fix. Add Task 24 to `docs/ROADMAP.md` (tick).
