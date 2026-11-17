DONE: Task 18 — implementation complete; branch `codex-18-lab` pushed for preview. Nothing merged into main.

check: PASS — content validation, lint, types, 161 unit tests and production build.

e2e: All 18 focused feature checks PASS across desktop, mobile and reduced motion, including active-state axe scans, responsive states and no-JS output. Full suite: 449 passed, 5 intentional skips, 1 flaky preview Writing link scan (passed on retry), 1 FAILED existing desktop pinned Travel keyboard test. The Travel failure reproduced on a clean, unmodified main 8716ab6 in 2 of 5 runs. Its End navigation can use a stale pre-pin scroll limit; the counter says 08/08 while the last page remains off-screen. Task 18 leaves Travel and its test assertions unchanged. Task 17’s separately pushed unpinned implementation removes this dependency and awaits Alif’s review.

Lighthouse: Mobile, Lighthouse 13.6.0, simulated throttling — `/lab`: Performance 92 / Accessibility 100; `/estimate`: Performance 90 / Accessibility 100. Both: LCP 0.9s, CLS 0. TBT: Lab 340ms, Estimate 410ms.

Parts: 1–5 complete, committed separately.

Decisions:
- The sync engine uses immutable snapshots, integer minor-unit amounts, device-prefixed IDs, FIFO queues and acknowledgements matched to order IDs. Interrupted sends, lost acknowledgements, duplicate replay, conflicting payloads and stale acknowledgements have unit coverage. Packet timing belongs to the UI, with immediate delivery under reduced motion.
- The access policy is explicitly illustrative. Role permission, branch scope and cashier row ownership are checked separately; auditors are read-only, and accountants’ cross-branch reads do not grant cross-branch writes.
- Estimator prices are DEMO USD values. Rates, phase weights, uncertainty and urgency factors live in `src/content/estimate.ts`. Urgency changes calendar/price assumptions, not underlying effort. Invalid scope removes contact links until corrected.
- Email/WhatsApp summaries use the existing contact encoding pattern and contact targets. No backend, automatic submission, browser persistence or new dependencies.
- Initial diagrams, matrix, planning ranges and estimate contact links remain readable without JavaScript. Interactive controls enable after hydration; packet motion and phase transitions respect reduced motion. Narrow SVG/table views scroll inside their own frames.

Wiring needed (for Claude): Add Lab (`/lab`) and Estimate (`/estimate`) nav/footer links; add “Try the live demo” from the POS case study to `/lab/offline-sync`. Shared files are intentionally unwired.

Notes: Started from latest main `8716ab6`. Protected shared pages, header, components, global styles and Travel code are unchanged. Sitemap and shared axe/link route coverage include all four new routes. The full-suite Travel blocker is outside Task 18’s protected-path allowance; no tests were skipped or weakened to hide it. Alif reviews the pushed branch’s Vercel preview before any merge.
