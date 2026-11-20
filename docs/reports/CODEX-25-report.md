DONE: codex-25 · branch codex-25

check: pass · 153 unit tests, zero warnings · e2e: run1 689/0/13 · run2 689/0/13 (passed/failed/skipped, zero retries)

axe: light 0 serious/critical · dark 0 serious/critical · audit script: pass

```json
{"visits":184,"geometry":0,"brokenImages":0,"console":0,"headings":0,"gaps":0,"axe":0,"diagrams":0}
```

The audit covers 46 published routes in both themes at 390px and 1440px. It also checks each project's case-study and standalone diagram at 390px, 1024px and 1440px.

### Lighthouse mobile

| Route | Performance median | Individual runs | Accessibility median | LCP median |
| --- | ---: | --- | ---: | ---: |
| `/` | 93 | 92, 93, 94 | 100 | 2.75 s |
| `/about` | 94 | 95, 88, 94 | 100 | 2.82 s |
| `/work` | 93 | 97, 93, 93 | 100 | 3.11 s |
| `/work/multi-branch-pos` | 91 | 91, 88, 91 | 100 | 3.36 s |
| `/services` | 100 | 100, 99, 100 | 100 | 0.92 s |

Lighthouse 13.6.0 ran on installed Chromium 156 with simulated mobile throttling against the production build. The first Home triplet on this build scored 88, 89 and 95. The table shows its subsequent isolated three-run check.

Items: A1–A9 ✅ · B1–B5 ✅ · C1–C6 ✅

### Decisions

- POS metrics use the numbers already documented in the case study. Example timelines and provisional research decisions are identified in the page copy.
- The Home and About opening content paints immediately. Scroll entrances start farther down the page, and touch-first devices use native scrolling.
- Shared card rows retain native scrolling. The card entrance leaves the scroll extent stable, and desktop arrows, edge fades and a keyboard-operable scrubber show the row position.
- Preview link checks allow up to 120 seconds for development-server route compilation and still verify every destination.
- The site uses its existing local demo photographs. Screenshots show the final state in both themes, with two desktop captures of the approach stack during scrolling.

Screenshots: [docs/reports/codex-25/](codex-25/) · 146 images across 390px and 1440px
