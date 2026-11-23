# CODEX-28 report

**Implementation pushed.** The Home Lighthouse performance target remains open.

## Check

`pnpm check` passed with 172 unit tests, a production build, and zero warnings.

## E2E ×2

| Run | Passed | Skipped | Failed |
| --- | ---: | ---: | ---: |
| 1 | Running | — | — |
| 2 | Queued | — | — |

## Axe

An initial dedicated audit found zero serious or critical violations in 56 checks, covering 13 routes and the open Services navigation at 390 px and 1440 px in both themes. The final-build audit is running.

## Lighthouse

Mobile, default dark theme, production server on localhost. Scores are performance / accessibility. Each measurement starts with a fresh Lighthouse browser profile.

| Page | Run 1 | Run 2 | Run 3 | Median |
| --- | ---: | ---: | ---: | ---: |
| Home | 72 / 100 | 83 / 100 | 75 / 100 | **75 / 100** |
| About | 95 / 100 | 91 / 100 | 96 / 100 | **95 / 100** |
| Contact | 93 / 100 | 74 / 100 | 79 / 100 | **79 / 100** |

The CODEX-27 Home baseline was 63 / 100, 93 / 100, and 91 / 100 (median 91 / 100). After the first CODEX-28 optimization pass, Home measured 76 / 100, 96 / 100, and 93 / 100. The intermediate Lighthouse traces attributed the largest blocking tasks to JavaScript, including the eagerly loaded animation bundle. After deferring GSAP and limiting canvas work, Home measured 68 / 100, 86 / 100, and 89 / 100. Initial script transfer fell from 220,376 bytes to 170,754 bytes. The final pass split Home hydration into sections and served the fixed-size lead JPEG directly. Home still missed the 90 target in all three runs. Its largest contentful paint ranged from 2.2 to 3.5 seconds and total blocking time from 360 to 1,480 ms. The dot canvases initialize on idle once visible and stop rendering offscreen. Below-the-fold photo requests use lazy loading. The first-visit intro is still CSS-driven from first paint.

## Parts

| Part | Result |
| --- | --- |
| 1 | Services opens /services, stays visibly active throughout the section, and exposes Projects, Approach, Lab demos and Estimate a project in its desktop dropdown. The drawer and section tabs share the five ordered destinations. |
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
- Stabilized motion unit tests for asynchronous loading and the intro unit test for runner timing.

## Screenshots

The [capture directory](codex-28/) contains 16 PNGs. Each subject is shown in light and dark at widths of 390 and 1440 px. At 390 px the Services destinations appear in the drawer. At 1440 px they appear in the header dropdown. The other captures show the About education timeline, Contact with WhatsApp and the CV, and the Uses work setup slot.
