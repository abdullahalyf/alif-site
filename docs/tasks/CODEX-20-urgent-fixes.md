# Codex task 20 — URGENT fixes from Alif's review (travel smoothness, map, header, footer, mobile hero, dark section)

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Time matters — do these well but fast. **Do NOT merge into main**; push branch `codex-20-urgent` only.
Another Codex chat runs task 19 in parallel (it avoids header/layout/globals/components/home/about) — you own those this time.

## Run order
1. Fresh checkout of latest `main`, branch `codex-20-urgent`.
2. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `src/features/travel/**` → `src/components/header*`, footer, home hero files, `src/app/globals.css`.
3. Plan Parts 1–6 briefly, then execute in order, commit after each (`Part N: <name>`).
4. Verify: `pnpm check` + `pnpm test:e2e` pass. Test every part at **390px (mobile)** and **1440px** with screenshots saved to `docs/reports/codex-20/` (before/after where relevant).
5. Report to `docs/reports/CODEX-20-report.md` (commit; also final message): `DONE / check / e2e / Parts / screenshots list / Notes`.

## Part 1 — Travel book: buttery-smooth free scroll
Now it feels laggy: the whole block tries to move page-by-page and stutters. Alif wants:
- **Free, smooth, momentum horizontal scrolling** — no snapping page by page. He can stop anywhere (e.g. halfway between two trips) and it stays there.
- Wheel inside the book → smooth sideways movement (lerped/inertial, 60fps, transform-based, `will-change: transform`, no layout thrash, no React re-render per frame). Trackpad horizontal + vertical both work. Mouse drag with inertia. Touch: native momentum scroll, **no** scroll-snap.
- Outside the book the page scrolls vertically as normal (keep that rule). At either end, wheel passes through to the page.
- Progress bar, counter, map route and colours follow the continuous position (interpolated between trips — the route draws smoothly, colours blend).
- Arrow buttons / keys still jump to the next/previous trip with an eased animation.
- Profile it (Chrome performance) — no long tasks while scrolling. Note numbers in the report.

## Part 2 — Better map + International section
- Replace the current Bangladesh map with a **higher-quality, accurate outline** (Natural Earth 1:10m admin-0 or a public-domain detailed source; simplify with a sensible tolerance so it stays light, < 60 KB). Add **division borders** (thin) and major rivers (very thin, optional). Pretty, line-art, on-brand.
- New **International** section on `/travel` (below the national book): first trip **Malaysia** (DEMO text/photos for Kuala Lumpur — mark `// DEMO`). Small world/Asia map with a route Dhaka → Kuala Lumpur (curved line) and trip cards. Content model supports more countries later (`scope: "national" | "international"`, `country`).

## Part 3 — Header: always visible, shrinks on scroll, always readable
- Header stays fixed at the top at ALL times (never scrolls away/hides).
- After ~40px of scroll it becomes **slim** (e.g. 88px → 56px, logo + links smaller, smooth transition), with solid cream background + subtle blur + hairline.
- **Bug (see Alif's screenshot):** over the dark "How I work" section the nav links become nearly invisible (faded text on cream). Nav text must always have AA contrast in every state — fix whatever causes the fade (opacity/clip/reveal animation/blend).

## Part 4 — Dark section transition bug
When scrolling into the dark section the top part looks broken (content behind/over the header, half-faded). Make the transition clean: the dark panel grows/enters without overlapping the header, earlier content stays readable, no flashes. Add an e2e screenshot/axe check mid-transition.

## Part 5 — Mobile hero
On mobile the hero right-side composition collapses into a single plain photo (Alif: "it becomes just one picture"). On mobile keep the composition: photo with the floating status card overlapping its corner and the mini system diagram (scaled), stacked below the headline. Check 360/390/430px widths. Also review the whole Home page on mobile for overflow, spacing and font sizes.

## Part 6 — Footer links clarity
The bottom links (Travel, Lab, Estimate a project, Résumé, Uses, Now, Writing RSS) are hard to understand. Redesign the footer link area into clear labelled columns, e.g. **Explore** (Work, Services, Approach, About me, Travel), **Resources** (Writing, Résumé, Uses, Now, RSS), **Try** (Lab demos, Estimate a project), **Connect** (Email, WhatsApp, GitHub, LinkedIn). Readable size, good spacing, hover states, mobile accordion or 2-column grid. All labels in `src/content/site.ts`.

## Part 7 — The Steno.ai animation (still missing — Alif's #1 request)
Study https://www.steno.ai (open it if your network allows; otherwise follow this): warm cream page, big serif headline whose lines rise in word by word, and a **large photo panel below the hero that starts inset, blurred (~16px), desaturated and slightly faded, then on scroll expands toward full width, its corner radius shrinks and it sharpens to full colour** (scrubbed with scroll). Diagonal hairline stripes drift over it. Cards slide in as they enter. Implement this on Home with GSAP ScrollTrigger (transform/filter only, smooth 60fps), mobile-friendly (lighter version: fade + sharpen, no expansion beyond the screen). Reduced motion = final sharp state, no motion; content visible without JS.
