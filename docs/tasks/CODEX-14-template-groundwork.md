# Codex task 14 — Plug-and-play template groundwork (non-breaking)

Agent: Codex **web/cloud** (repo checked out at main in its container) · Model: GPT-6.1 Sol · Reasoning: High · Orchestrator: Claude (follow these instructions exactly).

Goal: Alif wants this site to become a reusable template — so a new person's site can be made by swapping content + theme, "plug and play". This task builds the tooling and docs for that **without moving or changing existing app code** (another agent, Puku, is editing pages right now). The big refactor happens later in a separate task.

## Run order (do exactly this)
1. **Sync:** you start on the latest `main`. Alif creates the PR from the Codex UI when you finish.
2. **Read fully, in order:** this file → `AGENTS.md` → `docs/DESIGN.md` → `src/content/schema.ts`, `site.ts`, `projects.ts`, `posts.ts` (read only).
3. **Plan first:** list Parts 1–6 and the files each touches; check every file against "Do NOT edit".
4. **Execute Parts 1–6 in order**, commit after each part (`Part N: <name>`).
5. **Verify:** `pnpm check` must pass; run `pnpm test:e2e` if your container can. Suggested PR title: "Task 14: Template groundwork — content validator, image tool, starter kit, guides".
6. **Write your report** to `docs/reports/CODEX-14-report.md` (commit it, and use it as your final message / PR body):
   ```
   DONE: codex-14
   check: <pass/fail> · e2e: <x passed / y failed / not run + why>
   Parts: 1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ 6 ✅ (❌ + reason if not)
   Notes: <max 5 lines>
   ```

## Do NOT edit
- any `src/app/**`, anything in `src/components/` and `src/lib/`, `src/app/globals.css`
- `src/content/site.ts`, `src/content/schema.ts`, `src/content/projects.ts`
Only add new files (and `package.json` scripts / `docs/ROADMAP.md`).

## Part 1 — Content validator CLI
- `scripts/validate-content.ts` + `pnpm validate:content` (run with `tsx`; add `tsx` as dev dependency).
- Validates site, projects and posts against the Zod schemas and prints **friendly, human-readable** errors (file, field path, what's wrong, example of a correct value). Also checks: local image files exist, slugs unique, no leftover `TODO(` in non-draft content (warning), count of `// DEMO` markers per file (info).
- Exit code 1 on errors, 0 on warnings only. Unit tests for the error formatter.
- Add it to `pnpm check` (before lint).

## Part 2 — Image tool
- `scripts/add-image.ts` + `pnpm add:image <input> <name> [--max 2400]`: uses `sharp` (already installed via Next) to auto-rotate, resize to max width, convert to high-quality `.jpg` (and keep transparency as `.png` when the input has alpha), strip metadata, write to `public/images/<name>.<ext>`, and print a ready-to-paste content snippet `{ src, width, height, alt: "TODO" }`.
- Unit tests with a tiny generated test image.

## Part 3 — Starter kit (for a new person)
- `templates/starter/content/` with blank-but-valid `site.ts`, `projects.ts` (1 example project), `posts/welcome.md` — every field filled with obvious placeholders like `"Your Name"`, all marked `// REPLACE`.
- A test that the starter content passes the same Zod schemas (import the schemas, don't copy them).

## Part 4 — Theme inventory
- `docs/THEME.md`: list every design token currently used (colours, fonts, radii, spacing scale) by reading `globals.css` and `DESIGN.md`, and for each: where it's defined and what it affects. End with a proposed single `theme.ts` shape (do not create/use it yet).

## Part 5 — Guides
- `docs/CONTENT-GUIDE.md` — for Alif (simple English, short steps): how to change any text, add a project, add a blog post, add/replace a photo with `pnpm add:image`, mark things as draft, find and replace all `// DEMO` items, run `pnpm validate:content`, preview and deploy (Vercel auto-deploys main).
- `docs/TEMPLATE.md` — "Make a site for someone else in 10 minutes" using the current structure + starter kit, and a section "Planned refactor" describing the later move to `content/` + `theme.ts` (from Part 4).

## Part 6 — Wrap up
- Add Task 14 to `docs/ROADMAP.md` and tick it. Add a not-yet-ticked Task 15 "Template refactor: move content + theme to single folder/file (runs alone)".
