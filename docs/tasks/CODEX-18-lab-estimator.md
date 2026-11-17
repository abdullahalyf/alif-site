# Codex task 18 — Interactive "Lab" demos + project estimator (long task)

Agent: Codex **web/cloud** · Model: GPT-6.1 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Run this **after CODEX-17 is finished**. Alif is away for hours — don't stop to ask; decide sensibly and note decisions in the report.
**Do NOT merge anything into main.** Push your branch only; Alif reviews the Vercel preview first.

Why: Alif is a software *systems* architect. Clients trust what they can play with. These are self-contained interactive demos that show how he thinks — no backend, all in the browser.

## Run order (do exactly this)
1. **Sync:** start from the latest `main` (new checkout/branch `codex-18-lab`).
2. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `src/features/` (conventions) → `src/content/projects.ts` (multi-branch-pos).
3. **Plan:** Parts 1–5 + files; check "Do NOT edit".
4. **Execute Parts 1–5**, commit after each (`Part N: <name>`).
5. **Verify:** `pnpm check` + `pnpm test:e2e` pass; Lighthouse mobile `/lab` and `/estimate` Performance ≥ 90, Accessibility ≥ 95.
6. **Report** to `docs/reports/CODEX-18-report.md` (commit; also final message): `DONE / check / e2e / Lighthouse / Parts / Decisions / Wiring needed (for Claude) / Notes`.

## Do NOT edit
Puku owns global styles, header, shared components and existing pages; Codex-17 owns travel. Only touch: `src/features/lab/**`, `src/features/estimate/**`, `src/app/lab/**`, `src/app/estimate/**`, `src/content/lab.ts`, `src/content/estimate.ts`, `src/content/schemas/{lab,estimate}.ts`, `src/app/sitemap.ts`, `e2e/**`, `docs/**`. Styles in CSS files next to the new pages, using the DESIGN.md tokens (CSS variables already in globals).

## Part 1 — `/lab` index
A small page: "Lab — things you can play with" + cards for each demo (title, one-line what it shows, "Try it"). Content in `src/content/lab.ts`.

## Part 2 — Demo: Offline-first sync simulator (`/lab/offline-sync`) — the showpiece
Visualise the multi-branch POS idea from Alif's case study:
- 3 branch counters (POS terminals) + 1 cloud database + owner dashboard, drawn as an SVG system diagram.
- User can: create sales on any terminal (button), **toggle each terminal's internet on/off**, and press "Reconnect".
- Offline terminals queue sales locally (show the queue with branch/device-prefixed order IDs like `DHK-02-000117`). On reconnect, the queue **syncs with animated packets** along the lines; duplicates are rejected (idempotency) — include a "Simulate double-send" button that shows the server ignoring the duplicate.
- Dashboard panel: total sales per branch updates live; an event log explains each step in plain English.
- Pure TypeScript state machine in `src/features/lab/offline-sync/engine.ts` with thorough unit tests (queueing, idempotent merge, ordering, reconnect). UI is a thin layer. Keyboard + screen-reader friendly (live region for the log). Reduced motion: packets jump instead of animate.

## Part 3 — Demo: Role-based access explorer (`/lab/access-control`)
Six POS roles (owner, manager, cashier, inventory clerk, accountant, auditor) × resources (sales, refunds, stock, prices, reports, staff). Pick a role → see a permission matrix light up; try an action → shows allowed/denied with the rule that decided it (row-level-security style explanation). Pure engine + tests.

## Part 4 — Project estimator (`/estimate`)
Interactive form for potential clients: project type (POS/business system, dashboard, web app, mobile-first app), number of branches/locations, number of user roles, offline needed?, integrations (payments, SMS, email, accounting), data migration?, timeline urgency. Output (live as you change inputs): estimated **timeline range** (weeks), **effort phases** (discovery, architecture, build, rollout) as an animated bar, a **price range** (clearly labelled "DEMO numbers — Alif will set real ones" and taken from `src/content/estimate.ts` so he can edit), and a summary card with "Send this to Alif" (prefilled mailto / WhatsApp, reusing the contact pattern from `src/features/contact`). Pure calculation module + tests.

## Part 5 — Polish, tests, docs
- Motion: reuse existing motion components where possible (import only); respect reduced motion; no JS-only hidden content.
- E2E: each demo's core flow (go offline → sell → reconnect → totals correct; duplicate ignored; role switch; estimator output changes + mailto URL).
- axe + link-check include new routes; sitemap updated.
- Add Task 18 to `docs/ROADMAP.md` (tick). Report lists wiring needed (nav/footer links, a "Try the live demo" link from the POS case study to `/lab/offline-sync`).
