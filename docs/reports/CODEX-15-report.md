DONE: codex-15
check: pass (92 unit tests) · e2e: 349 passed / 0 failed / 2 skipped
Parts: 1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ 6 ✅ 7 ✅
Wiring needed (for Claude):
- `src/content/site.ts`: add Services `/services`, Résumé `/resume`, Uses `/uses`, Search `/search` to navigation/secondary links; change the Contact nav href from `#contact` to `/contact` (keep footer contactId).
- `src/components/header.tsx`: import `{ SearchDialog }` from `@/features/search/SearchDialog` and `@/app/search/search.css`; render one `<SearchDialog />` for a site-wide button and shortcut.
- `src/app/work/[slug]/page.tsx`: import `{ ArchitectureDiagram }` from `@/features/diagram/ArchitectureDiagram`, `{ diagrams }` from `@/content/diagrams`, and `./architecture/architecture.css`; render `<ArchitectureDiagram diagram={diagrams[project.slug]} />` in the case study. Standalone architecture routes already work.
Notes: Seven parts committed; protected existing files unchanged except the permitted sitemap. No dependencies added.
Demo pricing, availability, experience and setup need Alif’s confirmation; contact opens a prepared external draft, never sends automatically.
Search JSON is prerendered and excludes drafts. Browser suite uses installed Chromium via the external environment config; screenshots reviewed.
Unknown architecture slugs show the inherited not-found UI; Next’s streamed response may retain HTTP 200.
Branch: `codex/task-15-new-pages`; includes the prior Task 14 commits, which are not yet on main.
