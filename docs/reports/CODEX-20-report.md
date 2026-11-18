# CODEX-20 urgent fixes

## DONE

All seven parts are committed on `codex-20-urgent`, based on `8128547` from `origin/main`.

## Check

`pnpm check` passed content validation, lint, type checking, all 157 unit tests, and the production build. The content TODO warnings and the unused ESLint suppression in the Open Graph image are pre-existing.

## E2E

The full Playwright suite completed successfully using system Chromium with one retry enabled. It reported 565 passes, 13 project-specific skips, and one flaky desktop preview test. That test timed out while checking links on a cold development server and passed on retry.

## Parts

1. **Travel book.** Desktop wheel and drag use eased transforms. Touch uses native horizontal momentum. The book holds any stopping point and releases outward wheel input to the page at both ends. Arrow controls and keyboard navigation move to trips. Progress, the fractional counter, route length and colours track the actual position. Screen readers announce the nearest trip.
2. **Maps and Malaysia.** Bangladesh uses the Natural Earth 1:10m country outline and shows the shared borders of all eight divisions. The simplified outline and division paths total about 12 KB before compression. The International section shows Dhaka to Kuala Lumpur on a regional map and links to an explicitly marked Malaysia demo with its own detail page and gallery. [Natural Earth](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/) · [geoBoundaries division data](https://github.com/HedaetShahriar/bangladesh-locations-dataset/tree/0d3116a7f59be5b2450742432805df2ab505043e/data/exports/geojson/boundaries)
3. **Header.** The fixed cream header gets compact after 40px. It measures 88px at the top on desktop, 72px on mobile, and 56px when compact. Navigation and search retain dark ink over cream.
4. **Dark transition.** The panel enters beneath its own text, while the surrounding page keeps its cream palette. The browser regression includes a mid-transition screenshot and an axe colour-contrast scan.
5. **Mobile hero.** The card overlaps the photo and the diagram sits above its upper corner at 360px, 390px and 430px. A browser check verifies those overlaps and the absence of horizontal overflow on Home.
6. **Footer.** Explore, Resources, Try and Connect group the links in four columns on desktop and two columns on mobile. Group labels and destinations live in `src/content/site.ts`.
7. **Home animation.** Headline words rise in sequence. The existing wide Alif portrait expands and sharpens with scroll on desktop, with drifting hairlines and shrinking corners. The mobile panel fades and sharpens within its frame. Reduced motion and no-JavaScript coverage verify the static result. [Steno reference](https://www.steno.ai/)

## Screenshots

The captures compare clean production builds at 390px and 1440px.

| View | 390px | 1440px |
| --- | --- | --- |
| Travel book | [Before](codex-20/travel-book-390-before.jpg) · [After](codex-20/travel-book-390-after.jpg) | [Before](codex-20/travel-book-1440-before.jpg) · [After](codex-20/travel-book-1440-after.jpg) |
| Bangladesh map | [Before](codex-20/travel-map-390-before.jpg) · [After](codex-20/travel-map-390-after.jpg) | [Before](codex-20/travel-map-1440-before.jpg) · [After](codex-20/travel-map-1440-after.jpg) |
| International section | [Malaysia](codex-20/international-390-after.jpg) | [Malaysia](codex-20/international-1440-after.jpg) |
| Header at the top | [Before](codex-20/header-top-390-before.jpg) · [After](codex-20/header-top-390-after.jpg) | [Before](codex-20/header-top-1440-before.jpg) · [After](codex-20/header-top-1440-after.jpg) |
| Header over the dark section | [Before](codex-20/header-dark-390-before.jpg) · [After](codex-20/header-dark-390-after.jpg) | [Before](codex-20/header-dark-1440-before.jpg) · [After](codex-20/header-dark-1440-after.jpg) |
| Dark panel during entry | [Before](codex-20/dark-390-before.jpg) · [After](codex-20/dark-390-after.jpg) | [Before](codex-20/dark-1440-before.jpg) · [After](codex-20/dark-1440-after.jpg) |
| Hero composition | [Before](codex-20/hero-390-before.jpg) · [After](codex-20/hero-390-after.jpg) | [Before](codex-20/hero-1440-before.jpg) · [After](codex-20/hero-1440-after.jpg) |
| Footer | [Before](codex-20/footer-390-before.jpg) · [After](codex-20/footer-390-after.jpg) | [Before](codex-20/footer-1440-before.jpg) · [After](codex-20/footer-1440-after.jpg) |
| Photo while entering and fully sharp | [Before](codex-20/photo-390-before.jpg) · [Entering](codex-20/photo-390-after.jpg) · [Sharp](codex-20/photo-finished-390-after.jpg) | [Before](codex-20/photo-1440-before.jpg) · [Entering](codex-20/photo-1440-after.jpg) · [Sharp](codex-20/photo-finished-1440-after.jpg) |

Additional mobile hero captures at [360px](codex-20/hero-360-after.jpg) and [430px](codex-20/hero-430-after.jpg).

## Notes

Chrome DevTools Protocol and `PerformanceObserver` profiled a warmed production page in headless Chromium 156. The desktop run sent 32 alternating vertical and horizontal wheel events. The touch run sent five horizontal swipes.

| Viewport | Median frame interval, before → after | 95th percentile, before → after | Long tasks, before → after |
| --- | ---: | ---: | ---: |
| 1440px wheel | 16.7 → 16.7 ms | 150.0 → 16.8 ms | 15 → 0 |
| 390px touch | 33.3 → 16.7 ms | 50.1 → 16.7 ms | 1 → 0 |

The longest frame intervals in the final sample were 150.1 ms on desktop and 33.4 ms on touch. The desktop animation uses a cached viewport width, so its frame loop does no layout reads. The live map and counter still incur browser style and paint work.
