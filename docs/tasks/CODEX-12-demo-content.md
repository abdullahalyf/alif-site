# Codex task 12 — Demo content, more projects, achievements

Agent: Codex (cloud) · Reasoning: High · Orchestrator: Claude (follow these instructions exactly).

## Run order (do exactly this)
1. **Sync:** start from the latest `main`; create branch `codex-12-demo-content`.
2. **Read fully, in order:** this file → `AGENTS.md` → `docs/DESIGN.md`.
3. **Plan first:** list the parts below and the files each one touches.
4. **Execute Parts 1–6 in order**, commit after each part (`Part N: <name>`).
5. **Verify + ship:** `pnpm check` and `pnpm test:e2e` must pass. Open ONE PR titled "Task 12: Demo content, more projects, achievements".
6. **Write your report** to `docs/reports/CODEX-12-report.md` (commit it on your branch, in the same PR, and also paste it as the PR body). Claude reads it there — Alif does not need to copy anything. Use exactly this format:
   ```
   DONE: codex-12 · PR #<n> · branch codex-12-demo-content
   check: <pass/fail> · e2e: <x passed / y failed>
   Parts: 1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ 6 ✅ (❌ + reason if not)
   Notes: <max 5 lines>
   ```

## Goal
The site must look complete and rich now, using DEMO content that Alif replaces later. Mark every demo text/image in `src/content/` with a `// DEMO` comment. Follow DESIGN.md styling. Reuse existing motion components (`PhotoReveal`, `Reveal`, `StaggerIn`) on new sections.

**Do NOT edit** `src/components/header.tsx`, `src/components/home/hero.tsx`, anything in `src/components/motion/` or `src/lib/gsap.ts` — another agent owns those.

## Part 1 — Remote demo images
- Allow `https://picsum.photos` in `next.config.ts` (`images.remotePatterns`).
- Schema: image `src` may be a local path (`/…`) or an `https://` URL. Keep the "local images exist" test, for local paths only.
- Use stable seeded URLs: `https://picsum.photos/seed/<name>/1600/1000`.

## Part 2 — Work
- Keep `multi-branch-pos` (Client work) and `traffic-accident-risk` (Research) unchanged in text; give each 2–3 demo images.
- Remove the `portfolio` project.
- Add 5 demo projects (mix: client business system, analytics dashboard, web app, mobile-first booking app, open-source dev tool), every case-study field filled, 2–3 demo images each. Category enum may gain "Open source".

## Part 3 — Achievements
- Add `achievements` to the site schema + content: `{ title, org, year, text }[]`.
- First (REAL, not demo): "Nominated for a semester exchange at IIT Bombay" · org "DIU–IIT Bombay MoU" · year 2027 · text "Selected from Daffodil International University for the Spring 2027 semester exchange at IIT Bombay."
- Add 2 demo achievements.
- Home: "Highlights" section after the About teaser (cards). About me: full list.

## Part 4 — About me sections (demo-filled)
- Education timeline: university (DIU, CSE, 2025–present — real), college and school (demo).
- Skills grouped (Architecture, Backend, Frontend, Data, Tools).
- Languages (real): Bangla — native; English — fluent; Hindi — speaking & listening; Japanese — basic (DILC course).
- Interests (demo).
- Story chapters get demo images.

## Part 5 — Richer Home
- "At a glance" stats strip (demo numbers, e.g. years building, systems shipped, branches served).
- Testimonials row: 2–3 demo quotes with clearly fake names, marked DEMO.
- "Latest writing": latest 2 published posts (hide the section if none).

## Part 6 — Tests + docs
- Update schema/content tests, axe + link-check specs for all new sections/routes.
- Add Task 12 to `docs/ROADMAP.md` and tick it.
