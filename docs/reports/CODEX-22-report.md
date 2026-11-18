DONE: codex-22 · branch codex-22  
check: pass, 159 unit tests and zero warnings · e2e: run1 652/666, run2 652/666, 14 configured skips and zero failures per run · Lighthouse: mobile results below  
Parts: 1–8 ✅ · A ✅ B ✅ C ❌ D ✅ E ✅  
Screenshots: [docs/reports/codex-22/](codex-22/) · 52 at 390px and 52 at 1440px

| Route | Performance | Accessibility | Best practices | SEO | TBT | LCP |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` (median of three runs) | 88 | 100 | 100 | 100 | 202 ms | 3.52 s |
| `/about` | 90 | 100 | 100 | 100 | 154 ms | 3.39 s |
| `/travel` | 99 | 100 | 100 | 100 | 96 ms | 1.22 s |
| `/estimate` | 100 | 100 | 100 | 100 | 14 ms | 0.91 s |
| `/lab` | 100 | 100 | 100 | 100 | 17 ms | 0.91 s |

## Notes

- Picsum returned HTTP 403. The 23 remote placeholders were replaced with 440×330 generated local JPEGs at quality 75. The three local education photos also depict fictional campuses. The application has no Picsum requests or allowlist entry.
- Shared section padding at 390, 1024 and 1440px went from 34/55/77px to 26/41/58px. About, Work and Services had zero horizontal overflow at all three widths.
- Initial uncompressed JavaScript fell by 110 KB on Estimate and 109 KB on Lab. The estimator formula and starting values are retained.
- The open drawer passed axe at both screenshot widths. The Work index showed every project with JavaScript disabled.
- Writing keyboard scrolling and preview link scanning passed 20 repeats each in all three Playwright projects, 120/120 tests.
- Home performance scored 88, 86 and 91. The median of 88 is below the repository’s target of 90.
- Lighthouse 13.6.0, Chromium 156, production build, simulated mobile throttling. CLS was 0 on every audited route.
