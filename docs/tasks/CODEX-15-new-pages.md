# Codex task 15 — Five new pages + search (big task)

Agent: Codex **web/cloud** (repo checked out at main) · Model: GPT-6.1 Sol · Reasoning: High · Orchestrator: Claude (follow exactly).
Expected size: large (≈1–1.5h). Do every part fully; quality over speed.

Context: this is Alif's multi-page personal website + portfolio (freelance software systems architect, Bangladesh). Design language: `docs/DESIGN.md` (steno.ai-led: cream, Instrument Serif headings, Inter body, hairlines, generous space, night sections). Another agent (Puku) is editing existing pages/components right now, so you build **new, self-contained** pages that plug in later.

## Run order (do exactly this)
1. **Sync:** you start on the latest `main`. When finished, push your work (Alif presses "Create PR" in the Codex UI).
2. **Read fully, in order:** this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/CONTENT-GUIDE.md` → `src/content/*.ts` (read only) → one existing page (e.g. `src/app/approach/page.tsx`) to copy conventions.
3. **Plan first:** list Parts 1–7 with files; check every file against "Do NOT edit".
4. **Execute Parts 1–7 in order**, commit after each (`Part N: <name>`).
5. **Verify:** `pnpm check` + `pnpm test:e2e` must pass. PR title: "Task 15: Services, Contact, Resume, Uses, Case-study diagrams, Search".
6. **Report** to `docs/reports/CODEX-15-report.md` (commit it; also your final message):
   ```
   DONE: codex-15
   check: <pass/fail> · e2e: <x passed / y failed>
   Parts: 1 ✅ … 7 ✅ (❌ + reason)
   Wiring needed (for Claude): <exact list of nav links / imports to add to protected files>
   Notes: <max 5 lines>
   ```

## Do NOT edit
Existing files in `src/app/**` (except `src/app/sitemap.ts`), `src/components/**`, `src/lib/**`, `globals.css`, `src/content/site.ts`, `schema.ts`, `projects.ts`. Everything else = new files.
Put new components in `src/features/<name>/`, new content in new files `src/content/<name>.ts` with their own Zod schemas in `src/content/schemas/<name>.ts`, new styles in a CSS file next to each new page. Mark demo content `// DEMO`.

## Part 1 — `/services`
Hero (serif h1 + intro) → 4 service blocks (system architecture, business software, offline-first apps, database & access control): what you get, typical deliverables, timeline → "How an engagement works" (5 numbered steps) → 3 engagement models (fixed-scope project, monthly retainer, architecture review) with "best for" + starting price placeholder (DEMO) → FAQ (8 Q&As, accessible `<details>` accordion) → CTA to `/contact`.

## Part 2 — `/contact`
Two columns: left — direct channels (email, WhatsApp, location, response time, availability status); right — **project brief form** (name, email, company, project type select, budget range select, timeline select, message). No backend: on submit it validates (Zod, inline accessible errors) and opens a prefilled email (`mailto:` with subject/body) or WhatsApp (`wa.me` with text) — user chooses with two buttons. Works without JS as a plain mailto link fallback. Read email/WhatsApp from `site.ts` (import, don't edit).

## Part 3 — `/resume`
Printable CV generated from content: header (name, role, contacts), summary, experience (DEMO + real POS work), projects (from `projects.ts`), education, skills, languages, achievements (import from existing content where it exists). Clean A4 print stylesheet (`@media print`: no nav/footer, black on white, page breaks), "Download PDF" button = `window.print()`. Unit test that every section renders.

## Part 4 — `/uses`
Alif's setup: hardware, editor & AI tools (Codex, Claude), languages/frameworks, databases, infra/deploy, productivity — grouped lists with one-line "why" each (DEMO, Alif edits later).

## Part 5 — Case-study architecture diagrams
Data-driven SVG diagram component `src/features/diagram/ArchitectureDiagram.tsx`: nodes (label, kind: client/service/db/external) + edges (from, to, label), auto layout in columns, styled per DESIGN.md, accessible (`role="img"` + text description list). Content in `src/content/diagrams.ts` keyed by project slug — write real-looking diagrams for `multi-branch-pos` (POS terminals → local SQLite → sync service → Supabase Postgres (RLS) → owner dashboard, Cloudflare, GitHub Actions) and `traffic-accident-risk` (data sources → preprocessing → model training → evaluation → risk map), DEMO diagrams for the rest. Add a demo route `/work/[slug]/architecture` (new folder) that renders it full-page so it's usable before wiring into the case study.

## Part 6 — Site search (⌘K / Ctrl+K)
`src/features/search/`: build-time search index (projects, posts, pages) as a static JSON route (`src/app/search-index.json/route.ts`), and a `SearchDialog` client component: opens with ⌘K/Ctrl+K or a button, fuzzy match (write a tiny scorer — no new library), keyboard navigation (↑↓ Enter Esc), focus trap, screen-reader announcements, results grouped by type. Add a demo route `/search` that hosts the dialog so it's testable now; wiring into the header comes later.

## Part 7 — Integration + tests
- Add all new routes to `src/app/sitemap.ts`; extend the axe + internal-link e2e specs to all new routes.
- E2E: contact form validation + generated mailto/wa.me URLs; search opens with keyboard and navigates; resume print styles hide nav; diagram has accessible description.
- Add Task 15 to `docs/ROADMAP.md` (tick it) and renumber the template refactor to Task 16.
