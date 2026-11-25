# FINAL-POLISH progress (branch final-polish, PR #21)

- [x] Rule 0 — all photos viewed, PHOTO-MAP.md started
- [x] Section 1 — Header + Home hero (face logo, name h1 in Bricolage Grotesque, role, CV + socials, grey-wall panel, Home about photo with car, Home travel strip with real stops). Round 3 fixes done: one-line smaller name, airport photo on the right, face logo cut from the grey-wall portrait (native pixels).
- [x] Section 2 — About: top, sticky profile card, "How I learned to build", experience timeline, achievements table (merged milestones + hackathons, photo "View"), education, skills, 5 story chapters, outside-work cards, travel scroller (real stops), Moments gallery + lightbox, Now + "Also on this site" cards. /travel rebuilt from real trips (Sitakunda, Hatiya, 201 Dome Mosque, Putrajaya, Langkawi); demo trips removed. Image-load e2e added. Waiting for "ঠিক".
- [ ] Section 3 — Writing
- [ ] Section 4 — Work
- [ ] Section 5 — Services/Estimate/Lab
- [ ] Section 6 — Contact + /cv
- [ ] Section 7 — Task 29 leftovers
- [ ] Section 8 — Extras + verification

Notes
- Rule from Alif: never remove a section, animation or interaction because content is missing; fill it. Restored: hero photo strip (real photos) and Services hover images (stock + real). Compare with the live site before every push.
- Download CV button points at /documents/alif-cv.pdf for now; Section 6 switches it to /cv.
- /travel journal pages still contain demo trips until Section 2 replaces them.
- Malaysia trip: June 2025 (around Eid).
- Open: years for Sitakunda/Hatiya/Tangail trips and IUT/BUP hackathon prelims; larger copies of the ~200 px photos.

## Section 3 — Writing (done, waiting for "ঠিক")
- Categories: All · Tech · Travel · Tech & economy · My take (frontmatter `category`); category pages added.
- Cards: cover + date + read time + title + summary + photo credit; covers on every post; inline images with captions (`![alt](/images/... "caption")`).
- 6 technical posts: DEMO notes removed; "What I learned building my first POS" rewritten from real Alez facts; "Hello, I'm Alif" published.
- 3 new opinion posts are DRAFTS (NVIDIA, AI agents, Bangladesh) — visible on Vercel preview only (VERCEL_ENV=preview), hidden in production/RSS/sitemap/search until Alif approves.
- RSS: browsers (Accept: text/html) get a readable feed page, readers get XML (chosen over XSL because Chrome is removing XSLT); RSS link moved to a footer icon; feed only published posts + dated trips.
- Fixed: next.config image qualities now include 72 and 80 (used by Home/About images).
- Boat-under-dome photo = Military Museum, Dhaka (Alif).
