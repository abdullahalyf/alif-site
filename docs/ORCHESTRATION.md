# Orchestration workflow (Claude)

Roles: **Claude** = orchestrator/reviewer/merger. **Codex** (cloud, repo-connected) and **Puku** (Opus, Alif's PC at `E:\Projects\alif-site`) = builders. **Alif** = starts agents, says "done", gives real info.

## Loop
1. **Plan** — Claude writes a task file `docs/tasks/<AGENT>-<NN>-<name>.md` (agent + settings, run order, parts, file boundaries, report format), commits to main.
2. **Start** — Alif tells the agent: `Read and run docs/tasks/<FILE>.md`.
3. **Build** — agent works on its own branch, commits per part, writes `docs/reports/<AGENT>-<NN>-report.md`, opens a PR.
4. **Review** (Claude, minimal tokens) — when Alif says "done":
   - `gh api repos/abdullahalyf/alif-site/pulls?state=open` (REST only, no GraphQL) → read the report file.
   - fetch branch, merge latest main locally, `pnpm check` + `pnpm test:e2e`, skim `git diff --stat` + risky files only.
   - small issues → Claude fixes and pushes; big issues → new task file for the agent.
   - merge (squash via REST, or push merged branch to main).
5. **Next** — Claude writes the next task file and tells Alif (Bangla, short) which agent gets which one-liner.

## Parallel rules
- Two agents run in parallel only with disjoint files, written into each task file's "Do NOT edit" list.
- Changes touching nearly everything (e.g. template refactor) run alone, last.
- Every task starts from latest main.

## Backlog
- CODEX-11 Writing + Now (in progress) → CODEX-12 demo content → PUKU-01 motion/brand/hero/polish → template ("plug-and-play" for other people: content folder + theme file + TEMPLATE.md) → real content from Alif (education, results, awards, projects, story photos, Alez screenshots).

Live: https://alif-site-flame.vercel.app (Vercel auto-deploys main; PRs get previews).

## Pending wiring (after PUKU-01 merges)
- Nav: add /services, /resume, /uses; Contact → /contact. Header: render `SearchDialog` (+ search.css) once.
- Case study: render `<ArchitectureDiagram diagram={diagrams[project.slug]} />` (+ architecture.css).

## Future ideas (Alif)
- About me → "Travel" section: horizontal-scroll photo-book — animated photo frames with captions/text sliding in as you scroll sideways (GSAP horizontal pin). Alif loves travelling.
- Copy protection → moved into PUKU-03 Part 8.
