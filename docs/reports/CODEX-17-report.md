DONE: Task 17 — branch `codex-17-travel-journey` pushed for Alif’s preview; no merge into main.

check: PASS — content validation, lint, types, 138 unit tests and production build. Final added browser-test types also pass.

e2e: PASS after one targeted retry — full run: 499 passed, 7 intentional device-specific skips, 1 failure in the existing mobile Writing code-block ArrowRight check. `pnpm test:e2e --last-failed` reran that check: 1 passed. All 500 non-skipped tests passed across these runs, including every Travel test; protected Writing code/tests were not changed.

Lighthouse: `/travel`, mobile, Lighthouse 13.6.0 with simulated throttling — Performance 94, Accessibility 100. FCP 0.9s, LCP 0.9s, TBT 280ms, CLS 0.

Parts: 0–7 complete, with a separate commit for each part.

Decisions I made:
- Part 0 takes precedence over the older pinned-scroll wording. There is no page pinning. Wheel handling lives on the bounded book, releases at either edge, and leaves the rest of the page alone.
- The map follows native horizontal scroll; mouse drag, native touch swipe, keyboard, buttons and map pins all select journeys. A selected map pin brings its trip text into view on mobile.
- Used Natural Earth’s public-domain 1:110m Bangladesh outline and approximate DEMO coordinates. Route distance is a haversine sum in book order, explicitly labelled straight-line demo distance.
- Kept place colours light enough for AA with both ink text tokens. Cream text panels preserve contrast above the low-opacity ambient photographs. Reduced motion switches instantly and shows the full route; no-JS output remains a normal list with usable links.
- Used a native modal dialog for the gallery, including focus restoration, Escape, arrow keys and swipe. Filters animate positions without fading text.

Notes:
- All 18 seeded demo photos are local, 1200×900 JPEGs at quality 75 (1,948,139 bytes total), with responsive Next image variants. No dependencies or proxy CA changes.
- Travel index and all eight trip pages are covered by shared axe/link route lists and the sitemap. The open gallery is axe-scanned too.
- Codrops could not be opened here (403); followed the supplied reference description. Protected shared pages, components, library code and global styles are unchanged.
- Alif opens the preview/PR: “Task 17: Travel journey — route map, place colours, trip pages”. Branch push only; nothing merged into main.
