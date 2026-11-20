# DONE codex-26

## Check

`pnpm check` passed content validation, lint, typechecking, 153 unit tests and the production build without warnings.

## Playwright e2e ×2

Both full `pnpm test:e2e` runs used the production and preview servers, three workers and zero retries.

| Run | Passed | Failed | Skipped | Duration |
| --- | ---: | ---: | ---: | ---: |
| 1 | 689 | 0 | 13 | 21.1m |
| 2 | 689 | 0 | 13 | 18.7m |

## Axe

The production audit covered 46 published routes at 390px and 1440px in light and dark. It found zero serious or critical axe violations across 184 visits. The separate 404 check also passed in both themes.

```json
{"visits":184,"geometry":0,"brokenImages":0,"console":0,"headings":0,"gaps":0,"axe":0,"diagrams":0}
```

Services fit without horizontal overflow at 320px, 390px, 768px and 1440px in both themes with JavaScript disabled. The native FAQ opened without JavaScript. The chart bars and process line responded to scroll with motion enabled.

The four foreground tokens have a minimum contrast of 5.46:1 against the five shared backgrounds in light mode and 5.81:1 in dark mode. Text on the green action colour has contrast of 8.56:1 in light mode and 9.68:1 in dark mode.

## Lighthouse mobile

Lighthouse 13.6.0 used simulated mobile throttling against the production build.

| Route | Performance median | Performance runs | Accessibility median | LCP median |
| --- | ---: | --- | ---: | ---: |
| `/services` | 96 | 97, 96, 93 | 100 | 0.92 s |
| `/` (initial) | 89 | 65, 89, 92 | 100 | 3.33 s |
| `/` (repeat) | 92 | 84, 92, 93 | 100 | 2.82 s |

Home’s first run included cold image optimization. The repeat warmed the same server-side image variant and used fresh browser sessions.

## Parts

1. Services now opens with a business-to-dashboard illustration. Four alternating service sections show an order workflow, a sales dashboard with checkout, an offline order queue and a staff permission matrix. Each section identifies its audience, deliverables, timeline, demo starting price and estimate link. The page includes a numbered process timeline, four proof tiles, three engagement cards and the existing FAQ.
2. The shared palette uses warm off-white and charcoal, related green tints, forest green for actions and occasional terracotta. The token values and uses are documented in [DESIGN.md](../DESIGN.md).
3. Task 26 is checked in [ROADMAP.md](../ROADMAP.md).

## Decisions

- Fixed scope is recommended for a first build. Starting amounts are illustrative and use USD, matching the estimator. The page identifies demo prices and timelines and explains when actual scope and pricing are confirmed.
- Architecture starts with a web app, Business software with POS, Offline-first apps with a mobile app and offline enabled, and Database & access control with a dashboard. Valid service links apply their presets after hydration. The default estimate and its contact links remain usable with JavaScript disabled.
- Service mockups are HTML and CSS with SVG icons. The scroll-linked chart, decorative movement and process line remain static under reduced motion. Destination-specific travel colours remain tied to the trip data.
- Both Playwright and Lighthouse used installed Chromium 156. The Playwright browser download endpoint returned HTTP 403.

## Screenshots

Full-page JPEGs show both themes at 390px and 1440px. The before captures use `368b16e` on `main`. Home and About show the palette change side by side. Services also shows the redesign.

| Page | Before | After |
| --- | --- | --- |
| Services | [Light 390](codex-26/before/services-light-390.jpg) · [Dark 390](codex-26/before/services-dark-390.jpg) · [Light 1440](codex-26/before/services-light-1440.jpg) · [Dark 1440](codex-26/before/services-dark-1440.jpg) | [Light 390](codex-26/after/services-light-390.jpg) · [Dark 390](codex-26/after/services-dark-390.jpg) · [Light 1440](codex-26/after/services-light-1440.jpg) · [Dark 1440](codex-26/after/services-dark-1440.jpg) |
| Home | [Light 390](codex-26/before/home-light-390.jpg) · [Dark 390](codex-26/before/home-dark-390.jpg) · [Light 1440](codex-26/before/home-light-1440.jpg) · [Dark 1440](codex-26/before/home-dark-1440.jpg) | [Light 390](codex-26/after/home-light-390.jpg) · [Dark 390](codex-26/after/home-dark-390.jpg) · [Light 1440](codex-26/after/home-light-1440.jpg) · [Dark 1440](codex-26/after/home-dark-1440.jpg) |
| About | [Light 390](codex-26/before/about-light-390.jpg) · [Dark 390](codex-26/before/about-dark-390.jpg) · [Light 1440](codex-26/before/about-light-1440.jpg) · [Dark 1440](codex-26/before/about-dark-1440.jpg) | [Light 390](codex-26/after/about-light-390.jpg) · [Dark 390](codex-26/after/about-dark-390.jpg) · [Light 1440](codex-26/after/about-light-1440.jpg) · [Dark 1440](codex-26/after/about-dark-1440.jpg) |
