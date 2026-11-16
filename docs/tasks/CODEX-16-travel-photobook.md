# Codex task 16 — Travel photo-book (horizontal scroll) + /travel page

Agent: Codex **web/cloud** (repo checked out at main) · Model: GPT-6.1 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).

Context: Alif loves travelling (across Bangladesh, talking to people he meets). He wants a **photo-book** on his personal site: as you scroll down, the section pins and the photos move **sideways** — animated photo frames (polaroid / book-page feel) with captions and short text sliding in. Design language: `docs/DESIGN.md` (cream, Instrument Serif, Inter, hairlines, soft photo reveal). Another agent (Puku) is editing existing pages/components now, so build it **self-contained**; wiring into About me happens later.

## Run order (do exactly this)
1. **Sync:** start on latest `main`. When done, push your branch (Alif or Claude opens the PR).
2. **Read fully:** this file → `AGENTS.md` → `docs/DESIGN.md` → `src/components/motion/` + `src/lib/gsap.ts` (read only, reuse them) → `src/features/` (see conventions).
3. **Plan first:** list Parts 1–5 and files; check "Do NOT edit".
4. **Execute Parts 1–5**, commit after each (`Part N: <name>`).
5. **Verify:** `pnpm check` + `pnpm test:e2e` pass. PR title: "Task 16: Travel photo-book + /travel page".
6. **Report** to `docs/reports/CODEX-16-report.md` (commit it; also final message): `DONE / check / e2e / Parts / Wiring needed (for Claude) / Notes (max 5 lines)`.

## Do NOT edit
Existing files in `src/app/**` (except `src/app/sitemap.ts`), `src/components/**`, `src/lib/**`, `globals.css`, `src/content/site.ts`, `schema.ts`, `projects.ts`. New files only, in `src/features/travel/`, `src/content/travel.ts`, `src/content/schemas/travel.ts`, `src/app/travel/`.

## Part 1 — Content
`src/content/travel.ts` + Zod schema: trips `{ slug, place, region, date (month/year), title, story (2–4 sentences), photos: image[] (1–3), people?: string (someone he met), tags }`. 8 DEMO trips across Bangladesh (e.g. Sylhet tea gardens, Sundarbans, Cox's Bazar, Bandarban hills, Sreemangal, Rajshahi, Kuakata, Jhenaidah home) with `https://picsum.photos/seed/<slug>-<n>/1200/900` photos, marked `// DEMO`.

## Part 2 — `PhotoBook` component (the core)
`src/features/travel/PhotoBook.tsx` (client):
- Desktop (pointer: fine, width ≥ 900px): GSAP ScrollTrigger **pins** the section and translates a horizontal track as the user scrolls vertically (scrub). Each trip = a "page": 1–3 photos in tilted frames (white border, soft shadow, slight random rotation ±3°, tape/corner details in CSS), place + date label, serif title, story text.
- As each page enters: photos un-blur/saturate (like PhotoReveal), rotate into place, captions slide up with stagger; a thin progress bar + "03 / 08" counter at the bottom.
- Mobile / touch: native horizontal scroll-snap carousel (no pinning), same frames, swipe hint.
- Reduced motion: no pin, plain horizontal scroll-snap list, everything visible.
- No-JS: content readable as a normal list.
- Keyboard: track focusable, ←/→ move between pages; each page is an `<article>` with a heading. Clean up ScrollTrigger on unmount. Lazy-load images except the first page.

## Part 3 — `/travel` page
Hero (serif h1 "Travel" + intro line about why he travels — DEMO) → `PhotoBook` → "Places I've been" grid (all trips as small cards: photo, place, date) → closing line. Page CSS next to it. Metadata + OG via existing patterns (new files only).

## Part 4 — Teaser component for About me (not wired)
`src/features/travel/TravelTeaser.tsx`: compact version (3 latest trips, short horizontal strip + "See all travels" → `/travel`) ready to drop into About me later.

## Part 5 — Tests + docs
- Unit: schema; PhotoBook renders all trips; reduced-motion path has no pin; keyboard navigation.
- E2E: `/travel` loads, all trips visible in reduced-motion project, axe passes, internal links OK; add `/travel` to `src/app/sitemap.ts` and the axe/link specs.
- Add Task 16 to `docs/ROADMAP.md` (tick). Report must list wiring needed (nav link "Travel", TravelTeaser in About me).
