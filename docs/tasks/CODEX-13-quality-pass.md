# Codex task 13 — Quality pass (performance gate, share images, headers, content)

Agent: Codex **web/cloud** (repo checked out at main in its container) · Model: GPT-6.1 Sol · Reasoning: Medium · Orchestrator: Claude (follow these instructions exactly).

## Run order (do exactly this)
1. **Sync:** you start on the latest `main`. Alif creates the PR from the Codex UI when you finish.
2. **Read fully, in order:** this file → `AGENTS.md` → `docs/DESIGN.md`.
3. **Plan first:** list Parts 1–5 and the files each touches. Check every file against the "Do NOT edit" list.
4. **Execute Parts 1–5 in order**, commit after each part (`Part N: <name>`).
5. **Verify:** `pnpm check` must pass; run `pnpm test:e2e` if your container can (if not, say so). Suggested PR title: "Task 13: Quality pass — Lighthouse CI, share images, headers, content".
6. **Write your report** to `docs/reports/CODEX-13-report.md` (commit it, and use it as your final message / PR body):
   ```
   DONE: codex-13
   check: <pass/fail> · e2e: <x passed / y failed / not run + why>
   Parts: 1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ (❌ + reason if not)
   Notes: <max 5 lines>
   ```

## Do NOT edit (another agent, Puku, is changing these right now)
- any `src/app/**/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- anything in `src/components/` and `src/lib/`
- `src/content/site.ts` and `src/content/schema.ts`
If a part seems to need one of these, skip that bit and note it in the report.

## Part 1 — Lighthouse CI quality gate
- Add `@lhci/cli` (dev dependency) and `lighthouserc.json`.
- Audit the production build (`pnpm build && pnpm start`) on: `/`, `/about`, `/approach`, `/work`, the first case study, `/writing`.
- Mobile preset. Assertions as **warnings for now** (not errors): performance ≥ 0.9, accessibility ≥ 0.95, best-practices ≥ 0.9, seo ≥ 0.95. Upload to `temporary-public-storage` so a report link appears.
- Add a separate `lighthouse` job to `.github/workflows/ci.yml` (runs after `check`). Don't change the existing job's steps except caching (Part 5).

## Part 2 — Share (Open Graph) images
- New files only: `src/app/work/[slug]/opengraph-image.tsx` (project title, category, year, site name) and `src/app/writing/[slug]/opengraph-image.tsx` (post title, date). Cream background, serif title, matching DESIGN.md colours. Use the local font files in `src/fonts/` (read them with `fs`), no network fonts.
- Add `twitter-image` equivalents (re-export).
- Tests: e2e that these image routes return 200 with `image/png`.

## Part 3 — Security + caching headers
In `next.config.ts` `headers()`: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation off), `X-Frame-Options: DENY`. Long-cache immutable headers for `/images/*` and font files. **No CSP** (would break Next inline scripts). Keep the existing picsum `remotePatterns`. Test: e2e checks the headers on `/`.

## Part 4 — Content quality (projects + writing only)
- `src/content/projects.ts`: rewrite every DEMO project so it reads like a real, specific, professional case study (concrete problem, constraints, architecture decisions, measurable results). Keep `// DEMO` markers. Do NOT change the text of `multi-branch-pos` and `traffic-accident-risk`.
- `src/content/posts/`: add 3 published DEMO posts (frontmatter `draft: false`, a `// DEMO`-style note at the top of the body as an HTML comment) on system-design topics Alif cares about, ~600–900 words each, with headings, a list, and a code block:
  1. "Designing offline-first software for shops with bad internet"
  2. "Why I design the database before the screens"
  3. "Idempotent sync: never lose a sale, never count it twice"
- Structured data via NEW layout files only: `src/app/work/[slug]/layout.tsx` (JSON-LD `CreativeWork`) and `src/app/writing/[slug]/layout.tsx` (JSON-LD `BlogPosting`). They must just render `children` plus the script tag.

## Part 5 — CI speed + tidy
- Cache Playwright browsers in CI (`actions/cache` on `~/.cache/ms-playwright`, keyed by the Playwright version).
- Delete stale merged branches is NOT your job — skip.
- Add Task 13 to `docs/ROADMAP.md` and tick it.
