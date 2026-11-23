# CODEX-28 report

**Implementation pushed.** The Lighthouse performance target remains open for Home and Contact.

## Check

`pnpm check` passed with 172 unit tests, a production build, and zero warnings.

## E2E ×2

| Run | Passed | Skipped | Failed |
| --- | ---: | ---: | ---: |
| 1 | 712 | 14 | 0 |
| 2 | Running | — | — |

Earlier attempts exposed an obsolete image cache assertion and navigation timeouts under concurrent browser load. The cache test now verifies slot revalidation and immutable original assets. The affected navigation tests wait for hydration before interacting. The recheck uses warmed preview routes and a 15-second assertion timeout.

## Axe

The final production build passed 56 dedicated axe checks with zero serious or critical violations. The audit covered 13 routes and the open Services navigation at 390 px and 1440 px in both themes.

## Lighthouse

Mobile, default dark theme, production server on localhost. Scores are performance / accessibility. Each measurement starts with a fresh Lighthouse browser profile.

| Page | Run 1 | Run 2 | Run 3 | Median |
| --- | ---: | ---: | ---: | ---: |
| Home | 88 / 100 | 77 / 100 | 87 / 100 | **87 / 100** |
| About | 92 / 100 | 85 / 100 | 92 / 100 | **92 / 100** |
| Contact | 68 / 100 | 84 / 100 | 84 / 100 | **84 / 100** |

Home missed the minimum performance score of 90 in all three final runs. The Contact median also missed 90. All nine accessibility scores were 100.

| Home build | Runs (performance / accessibility) | Median |
| --- | --- | --- |
| CODEX-27 baseline | 63 / 100, 93 / 100, 91 / 100 | 91 / 100 |
| Initial CODEX-28 optimization | 76 / 100, 96 / 100, 93 / 100 | 93 / 100 |
| Deferred animation loading | 68 / 100, 86 / 100, 89 / 100 | 86 / 100 |
| Separate Home hydration and direct lead JPEG | 72 / 100, 83 / 100, 75 / 100 | 75 / 100 |
| Final startup request changes | 88 / 100, 77 / 100, 87 / 100 | 87 / 100 |

The traces attributed the longest blocking tasks to JavaScript, including the initial animation bundle and framework hydration. Home now loads GSAP as animations approach the viewport and transfers 169,387 bytes of initial scripts, down from 220,376. At mobile width, startup dropped from 11 image requests to 5 and stopped prefetching Home and Work during the greeting. The visible dots start on idle after the greeting, and offscreen dot canvases stop rendering. The greeting still starts from CSS on first paint. Final Home largest contentful paint ranged from 2.2 to 2.9 seconds and total blocking time from 360 to 890 ms.

## Parts

| Part | Result |
| --- | --- |
| 1 | Services opens /services, stays visibly active throughout the section, and exposes Projects, Approach, Lab demos and Estimate a project in its desktop dropdown. The drawer and section tabs share the five ordered destinations, including on nested project architecture and Approach pages. |
| 2 | HSC 2024 and SSC 2022 appear on About and in the CV. The printable two-page tagged PDF retains the production case-study link. The case study names Alez. The existing Legion 5 configuration and the unpublished Managing Director testimonial already matched the brief. |
| 3 | Contact and the footer use a single WhatsApp URL from site content and display the accessible name WhatsApp. The Contact CV, menu and existing forms reuse the same destination. |
| 4 | 52 documented JPEG slots cover portraits, education, About chapters, travel, project images and the work setup. All JPEG files match their documented dimensions. |
| 5 | The four Approach steps and the empty hackathon, mission and vision fields are marked `// DEMO` and listed in the [replacement guide](../PHOTO-SLOTS.md). |
| 6 | Deferred animation imports, limited dot rendering, lowered below-the-fold image priority and split Home hydration. The measured Home performance target remains open. |

## Decisions

- Started from `origin/codex-27` at `9f3b0f5`. The task brief came from `origin/main`. The only push destination was `codex-28`.
- The three approved portraits were copied byte-for-byte into their slots. The remaining slots use labelled placeholders. Replacing the JPEG removes the label without code changes. Existing originals remain in the repository.
- Reused a destination’s travel image slot in its Home and Travel cards. Also reused project overview slots in their corresponding Home Services cards.
- Used the installed Chromium 156.0.8078.79 after the Playwright browser CDN returned HTTP 403. Cleared a stale generated build cache after finding the global stylesheet omitted from its output.
- Stabilized motion unit tests for asynchronous loading and the intro unit test for runner timing. Stopped the superseded Playwright attempt after the rerun changed the build.

## Screenshots

The [capture directory](codex-28/) contains 16 PNGs. Each subject is shown in light and dark at widths of 390 and 1440 px. At 390 px the Services destinations appear in the drawer. At 1440 px they appear in the header dropdown. The other captures show the About education timeline, Contact with WhatsApp and the CV, and the Uses work setup slot.
