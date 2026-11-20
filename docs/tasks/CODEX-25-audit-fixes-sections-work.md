# Codex task 25 — Audit fixes, richer sections + motion, Work/Services/case studies (long task)

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
Branch: fresh checkout of latest `main` → `codex-25`. **Do NOT merge into main.** Push branch only.
This is a LONG task (several hours is fine). Alif will not check in between — don't stop to ask; decide sensibly, record decisions. Work through every part fully; quality over speed.

This task = Claude's full-site audit (Part A) + design upgrades (Part B) + the whole of `docs/tasks/CODEX-24-work-services-casestudies.md` (Part C). Read that file too.

## Run order
1. Read in order: this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/tasks/CODEX-24-work-services-casestudies.md` → `docs/reports/CODEX-23-report.md` → `src/content/*` → home, about, work, case-study, services, contact, lab pages + `src/components/motion/*` + `src/lib/gsap.ts`.
2. Write a short plan (parts → files). Then execute A1…A9, B1…B5, C1…C6 in order. Commit after each item (`A3: diagram overflow`, etc.).
3. Verify at the end (all must pass, paste results in the report):
   - `pnpm check` with zero warnings.
   - Full `pnpm test:e2e` **twice**, 0 failures both runs.
   - axe: 0 serious/critical on every route, **light and dark**.
   - Lighthouse mobile (median of 3): `/`, `/about`, `/work`, one case study, `/services` → Performance ≥ 90, Accessibility ≥ 95.
   - Screenshots light + dark at 390px and 1440px of every changed section → `docs/reports/codex-25/` (name them by item, e.g. `A3-diagram-1440-light.png`, before/after where useful).
   - Your own audit pass: horizontal overflow = none, broken images = none, console errors = none, every page has exactly one `h1`, no vertical empty band taller than ~320px without content on any page (write a tiny Playwright script for this and include its output).
4. **Report:** write `docs/reports/CODEX-25-report.md`, commit, push. Format:
   ```
   DONE: codex-25 · branch codex-25
   check: pass/fail · e2e: run1 X/Y/Z · run2 X/Y/Z
   axe: light/dark result · audit script: result
   Lighthouse (median): table
   Items: A1–A9 ✅/❌ · B1–B5 ✅/❌ · C1–C6 ✅/❌ (❌ + reason)
   Decisions: bullet list
   Screenshots: docs/reports/codex-25/
   ```
   Final chat message only: `DONE codex-25 — report at docs/reports/CODEX-25-report.md`.

Global rules (always): all copy/images in `src/content/`; reduced motion = final state, no motion; content visible without JS; transform/opacity/clip only for animation (60fps); AA contrast in both themes; no new libraries; Alif's honest profile (architect who designs, decides with reasons, builds by orchestrating AI agents; does not hand-code React/Next.js/PostgreSQL).

---

## Part A — Fix everything the audit found

**A1 Honesty mismatches.** The hero status card chips say "TypeScript · PostgreSQL · Next.js" and case-study stacks read like hand-coding expertise. Status card chips → "System design · AI agents · Offline-first". Every "stack" list on case studies gets the label **"Built with (via AI agents)"** plus a separate line **"Orchestrated with: Codex, Claude"**. Search all content for remaining expertise claims and align.

**A2 Duplicate photo on Home.** Under the big hero photo, the first card of the small photo row repeats Alif's same portrait. Replace it with a different DEMO photo (local), so no image appears twice on one screen.

**A3 Case-study diagram overflow.** On `/work/multi-branch-pos` (desktop) the system diagram is cut off on the right ("Sync service" half visible). Make the diagram always fit its container: responsive layout (wrap columns / scale with viewBox), and on narrow screens a contained horizontal scroll with visible edge fade + "scroll →" hint. Check every project's diagram at 390/1024/1440.

**A4 Horizontal rows hard-clip.** Milestones, selected work, testimonials, travel notes: the last visible card is cut by the container edge with no hint more exists. Add an edge fade mask on the side(s) with more content, arrow buttons (desktop) and the thin progress bar, using the shared horizontal component. Fade/arrows hide when at the start/end.

**A5 IIT Bombay card repeats itself.** Title and body say the same thing. Title: "Semester exchange at IIT Bombay". Meta: "Spring 2027 · DIU–IIT Bombay MoU". Body: "Nominated by Daffodil International University for a one-semester exchange at IIT Bombay." Keep it the first, visually featured milestone (it's real).

**A6 Mobile hero composition.** At 360–430px the mini system diagram overlaps the status card and photo. Re-layout: photo → status card overlapping the photo's bottom edge → diagram below the card (full width, compact). No overlaps, no clipped text.

**A7 Empty bands.** Remove/fill: `/contact` large empty band after the form (tighten, or add a small "What happens next" 3-step strip + response time); `/lab/access-control` two empty bands (tighten matrix/explanation spacing); `/lab/offline-sync` empty band near the bottom on mobile; About story section — photos sit inside large tan frames with empty areas: make frames hug the images (or fill frames with `object-fit: cover`), keep the Atlas-style stagger.

**A8 "What I do" on Home is a bare 4-line list.** See B2.

**A9 "How I work" dark panel** has a big empty area under the left heading. See B1.

## Part B — Design upgrades (sections + motion)

**B1 "How I work" — Steno sticky stack.** Desktop: left column (label, heading, intro, "Explore my approach") is **sticky** while the right column's steps scroll; each step is a card that **stacks** onto the previous one (slight scale-down + darken of the cards underneath, offset ~16px), number + title + text + small icon. Mobile: normal vertical cards, no sticky. Reduced motion: plain list.

**B2 "What I do" cards.** Replace the list with 4 cards in a 2×2 grid (1 column mobile): icon, title, 2-line description, "Learn more →" to `/services#…`. Hover (desktop): card lifts slightly, icon animates subtly, a small DEMO image reveals on one side. Content in `site.ts`.

**B3 Tools marquee.** A slow, continuous marquee row on Home (after "What I do" or in "How I work"): "Codex · Claude · GitHub · GitHub Actions · Vercel · Supabase · Playwright · SQLite" with a small label "How I build: I design, AI agents implement, I review and test." Pauses on hover/focus; static wrapped list under reduced motion; `aria-hidden` duplicate track.

**B4 Consistent motion vocabulary on every page.** Headings reveal line by line (masked rise), section labels draw their hairline in, paragraphs fade-up, cards stagger in, images simple fade (blur reveal stays ONLY on the Home hero photo). Apply to Home, About, Work, case studies, Services, Approach, Writing (list + post), Travel, Contact, Lab, Estimate, Resume (screen), Uses, Now. Calm timings (0.6–0.9s, stagger 0.06–0.1s). No section should "just sit there", none should feel flashy.

**B5 Section rhythm.** Alternate the soft tinted backgrounds (sage/sand/clay) intentionally on Home and About so sections read as distinct blocks; consistent vertical spacing scale; no orphan sections.

## Part C — Work, Services, case studies
Do **all of** `docs/tasks/CODEX-24-work-services-casestudies.md` Parts 1–6 (C1 = its Part 1 … C6 = its Part 6): case-study depth (timeline, **key decisions & trade-offs**, challenges, metrics, honest role), structured case-study layout with sticky mini-TOC, denser Work index with featured project, richer Services with "Why work with me", honesty consistency, whitespace + dark-mode check.

Finally add Tasks 24 and 25 to `docs/ROADMAP.md` (tick both; note 24 was folded into 25).
