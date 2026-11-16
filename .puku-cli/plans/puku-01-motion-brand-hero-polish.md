# PUKU-01 — Motion, polish, brand mark, hero card

Branch: `puku-1` (from current `main` @ `3dc3f34`).

## Part 1 — Wire animations (ROADMAP Task 8)
Existing motion library in `src/components/motion/` is complete; the job is to
mount it on every page per DESIGN.md "Animations".

| Area | Work | Files |
|---|---|---|
| Layout | `SmoothScroll` already wraps the app | `src/app/layout.tsx` |
| Home | `IntroOverlay` already present; hero photo `PhotoReveal`, `HeroStripes`, `Reveal` on copy — done | `src/app/page.tsx`, `src/components/home/hero.tsx` |
| Home | `BackgroundShift` on How I work — done | `src/components/home/how-i-work.tsx` |
| Home | `StaggerIn` on selected-work cards — done via `WorkCarousel` | `src/components/home/work-carousel.tsx` |
| Home | `Reveal` on services list, about teaser, demo sections — done | `src/components/home/services.tsx`, `about-teaser.tsx`, `src/components/demo/sections.tsx` |
| Header | `useHideOnScroll` — done | `src/components/header.tsx` |
| About | `PhotoReveal` on photo + story chapters, `Reveal` on prose — done | `src/app/about/page.tsx`, `src/components/story-chapter.tsx` |
| Approach | **TODO** — `Reveal` on each numbered step | `src/app/approach/page.tsx` |
| Work list | **TODO** — `HoverPreview` on rows (currently CSS-only `.work-preview`) | `src/app/work/page.tsx` |
| Case study | **TODO** — `PhotoReveal` on images (via `ProjectMedia` — done), `Reveal` on sections | `src/app/work/[slug]/page.tsx` |
| Writing / Now | **TODO** — `Reveal` on post list + headings | `src/app/writing/page.tsx`, `src/app/writing/[slug]/page.tsx`, `src/app/now/page.tsx` |
| Links | Underline grows from left — done in `globals.css` | `src/app/globals.css` |

Skills: `test-driven-development`, `frontend-design`.

## Part 2 — Brand mark
- New `src/components/brand-mark.tsx` — serif monogram "A" in a circle + "Built by Alif"
  text that slides/rotates on hover. Client component (needs Lenis + pathname).
- `site.ts`: add `logoInitial: "A"`, `logoText: "Built by Alif"` (replaces `© Built by Alif`).
- Home → smooth-scrolls to top via Lenis; elsewhere → `<Link href="/">`.
- New `src/app/icon.tsx` — favicon from the same monogram (ImageResponse).

Skills: `frontend-design`, `test-driven-development`.

## Part 3 — Hero right column
- `site.ts`: add `statusCard` block (avatar, name, availability, timezone, building, 3 chips)
  and `heroSide` photo (`https://picsum.photos/seed/alif-hero-side/900/1100`, `// DEMO` comment).
- New `src/components/home/hero-side.tsx` — server component composing:
  - `PhotoReveal` around the side photo (radius 24px)
  - `StatusCard` floating over its **bottom-left**
  - `SystemDiagram` (new client component, `src/components/home/system-diagram.tsx`) over its **top-right**
- New `src/components/home/status-card.tsx` — client component; live Dhaka time via `Intl.DateTimeFormat`
  with `Asia/Dhaka` tz; green availability dot.
- New `src/components/home/system-diagram.tsx` — pure SVG (POS → Sync → Cloud DB → Dashboard) with
  dots travelling along the lines; GSAP; paused off-screen (`ScrollTrigger` toggleActions);
  static under reduced motion.
- Mobile: photo first, card below it.

Skills: `frontend-design`, `test-driven-development`, GSAP knowledge.

## Part 4 — Steno.ai feel
Compare against steno.ai (fetched). Fix the most impactful flat spots: section rhythm,
scale, hover states, transitions. Record every remaining flat spot for the PR body.

## Part 5 — Performance + accessibility
- No GSAP on the server; motion code only where used.
- Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95.
- Check every page at 375px and 1440px.

## Finish
- Tick ROADMAP Tasks 8 and 9.
- `pnpm check` + `pnpm test:e2e` green.
- One PR: "Puku 1: animations, brand mark, hero card, polish".
- `docs/reports/PUKU-01-report.md` in the exact required format.
