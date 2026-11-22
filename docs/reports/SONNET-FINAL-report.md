# SONNET-FINAL report

Branch `sonnet-final` · one PR · updated after each session.

## Session 1 — background animation ✅
Done
- `src/lib/dots.ts` (density 40–80 desktop / 24–40 mobile, drift + cursor attraction with eased release, link alpha, resize) + `dots.test.ts`.
- `src/components/BackgroundDots.tsx` (Canvas 2D, fixed, `pointer-events:none`, `aria-hidden`, DPR cap 2, starts on idle, pauses when tab hidden, touch = drift only, reduced-motion = single static frame, theme colour via `color: var(--ink)`), mounted once in `layout.tsx`; `.bg-dots` style (opacity 0.22) in `globals.css`.
- Checked in headless Chromium: canvas paints in light/dark/mobile, static under reduced motion, no console errors. `pnpm check` passes.
Notes
- AGENTS.md said "no canvas"; added a one-line exception for `BackgroundDots` per Alif's spec.
- Sections with their own solid background (night panel, footer, cards) cover the dots by design.
