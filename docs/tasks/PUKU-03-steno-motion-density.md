# Puku task 03 — Steno-level motion, less whitespace, more interaction

Agent: Puku (Opus) · Folder: `E:\Projects\alif-site` · Orchestrator: Claude (follow exactly).
Alif's verdict on the live site: "Looks good — but too much white space, too static, the Steno animation I asked for is still missing, and the dark transition breaks the Highlights section." This task fixes all of that. Big task — take the time it needs.

## Run order (do exactly this)
1. **Sync:** `git fetch origin && git checkout main && git pull origin main`, then `git checkout -b puku-3`. `pnpm install`.
2. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `src/components/motion/` + `src/lib/gsap.ts`.
3. **Study the reference first (mandatory):** open https://www.steno.ai in a real browser (Playwright headed or your browser tool). Scroll slowly top→bottom at 1440px and 390px. Write down in your plan exactly what moves, when, and how (hero image, text, cards, section transitions, carousels, hover). Save 4–6 screenshots of key moments to `docs/reports/puku-3-steno/` for Claude.
4. **Plan:** list Parts 1–7, files, and which Steno behaviour each part copies.
5. **Execute Parts 1–7 in order**, commit after each (`PUKU-03 Part N: <name>`).
6. **Verify:** `pnpm check` + `pnpm test:e2e` pass; Lighthouse mobile `/` and `/about` Performance ≥ 90, Accessibility ≥ 95 (paste numbers). Push, open ONE PR "Puku 3: Steno motion, density, interaction".
7. **Report** to `docs/reports/PUKU-03-report.md` (commit + PR body): `DONE / check / e2e / Lighthouse / Parts / Notes (max 8 lines)`.
Use your skills heavily (frontend-design, test-driven-development, systematic-debugging, verification-before-completion, requesting-code-review, any GSAP/a11y/perf skill).
All motion: reduced-motion = final state, no pin, no motion; content visible without JS; clean up ScrollTriggers.

## Part 1 — Steno hero (the animation Alif asked for from day one)
Recreate Steno's hero feel on Home:
- On load: headline lines rise word-by-word (masked), intro + buttons follow, status card + side photo float in.
- **Hero photo panel on scroll:** starts as an inset rounded panel, **blurred (≈16px), desaturated and slightly faded**; as you scroll it **expands toward full width, radius shrinks, and it sharpens to full colour** (scrubbed). Diagonal stripes drift. Text above parallaxes up slightly.
- Then match whatever else you observed in Steno's hero (step 3).

## Part 2 — Fix the dark transition (bug)
Now the whole page turns night and earlier content (Highlights) becomes unreadable — first Highlights card is cream with near-invisible text. Replace the page-wide `BackgroundShift` with a Steno-style approach: the "How I work" section is its own **dark rounded panel that grows from inset to full-bleed** as it enters (clip-path/scale), while sections outside it keep their own colours. Every card must keep AA contrast in every state. Add an e2e/axe check for Highlights while the dark section is in view.

## Part 3 — Horizontal scroll for Selected work
Desktop (pointer: fine, ≥ 900px): when the Selected work section reaches the top, **pin it and convert vertical scroll into sideways movement of the cards** (scrubbed), then release. Cards: slight scale/tilt as they pass centre, image hover zoom. Progress indicator. Touch/mobile: native horizontal swipe with snap. Reduced motion: plain row with arrows. Keyboard: ←/→.

## Part 4 — Less whitespace, everywhere
- Global section rhythm: reduce vertical spacing ~35–40% (e.g. 128px → 80px desktop, 64px mobile); headings closer to their content; no empty tails at section ends.
- **About me** is the worst: make it dense and rich — intro photo + text side by side with a stats/at-a-glance column; Skills, Languages, Interests merged into ONE **bento grid** (mixed card sizes, icons, small demo images); education timeline beside highlights on desktop (2 columns).
- Check every page at 1440 / 1024 / 390 for big empty areas and fix them.

## Part 5 — Demo images where photos are missing
Wherever there's an empty box, placeholder or text-only area that would look better with a photo (story chapters, about bento, services blocks, writing post covers, now page, approach steps), add DEMO images: local files in `public/images/demo/` (download once from picsum.photos with seeded URLs, keep them small: ≤ 1600px, quality ~75). Mark each in content with `// DEMO`. Alif will replace them with real photos.

## Part 6 — More interaction
- Magnetic primary buttons; cards tilt slightly toward the cursor (≤ 4°); image hover zoom inside frames; link underline grow (already) on all text links.
- Stats strip numbers count up; testimonials auto-scroll as a slow marquee (pause on hover/focus).
- A subtle custom cursor dot that grows over links/cards (desktop only, hidden for touch and reduced motion).
- Section labels with a small line that draws in.

## Part 7 — Consistency pass
Same motion vocabulary on every page (Home, About, Services, Approach, Work, case study, Writing, Travel, Contact, Résumé screen view, Uses, Now). Nothing should appear "just sitting there" — but keep it calm, not flashy. Re-check Lighthouse and fix regressions.
