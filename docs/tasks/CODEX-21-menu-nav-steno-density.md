# Codex task 21 — Full menu, smart navbar, Steno hero scroll, horizontal-wheel areas, less whitespace

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
**Start from branch `codex-20-urgent`** (not main — task 20 is not merged yet): `git fetch origin && git checkout -b codex-21 origin/codex-20-urgent`.
**Do NOT merge into main.** Push branch `codex-21` only.

## Run order
1. Branch as above. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/reports/CODEX-20-report.md` → header, footer, home hero, about page, horizontal-scroll code (travel book + selected work).
2. Plan Parts 1–6 briefly, execute in order, commit after each (`Part N: <name>`).
3. Verify: `pnpm check` + `pnpm test:e2e` pass. Screenshots at 390px and 1440px of every changed area → `docs/reports/codex-21/`.
4. **Report:** write `docs/reports/CODEX-21-report.md`, commit it, push. Format exactly:
   ```
   DONE: codex-21 · branch codex-21
   check: pass/fail · e2e: X passed / Y failed / Z skipped
   Parts: 1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ 6 ✅ (❌ + reason)
   Screenshots: docs/reports/codex-21/
   Notes: max 6 lines
   ```
   Your final chat message is just: `DONE codex-21 — report at docs/reports/CODEX-21-report.md`.

## Part 1 — Full menu (desktop + mobile)
Keep the top nav links, and add a **"Menu" button** (right side, next to Search) on desktop too. It opens a full-screen overlay (cream, large serif links with stagger) containing **everything from the footer**, grouped: Explore (Work, Services, Approach, About me, Travel) · Resources (Writing, Résumé, Uses, Now, RSS) · Try (Lab demos, Estimate a project) · Connect (Email, WhatsApp, GitHub, LinkedIn) + a search field at the top that opens/filters the existing search. Focus trap, Esc closes, closes on navigation, reduced-motion safe. Labels from `src/content/site.ts`.

## Part 2 — Smart navbar (Alif's exact behaviour)
- Never disappears completely.
- **Scroll down** → it shrinks to a **slim bar** (≈44–52px: small logo mark, links/Menu/Search compact) so the screen feels bigger.
- **Scroll up** → it smoothly returns to full size.
- At the top of the page → full size. Always readable (AA) over light and dark sections. Smooth (transform/height via CSS transition, no jank).

## Part 3 — The Steno hero scroll (Alif's favourite animation — do it properly)
**IMPORTANT correction from Alif (overrides task 20 Part 7 and the bullet about growing below):** the big hero photo must NOT grow / go full-bleed on scroll. Keep the hero photo panel exactly at its original size — inset with page margins and rounded corners, as before task 20. Remove the expansion. Keep only: blur/desaturate → sharp, stripes drifting, gentle parallax (≤ 40px). The "travel and grow" motion applies only to the small floating photo card, never to the hero photo.
Reference: https://www.steno.ai first screen. Behaviour Alif describes and wants:
- As you scroll down from the hero, the **hero image travels to the left side and grows large** (scrubbed, smooth).
- A **photo card that sits on top** (floating card in the hero) **moves down and joins a horizontal row of other photo cards**, becoming the first card of that row.
- That row then **scrolls sideways** as you keep scrolling while the pointer is over it (see Part 4), with cards sliding in.
- Blur/desaturate → sharp on the hero image as it grows. Smooth 60fps (transform/opacity/filter only, GSAP ScrollTrigger scrub, `will-change`). Mobile: simplified (image grows + sharpens, card drops into a swipeable row). Reduced motion: final layout, no motion. No JS: readable static layout.
Use demo images where needed (local files, `// DEMO`).

## Part 4 — Wheel-sideways in every horizontal area
Create ONE shared hook/component (e.g. `useHorizontalWheel`) used by **all** horizontal areas: Home selected-work row (currently needs manual sideways scrolling — fix), the Part 3 card row, testimonials, highlights rows, travel book (keep its smooth inertia from task 20). Rule: pointer inside the area → vertical wheel moves it sideways smoothly (inertia); at the ends → passes through to the page; outside → normal page scroll. Drag + touch + keyboard keep working.

## Part 5 — Less whitespace (site-wide, About me first)
- About me: Education, Skills, Languages, Interests currently each take a huge mostly-empty section. Merge Skills + Languages + Interests into **one compact bento grid** (mixed card sizes, small demo images/icons); put Education timeline beside Highlights on desktop (2 columns). Cut vertical gaps.
- Site-wide: reduce section padding (~40%), tighten heading→content gaps, remove empty tails. Check every page at 1440 and 390.

## Part 6 — Footer
Keep the new grouped footer, but give the column titles more space/size consistency and align columns to a proper grid (they look cramped). Mobile: 2-column grid.
