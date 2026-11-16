# Pookoo master task 1 — Motion, polish, brand mark, hero card

Read this whole file first, then `AGENTS.md` and `docs/DESIGN.md` (all of it).
Work on branch `pookoo-1` from the **latest main** (`git pull` first — other agents merge often).
This is one long task. Do the parts in order, commit after each part, open ONE PR at the end.

## How to work
Use your installed skills heavily — check your skills list first. At minimum:
- `frontend-design` for every visual/animation decision (match DESIGN.md, feel premium like steno.ai).
- `test-driven-development` before wiring each feature.
- `systematic-debugging` whenever a test/build fails.
- `verification-before-completion` before claiming any part is done (run the commands, show results).
- `requesting-code-review` on your own diff before opening the PR.
- Any installed performance / accessibility / Lighthouse / GSAP / Next.js skill.

Global rules: everything respects `prefers-reduced-motion` (final state shown, no motion); content is visible without JS (initial states set from JS only); clean up GSAP/ScrollTrigger on unmount; keep client JS small; all copy lives in `src/content/` (new fields allowed, don't rewrite existing copy).

## Part 1 — Wire animations (ROADMAP Task 8)
Use the existing components in `src/components/motion/` and `src/lib/` exactly as DESIGN.md "Animations" describes:
- Layout: `SmoothScroll` around the app; `IntroOverlay` (word "Alif") on Home only; Header uses `useHideOnScroll`.
- Home: `HeroStripes` over the hero photo panel; `PhotoReveal` on the hero photo; `Reveal` on section headings/paragraphs; `BackgroundShift` on "How I work"; `StaggerIn` on the selected-work cards.
- About me: `PhotoReveal` on all photos/placeholders, `Reveal` on story text.
- Approach: `Reveal` on each numbered step. Work list: `HoverPreview` on rows. Case study: `PhotoReveal` on images, `Reveal` on sections.
- Links: underline grows from left on hover (CSS).
- Same for any newer pages/sections that exist on main when you start (Writing, Now, Highlights, etc.).

## Part 2 — Brand mark
- Replace the plain "© Built by Alif" with a logo: small serif monogram "A" in a circle + "Built by Alif" text that slides/rotates on hover. Always visible top-left.
- On Home it smooth-scrolls to top (Lenis if active); elsewhere it links to "/".
- Logo text + initial come from `src/content/site.ts`. Add `app/icon.tsx` (favicon) from the same monogram.

## Part 3 — Hero right column (the empty space next to the headline)
Desktop: right column; mobile: stacks below the text.
- Steno-style floating **status card**: avatar, name, green "Available for new projects" dot, live local time in Dhaka, "Currently building: …" line, 3 stack chips. All text from `site.ts`.
- Behind/under it: a small animated **SVG architecture diagram** (POS → Sync → Cloud DB → Dashboard boxes, dots travelling along the lines) — it says "systems first". Pure SVG + GSAP, paused off-screen, static under reduced motion.
- Card and diagram float in after the headline.

## Part 4 — Make it feel like steno.ai
Open https://www.steno.ai and compare page by page. Steno's feel: warm cream, elegant serif, big soft photos that sharpen on scroll, a dark section with stacked steps, cards sliding in, generous spacing, nothing static. List in the PR every place ours still feels flat; fix the most important ones (spacing, scale, transitions, section rhythm, hover states).

## Part 5 — Performance + accessibility (ROADMAP Task 9)
- Motion code only where used; no GSAP on the server.
- Lighthouse mobile targets: Performance ≥ 90, Accessibility ≥ 95 — hero image sizes/priority, font preload, no CLS, contrast, focus styles, landmarks, alt text.
- Check every page at 375px and 1440px; fix layout bugs.

## Finish
- Tick Tasks 8 and 9 in `docs/ROADMAP.md`.
- `pnpm check` and `pnpm test:e2e` must pass (show output).
- Push and open ONE PR titled "Pookoo 1: animations, brand mark, hero card, polish". PR body: what changed per part + the "still flat" list.
