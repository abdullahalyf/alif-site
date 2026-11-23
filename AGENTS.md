<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# alif-site — agent rules

Personal site + portfolio of Abdullah Alif (freelance developer, software systems architect, Bangladesh).
Goal: a clean, fast, premium-feeling site that makes a client trust him and want to hire him.

## How to work
- Do ONE task from `docs/ROADMAP.md` per run — the one named in the prompt. Don't start the next task.
- Read `docs/ROADMAP.md` (your task only) and `docs/DESIGN.md` before coding.
- If `docs/DESIGN.md` says a section is `PENDING`, don't invent visual design for it: keep neutral styling and leave the structure easy to restyle.
- When done, tick the task's checkbox in `docs/ROADMAP.md` in the same PR.
- PR title: `Task N: <short name>`. PR body: what changed + how it was tested, max 10 lines.

## Stack (don't add other libraries without being asked)
Next.js 16 App Router + TypeScript (strict), Tailwind CSS 4, GSAP + Lenis for motion, Zod for content validation, Vitest + Testing Library for unit tests, Playwright for e2e. pnpm. Deployed on Vercel.

## Hard rules
- All copy, links and image paths live ONLY in `src/content/site.ts` and `src/content/projects.ts`. Components import from there; no hard-coded text in components (aria-labels for icons excepted).
- Don't change the shape of `src/content/schema.ts` unless the task says so. If you must add a field, update schema + content + tests together.
- Every animation must respect `prefers-reduced-motion` (no Lenis, no GSAP motion, content fully visible). Content must be readable with JS disabled — never hide content with CSS that only JS can reveal.
- No 3D, WebGL, or video backgrounds. Canvas 2D is allowed only for `BackgroundDots` (Alif approved, 2026-11-23). No `next/font/google` (builds may run offline) — fonts go in `src/fonts/` and load with `next/font/local`.
- Images: `next/image` with explicit width/height from content. Never re-process files in `public/images/`.
- Accessibility: semantic landmarks, one `h1` per page, visible focus styles, colour contrast AA, keyboard-usable nav.
- Targets: Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95. Keep client JS small; prefer Server Components, use `"use client"` only where needed.

## Commands
- Setup: `pnpm install`
- Before finishing every task: `pnpm check` (lint + typecheck + unit tests + build). It must pass.
- E2E: `pnpm test:e2e` (needs Playwright Chromium: `pnpm exec playwright install chromium`). Run it if your environment allows; GitHub CI always runs it.
- Unit tests live next to the code as `*.test.ts(x)`; e2e tests in `e2e/`.

## Style
- Small components in `src/components/`, hooks in `src/lib/`.
- No comments that restate the code. No new docs unless the task asks.
- Don't touch files unrelated to the task.

## Review guidelines
- Treat as P1: hard-coded copy outside `src/content/`, animation without reduced-motion handling, content hidden without JS, new dependencies not listed above, failing `pnpm check`.
