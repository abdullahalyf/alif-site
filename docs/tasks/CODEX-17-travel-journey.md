# Codex task 17 — Travel as a journey: animated route map + place colours + trip pages (long task)

Agent: Codex **web/cloud** (repo checked out at main) · Model: GPT-6.1 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Expected: long (several hours is fine). Alif is away — don't stop to ask; make sensible choices and note them in the report.

Alif's feedback on `/travel`: "The photo-book is fine, but the background is too plain." He chose **two** ideas, together:
1. **Route map** — a faint map of Bangladesh behind the book; as pages turn, a dotted route draws from one place to the next and the current place's pin glows. Reference (open it and study it if your network allows; otherwise follow this description): Codrops "Storytelling Map" https://tympanus.net/Development/StorytellingMap/ — the travel route draws on an SVG map as you scroll and photos appear at the matching points.
2. **Place colours** — background tint changes per trip (Sylhet tea-green, Cox's Bazar sea-blue, Sundarbans deep green, Bandarban misty blue-grey, Rajshahi mango-gold, Kuakata sunset-orange, Sreemangal leaf-green, Jhenaidah warm earth) with that trip's photo, heavily blurred, as an ambient layer.

## Run order (do exactly this)
1. **Sync:** start on latest `main`. When done, commit everything and push your branch.
2. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `src/features/travel/*` → `src/content/travel.ts` → `src/lib/gsap.ts`.
3. **Plan:** list Parts 1–7 + files; check "Do NOT edit".
4. **Execute Parts 1–7 in order**, commit after each (`Part N: <name>`).
5. **Verify:** `pnpm check` + `pnpm test:e2e` pass; Lighthouse mobile on `/travel` Performance ≥ 90, Accessibility ≥ 95 (paste numbers). PR title: "Task 17: Travel journey — route map, place colours, trip pages".
6. **Report** to `docs/reports/CODEX-17-report.md` (commit; also final message): `DONE / check / e2e / Lighthouse / Parts / Decisions I made / Notes`.

## Do NOT edit
Puku is changing global styles and shared pages right now. Only touch: `src/features/travel/**`, `src/content/travel.ts`, `src/content/schemas/travel.ts`, `src/app/travel/**`, `public/images/travel/**`, `src/app/sitemap.ts`, `e2e/**` (travel specs + route lists), `docs/**`.

## Part 1 — Map data
- Add `lat`/`lng` + `color` (hex, AA-checked against text) to every trip in the schema/content.
- Create a simplified **Bangladesh outline SVG** (country border + optional major rivers as thin lines) as a React component in `src/features/travel/map/`. If you can't download public-domain boundary data (Natural Earth is public domain), hand-build a simplified outline from known coordinates — accuracy at "recognisable shape" level is enough. Include a projection helper (lat/lng → SVG x/y) with unit tests.

## Part 2 — Route map layer
- Fixed/sticky map layer behind the PhotoBook on desktop (low opacity, line-art style, cream/ink colours).
- Pins for all trips; the **active pin pulses**; visited pins filled, upcoming outlined.
- Dotted/dashed route path through trips in order; it **draws progressively** (stroke-dashoffset) synced to the book's progress (scrubbed with the pinned scroll; on mobile synced to the snap index).
- A small photo thumbnail pops out at the active pin (like the Codrops demo).
- Clicking a pin jumps the book to that trip (keyboard accessible).

## Part 3 — Place colours + ambient layer
- Background tint transitions smoothly to the active trip's colour (CSS variable animated via GSAP); text colours stay AA.
- Behind everything: the active trip's first photo, heavily blurred (≈40px) and low-opacity, crossfading between trips.
- Subtle paper-grain overlay (CSS/SVG noise, tiny file).

## Part 4 — Trip pages `/travel/[slug]`
For each trip: hero with big photo (PhotoReveal-style sharpen), place/date/region, story, people met, tags, photo gallery (masonry, lightbox with keyboard + swipe), a mini map with that place's pin, prev/next trip. `generateStaticParams`, metadata, OG image (reuse existing OG pattern with fs fonts). PhotoBook pages link to their trip page.

## Part 5 — Travel stats + index
On `/travel` above the book: "At a glance" strip — trips, districts visited, total km of route (computed from coordinates, haversine), favourite season (DEMO). Below the book: the existing grid becomes a filterable grid (by region/tag) with animated reflow.

## Part 6 — Demo images, local
Download demo photos once into `public/images/travel/<slug>/` (from picsum seeded URLs if your network allows; otherwise keep the remote picsum URLs). ≤ 1600px wide, JPEG quality ~75. Mark them `// DEMO` in content.

## Part 7 — Motion rules + tests
- Reduced motion: no pin, no drawing — full route shown, colours switch instantly, no ambient crossfade. No-JS: map shows full route statically, all content readable.
- Pause map animations when off-screen; no layout shift; keep JS lean (map is SVG, no map libraries).
- Unit tests: projection, distance calc, schema. E2E: route progress follows page changes, pin click jumps, trip pages 200 + axe, reduced-motion variant.
- Add Task 17 to `docs/ROADMAP.md` (tick).
