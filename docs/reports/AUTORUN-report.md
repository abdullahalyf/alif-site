# Autorun report (sections 4–8)

Started: 2026-11-25 11:34 Dhaka. Updated after every section.

| Step | Status | Live link |
|---|---|---|
| 0 — fixes + Sections 1–3 | live ✅ (PR #21) | https://alif-site-flame.vercel.app |
| 4 — Work | live ✅ (PR #22) | https://alif-site-flame.vercel.app/work |
| 5 — Services + Estimate + Lab | live ✅ (PR #23) | https://alif-site-flame.vercel.app/services · /estimate · /lab |
| 6 — Contact + /cv | live ✅ (PR #24) | https://alif-site-flame.vercel.app/contact · /cv |
| 7 — Task 29 leftovers | in progress | |
| 8 — Extras | pending | |

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
