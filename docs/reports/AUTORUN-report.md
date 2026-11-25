# Autorun report (sections 4–8)

Started: 2026-11-25 11:34 Dhaka. Updated after every section.

| Step | Status | Live link |
|---|---|---|
| 0 — fixes + Sections 1–3 | live ✅ (PR #21) | https://alif-site-flame.vercel.app |
| 4 — Work | live ✅ (PR #22) | https://alif-site-flame.vercel.app/work |
| 5 — Services + Estimate + Lab | live ✅ (PR #23) | https://alif-site-flame.vercel.app/services · /estimate · /lab |
| 6 — Contact + /cv | live ✅ (PR #24) | https://alif-site-flame.vercel.app/contact · /cv |
| 7 — Task 29 leftovers | live ✅ (PR #25) | https://alif-site-flame.vercel.app/about · /writing · /travel · /now |
| 8 — Extras | live ✅ (PR #26) | https://alif-site-flame.vercel.app/ (favicon, share image, 404) |

## Step 0 — live ✅
Drafts published (no draft labels), POS covers differ, lone "Now" link removed, nav = Home · Services · Writing · About me · Contact (desktop, drawer, footer), nav tests updated. Verified live: pages, RSS (13 items), search index, sitemap.

## Section 4 — Work
**Changed**
- `/work`: chips (All · Client work · Hackathons · University · Research) instead of the select; bigger cards with 2–4 images; image → lightbox, card/title → case study (featured Alez card bug fixed).
- 8 real projects replace the 5 demo ones: Alez POS (featured), CloudSentinel, Jomi Barta, OptiNode, Personal websites for friends (Yousha, Shruty, Ratul), Campus Navigator, Console e-commerce, Research paper.
- Alez case study: 3 titled galleries (In-shop POS software · Online management portal · POS output) from cropped screenshots (no taskbar; local file path and phone number blurred); captions note test data; virtual-printer fact added.
- Client sites case study: one gallery per person (Home → About → rest) from the repo screenshots, blank/sticky-header areas and contact sections cropped; README deleted; live links.
- Jomi Barta screenshots taken from the live site (hero + five checks).
- Real hackathon list on `/work` (6 rows from CONTENT-NOTES).
- Schema: categories, optional `galleries`, image `caption`, optional `year`/`problem`/`builtWith`; `demo` removed from projects/images; architecture diagrams only for Alez and Research (no more "DEMO —" diagrams); demo slot images deleted.

**Decisions taken**
- Kept the slug `multi-branch-pos` so existing URLs keep working; title is now "Alez POS".
- Client sites category = "Client work"; role "Designer and developer".
- Campus Navigator and Console e-commerce have no images and no year (nothing was supplied); cards are text-only.
- Research card uses the credited stock road photo, captioned "Stock photo, not from the project".
- "Orchestrated with Codex, Claude" now shows only on Alez.

**Needs Alif**
- Confirm your role/credit on the three friends' sites, and on OptiNode ("Team member").
- Campus Navigator / Console e-commerce: year, role, stack and 2–4 screenshots.
- Larger copies of the ~200px photos (Jahangirnagar, mirror, Sitakunda, Hatiya, Tangail).
- Asad's approval for the testimonial (still hidden).

**Verified live**: gate at 1440/390 (no broken images, no overflow, one h1, no console errors) on /work, /work/multi-branch-pos, /work/client-sites.
**Screenshots**: `docs/reports/shots/s4/` (d_ = desktop, m_ = mobile).

## Section 5 — Services + Estimate + Lab
**Changed**
- `/services`: 9 service cards (icon, one line, typical BDT range, typical timeline, "Estimate this" link); "DEMO numbers" badge gone; price wording in models/FAQ says "typical range, final quote after a short call".
- `/estimate`: 9 project-type chips matching the services; ranges in taka from your plan; Custom shows "Quote after a short call"; range notice; summary/email/WhatsApp text updated.
- `/lab`: honest labels: "Simulation with made-up orders and numbers, not connected to a real shop" / "Simulation with an example policy"; "Reset the simulation".

**Decisions taken**
- POS monthly rent shown as "or rent it monthly" (no rent price invented).
- Calculator rounds to ৳500; urgency/growth adjust the range.

**Verified live**: gate 1440/390 on /services, /estimate, /lab, /lab/offline-sync. Screenshots: `docs/reports/shots/s5/`.

**Needs Alif**
- Confirm the BDT ranges and timelines are what you want public.
- Monthly rent price for POS (not set).

## Section 6 — Contact + /cv
**Changed**
- `/contact` is contact-only: big heading, availability badge, 5 cards (Email, WhatsApp, LinkedIn, GitHub, Dhaka), brief form (budget now in ৳, project types match the 9 services), "what happens next" steps, services I take on, link to the CV. The old embedded CV is gone.
- `/cv`: designed web resume (sticky sidebar with contact, Download PDF, Print, section links; timeline-style entries) built from your CV PDF; print stylesheet.
- `/resume` redirects (308) to `/cv`. Hero "Download CV", About card, footer/menu and Contact all point to `/cv`.
- `public/documents/alif-cv.pdf` regenerated from the `/cv` print view (3 pages).

**Decisions taken**
- The public PDF/web CV leaves out date of birth, DIU registration no., DIU email, phone number, "Savar", the "transport community" line, and the references' phone/email ("References and further details on request"). Your original PDF still has them; it is not published.
- Added CloudSentinel, Jomi Barta and OptiNode to the CV (they are not in the old PDF) and wrote "Selected" for IIT Bombay (old PDF said "Nominated").
- Alez is described as "Alez POS and business management system" (PDF said "Alez Business OS").

**Needs Alif**
- Check the CV text (CGPA 3.48 is shown, as in your PDF) and that you are happy with those exclusions.
- Confirm the GitHub link for Campus Navigator (guessed from the repo name pattern in your PDF: `abdullahalyf/campus-navigator`).

**Verified live**: gate 1440/390 on /contact, /cv, /resume, /; PDF has no ID/phone/Savar. Screenshots: `docs/reports/shots/s6/`.

## Section 7 — Task 29 leftovers
**Changed**
- Services dropdown closes on click (already) and now also when the page scrolls.
- About sections nav (About · Writing · Travel · Now) on /about, /writing (and its category pages), /travel, /now.
- Smoother scroll: Lenis lerp 0.14 → 0.09 (desktop only; still off for reduced motion and touch).
- Home performance: hero photo now served as a responsive optimised image (was one 186 KB file for every screen; now ~68 KB on mobile).

**Decisions taken**
- Home service thumbnails stay eager: they are hover previews, lazy loading would delay them.

**Needs Alif**
- Lighthouse mobile for Home measured locally in my sandbox: 82–92, median ≈ 88–91 (it moves a lot between runs; accessibility 100, best-practices 100). I could not reach a reliable 90+. The remaining cost is JavaScript (GSAP/Lenis, ~117 KB) and the many photos. Run PageSpeed on the live link to see the real number; if it is under 90, say so and I will cut the Home animations/photos further.

**Verified live**: gate 1440/390 on /, /about, /writing, /travel, /now; e2e for the new nav and dropdown scroll.

## Section 8 — Extras
**Changed**
- Favicon is now your face (cropped circle) instead of the "A" monogram.
- Share image (OG) = your photo + "Abdullah Alif · Software Systems Architect · Dhaka, Bangladesh".
- Designed 404 page: big 404, short message, four cards (Services, Work, About me, Contact), Back home.
- Vercel Web Analytics added (`@vercel/analytics`, runs only on Vercel).
- Final demo sweep: every one of the 46 sitemap URLs, the search index and RSS contain no DEMO / Photo coming soon / Stockroom / Clinic / Sundarbans / Bandarban / Kuakata / "imagined" text (one legitimate "sample records" in a writing post). Search index and sitemap are generated from real content only.

**Decisions taken**
- `@vercel/analytics` is the one new dependency (you approved Web Analytics).
- Hero Download CV etc. unchanged by this step.

**Needs Alif**
- Turn on Web Analytics in the Vercel dashboard (project → Analytics → Enable). The script is already on the site, but Vercel shows no data until it is enabled.
- Look at the favicon in a browser tab and the share image (send the home link in WhatsApp/LinkedIn; they cache old previews for a while).

**Verified live**: gate 1440/390 on all pages below; /opengraph-image 200 image/png; icon served; analytics script loads. Screenshots: `docs/reports/shots/final/` (d_ = desktop, m_ = mobile, one pair per page).

## Everything to check, by page
Live site: https://alif-site-flame.vercel.app

- **Home** — hero "Download CV" now opens `/cv`; Lighthouse number (see Section 7); favicon; share preview.
- **About** — new About sections nav; profile card "CV" link; confirm no private details (no village, ID, phone).
- **Writing / Travel / Now** — About sections nav shows on each; opinion posts published at your OK; travel photos ~200px ones need bigger copies (Jahangirnagar, mirror, Sitakunda, Hatiya, Tangail).
- **Work** — roles/credits on friends' sites and OptiNode ("Team member"); Campus Navigator and Console e-commerce have no year/role/stack/screenshots yet; research card uses a credited stock road photo; Alez client name "Yaucha Food & Beverage" correct?
- **Alez case study** — captions say test data; confirm the three galleries.
- **Services** — nine services, BDT ranges and timelines are exactly as in your plan; POS monthly rent price not set.
- **Estimate** — chips match the services; Custom = "Quote after a short call".
- **Lab** — now labelled "Simulation, made-up data".
- **Contact** — five cards; brief form budgets in ৳; the form still sends through your email/WhatsApp (no server).
- **CV (`/cv`)** — read the text once (CGPA 3.48 is shown); DOB, DIU ID, phone, "Savar" and the referees' contacts are left out on purpose; Campus Navigator GitHub link is a guess (`abdullahalyf/campus-navigator`); PDF download is generated from the page.
- **Asad's testimonial** — still hidden until he approves.
- **Vercel** — enable Web Analytics.

## PERF plan (started 15:33)
Before numbers (live, from sandbox, GET): / ttfb 0.14–0.33 s · /about 0.12–0.15 s · /work 0.11–0.14 s · /contact 0.10–0.12 s; functions region iad1 (US). Note: earlier "private, no-store" on /work and /contact was my sandbox proxy's 403, not Vercel; real responses were already HIT/STALE.

**Step 1+3+4+5 (PR perf-1)**: `regions: ["bom1"]` (Mumbai) in vercel.json; achievement photo lightbox image lazy (was loading at w=1920/3840 while hidden); extra image size 2560 so large screens skip 3840; Bricolage font pinned to the one style used and subset (78 KB → 17 KB, pixel-identical hero); intro shortened from ~1.6 s to 1.2 s.
**Step 2 (Campus Navigator link)**: GitHub link removed from `/cv` until you confirm the real URL.
