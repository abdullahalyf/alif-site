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

### Session 1 follow-up (Alif feedback, 02:37)
- Dots ~2× faster (drift 9→17 px/s), more dots (60–120 desktop, 30–55 mobile), ~22% "prominent" dots (bigger, full opacity) among fainter ones, canvas opacity 0.22→0.5.
- `.tint-a`, `.tint-b`, `.band-surface` are now 62% translucent so dots show through every section (dark `night` sections and the footer stay solid).

## Session 2 — facts & links ✅
- `site.ts`: Now (5th sem, IIT Bombay Dec 31 2026–~May 31 2027, paper second author *submitted*), achievements (2 DEMO ones removed, paper added), education (DIU, Dhaka Commerce College HSC 5.00, Central Laboratory School & College SSC 5.00 + Talent-pool scholarship line), languages (Hindi → Conversational), about (short, professional), story chapters 1–2 and 4 (no Savar), real stats, availability "Available for work" + `availability.offers` (shown on Contact).
- Home: small "Currently" line under the About teaser → links to /now.
- Uses: Legion 5 specs (TODO confirm GPU/SSD); invented monitor/productivity items removed. Resume: invented experience removed.
- TONE RULE: phone number no longer shown as text (button says "Message on WhatsApp"; the wa.me link still contains the number), Savar removed, Ronaldo line removed.
- TODO(alif): education start/end years; confirm Legion GPU/SSD; keep or drop the WhatsApp button.
