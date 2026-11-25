# Autorun report (sections 4–8)

Started: 2026-11-25 11:34 Dhaka. Updated after every section.

| Step | Status | Live link |
|---|---|---|
| 0 — fixes + Sections 1–3 | live ✅ (PR #21) | https://alif-site-flame.vercel.app |
| 4 — Work | live ✅ (PR #22) | https://alif-site-flame.vercel.app/work |
| 5 — Services + Estimate + Lab | PR #23 (CI running) | /services, /estimate, /lab |
| 6 — Contact + /cv | pending | |
| 7 — Task 29 leftovers | pending | |
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

**Needs Alif**
- Confirm the BDT ranges and timelines are what you want public.
- Monthly rent price for POS (not set).
