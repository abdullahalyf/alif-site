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

## Session 3 — Alez POS case study ✅ (hackathons: waiting for data)
- Alez case study rewritten truthfully: client "A multi-branch boba tea brand in Dhaka"; live in **3 branches**, built to scale to **9**, adding a branch = configuration. What the client gets listed first: in-shop POS, online access, central control.
- Removed unverified claims (10+ branches, "full day offline", "~$30/month", invented timeline weeks). Technical solution bullets (Electron/SQLite sync, RLS, recipe inventory) kept as they were — TODO(alif): confirm they match what is deployed.
- Testimonial: Asad's draft added with `published: false`; the Home "Working together" section renders nothing until it is `true`. The three fictional DEMO testimonials are gone. Schema: `testimonials[].published` (optional), min(2) removed.
- Hackathons: new `hackathons` array (empty) + `Hackathons` component on /work, hidden while empty (tested).
- Blocked: the PC folder `Desktop\portfolio-content` could not be read (folder-access prompt was denied), so `08b-hackathons/links.txt` is unread.
- e2e specs updated (demo-content, menu-scroll); demo-content passes locally.

## Session 4 — real images ⛔ blocked (no photo access)
- Not done: converting photos from `C:\Users\Abdullah Alif\Desktop\portfolio-content` to WebP. The folder-access request was denied, so no photo was read, converted or replaced. Nothing was guessed or changed.
- Ready when access exists: pipeline `pnpm add:image <file> <name>` (JPEG/PNG, max 2400px). Note: Session 4 asks for WebP ≤200 KB in `public/images/<section>/`; the repo script outputs JPEG — I would use `sharp` directly for WebP.
- `pnpm demo:list` still reports 52 DEMO markers. Image-related ones left as-is with their `// DEMO` comments:
  - `site.ts`: story chapters 1–4 (`alif-story-1…4`), hero side photo (`alif-hero-side.jpg`), education photos (3), `heroPhotos` (4 travel placeholders), `demoContent.interestsPhoto`.
  - `projects.ts`: demo images for Alez POS (`pos-overview`, `pos-detail`) and the research project; 5 fictional demo projects.
  - `travel.ts`: all journeys use seeded placeholder photos and illustrative copy.
- Folders to use when access is granted: 01-profile, 03-school, 04-college, 05-university-diu, 06-journey, 07-travel (bangladesh/*, international/malaysia, bangladesh-travel-map.png), 08-projects/alez-pos, 09-work-setup. Skip 02b-childhood-jessore.

### Alif feedback round 2 (02:44)
- Dots faster again (drift 27 px/s, max 200), and now also inside the dark "How I work" panel and the footer (`BackgroundDots variant="night"`, light dots, paused when off-screen).
- Hero photo blur: weaker (10px) and fully sharp once the panel top reaches ~66% of the viewport (was 18%).
- Copy protection: `user-select: none` site-wide (inputs/textarea still work), `CopyGuard` blocks copy/cut/select/drag and the image right-click menu. Note: this stops casual copying only — screenshots, view-source or disabling JS still work; no website can fully prevent that.

## Session 5 — voice + final check ✅ (voice waits for text)
- About: Mission & vision block added, hidden while `aboutContent.missionVision` is empty (TODO(alif)). Opinion posts not written — no topics/text yet.
- Lighthouse mobile (local prod build, 1 run): Home 95/100/100/100, About 95/100/100/100, Work 97/100/100/100 (Perf/A11y/BP/SEO). Targets met.

## Questions for Alif (all in one place)
1. Folder access to `Desktop\portfolio-content` (photos + `08b-hackathons/links.txt`) — the request was denied; please approve or use "Add folder" in the desktop app.
2. Brand name spelling (Yucha / Roomcha?) and Asad's exact title; approval to publish his testimonial.
3. Hackathon list (name, role, result, GitHub, live link).
4. Mission & vision (1–2 sentences each) and opinion post topics.
5. Education years; Legion 5 GPU/SSD confirm; keep the WhatsApp button (its link contains your number)?
6. Alez tech bullets (Electron/SQLite sync, RLS, recipe inventory) — still accurate?

### Alif feedback round 3 (02:50–02:56)
- Intro: a pre-paint inline script covers Home before first paint, so the page no longer flashes before "Hello…Alif". Plays **once per visit**, only when the visit starts on Home (never on return to Home or reload). e2e spec updated.
- Scroll: each page remembers its own scroll position in the tab; going to a new page starts at the top; clicking the link of the page you are on scrolls smoothly to the top.
- Writing: post-title underline is a thin 1px muted rule that draws in left → right on load (static under reduced motion).
- Approach: every step has a "Read more" link (Home dark panel + /approach) to a new page `/approach/<slug>`. `site.approach[].details` is empty — TODO(alif): send the full text for each of the 4 steps.
