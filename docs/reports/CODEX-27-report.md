# CODEX-27 report

All eight implementation parts are on `codex-27`. Browser regression verification is in progress.

## Check

`pnpm check` passed with 172 unit tests, a production build, and zero warnings.

## E2E ×2

The full Playwright suite is running. An earlier check exposed a photo assertion that expected the old light default. The assertion now verifies the dark palette’s brightness filter and the absence of a scroll transform.

## Axe

The dedicated audit found zero serious or critical violations in 32 checks. It covered Home, About, Work, Contact, Travel, Writing, Writing’s Travel filter, and Uses at 390 px and 1440 px in both themes. The full production and preview accessibility suites also check both themes.

## Lighthouse

Mobile, default dark theme, three runs per route. Scores are performance / accessibility.

| Page | Runs | Median |
| --- | --- | --- |
| Home | 63 / 100, 93 / 100, 91 / 100 | **91 / 100** |
| Travel | 88 / 100, 97 / 100, 99 / 100 | **97 / 100** |
| Contact | 98 / 100, 91 / 100, 97 / 100 | **97 / 100** |

All medians met the 90 performance and 95 accessibility targets.

## Parts

| Part | Result |
| --- | --- |
| 1 | Four desktop destinations, a keyboard- and hover-accessible Work dropdown, grouped drawer, and five linked Work tabs. |
| 2 | Contact channels, availability, and the brief form sit above the CV. The CV has a tagged A4 PDF and a print action. |
| 3 | Scroll entrances start at 92% of the viewport. Content in or within 15% below the initial viewport appears immediately. The entrances translate content at full opacity for up to 380 ms. Fast scroll jumps skip the entrance. |
| 4 | Dark is the default before hydration and with JavaScript disabled. The theme toggle remembers an explicit selection. |
| 5 | Both maps use dashed quadratic arcs. Bangladesh progress follows the curved distance to each stop in the book. |
| 6 | The journey panel shows the active place, date, note, stop number, and photo count, with tighter spacing before the next section. |
| 7 | Home has a three-card travel strip. Writing offers All, Tech, and Travel. The feed includes every trip, and trip pages link to related stories and the Travel filter. |
| 8 | Uses, Now, Lab, Estimate, and Travel have direct links in the About strip and footer. The Work dropdown exposes Lab and Estimate. More in the drawer exposes Uses and Now. |

## Decisions

- Started from `origin/sonnet-final` at `16afbcb`, the head of PR #18. The task brief came from `origin/main`. All pushes targeted `codex-27`.
- The CV uses existing factual content and the confirmed POS project. When Alif supplies his CV, update `src/content/resume.ts` and regenerate `public/documents/alif-cv.pdf` from the Contact print view. The two-page PDF is tagged, and the case study link points to the public site.
- Writing filters have static category URLs. Trip cards show the source month. RSS uses the first day of that month because RSS dates require a day.
- The existing demo travel text and photos retain their labels. Content follow-ups in the SONNET-FINAL report remain open, including the client brand, laptop configuration, education dates and copy awaiting approval. Measured POS results still need source data.
- The Playwright browser CDN returned HTTP 403. Browser checks and captures used system Chromium 156.0.8078.79. A clean build regenerated stale stylesheet artifacts shipped with the original workspace.

## Redirects added

| Source | Destination | Status |
| --- | --- | --- |
| `/resume` | `/contact#cv` | Permanent 308 |

## Screenshots

The [capture directory](codex-27/) contains Home, the Home travel strip, the Travel journey book, Contact, the anchored CV, and Writing filtered to Travel. Each view is captured at 390 px and 1440 px in both themes.
