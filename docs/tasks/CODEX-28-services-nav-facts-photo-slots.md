# Codex task 28 — Services nav, confirmed facts, WhatsApp, photo slots, Home speed

Agent: Codex **web/cloud** · Model: GPT-6.2 Sol · Reasoning: Medium · Orchestrator: Claude (follow exactly).
**Start from branch `codex-27`** (PR #19, not merged yet): `git fetch origin && git checkout -b codex-28 origin/codex-27`. Read `docs/reports/CODEX-27-report.md` first — keep everything it did, including the last commit (intro now plays from first paint via CSS; nav label "Services").
**Do NOT merge into main.** Push branch `codex-28` only. Don't stop to ask; record decisions.

## Run order
1. Read: this file → `AGENTS.md` → `docs/DESIGN.md` → `docs/reports/CODEX-27-report.md` → header/menu/footer, `src/content/site.ts`, `src/content/resume.ts`, `/about`, `/uses`, `/contact`, Alez case study content.
2. Execute Parts 1–6 in order; commit after each (`Part N: <name>`).
3. Verify: `pnpm check` zero warnings; full `pnpm test:e2e` twice, 0 failures; axe 0 serious/critical both themes; Lighthouse mobile `/`, `/about`, `/contact` (3 runs each, report every run + median; target ≥ 90 / ≥ 95). Screenshots 390 + 1440 (dark + light) of the header dropdown, About education, Contact (WhatsApp + CV), one photo slot → `docs/reports/codex-28/`.
4. **Report:** `docs/reports/CODEX-28-report.md` (commit + push): `DONE / check / e2e ×2 / axe / Lighthouse (all runs) / Parts / Decisions / Screenshots`. Final chat message only: `DONE codex-28 — report at docs/reports/CODEX-28-report.md`.

## Part 1 — Nav: "Services" hub without a duplicate
The top nav item is now labelled **Services**, and its dropdown also contains a second "Services" link — confusing. Fix:
- Top item **Services** links to `/services`.
- Dropdown: **Projects (`/work`) · Approach · Lab demos · Estimate a project** — no duplicate Services entry.
- The top item shows as current (`aria-current="page"` or an active style) on `/services`, `/work`, `/work/*`, `/approach`, `/approach/*`, `/lab`, `/estimate`.
- In-page tabs on those pages and the drawer group (label "Services") list: Services, Projects, Approach, Lab demos, Estimate — in that order.
- Keep hover + keyboard behaviour from CODEX-27. Update unit + e2e tests.

## Part 2 — Confirmed facts (Alif, 2026-11-23) — content files only
- Education years: **SSC 2022** (Central Laboratory School & College), **HSC 2024** (Dhaka Commerce College). Show on About education and in the CV (`src/content/resume.ts`); regenerate `public/documents/alif-cv.pdf` the same way CODEX-27 did.
- Laptop (Uses): Lenovo Legion 5 — Ryzen 7 8745H, **RTX 4060 8GB**, 16GB DDR5-5600, **1TB SSD**. Remove any "confirm"/TODO markers on these.
- Client brand spelling: **Alez** (correct as is).
- Md. Asaduzzaman's title: **Managing Director**. The testimonial stays **hidden** (still waiting for his approval) — only fix the title in the draft.
- Don't invent anything else.

## Part 3 — WhatsApp button
Keep the WhatsApp button. Number **+8801629889764** → link `https://wa.me/8801629889764`, defined once in `src/content/site.ts`. Visible on Contact and in the footer/floating spot that already exists; accessible name "WhatsApp". This is the only place the phone number may appear.

## Part 4 — Photo slots Alif fills himself
Alif will upload real photos later by replacing files — no code change from him.
- Every image spot on the site (profile/portrait, About, education, travel places, Alez project, work setup, etc.) gets **one fixed file path** in `src/content/` pointing to `public/images/slots/<slot-name>.jpg`.
- Ship a neutral, good-looking placeholder at each path (same size/ratio the layout needs; simple tone + small label like "Photo coming soon" from content). Existing real images stay as they are.
- Create `docs/PHOTO-SLOTS.md`: a table — slot name · page · file path · size/ratio (e.g. 1600×1000, 16:10) · what photo to put. Alif replaces a file with the same name → pushed → live.
- `next/image` with explicit width/height from content; no layout shift when a real photo replaces a placeholder of the same size.

## Part 5 — Demo text stays, clearly listed
Hackathons, mission/vision and Approach step texts stay **demo** for now. Make sure each is marked `// DEMO` in content, and add a section "Text to replace" to `docs/PHOTO-SLOTS.md` listing each demo item with its file + field name.

## Part 6 — Home speed
CODEX-27 Home Lighthouse runs were 63 / 93 / 91. Find what costs the most on Home (client JS, travel strip images, dots canvas start, fonts) and cut it so **every** Home run is ≥ 90 (not just the median). Lazy-load below-the-fold images, keep the canvas starting on idle, keep client components small. The first-visit intro must still play immediately. Record before/after numbers.
