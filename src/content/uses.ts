import { usesSchema } from './schemas/uses';
// DEMO: all equipment and preferences are illustrative; Alif should confirm each item.
export const usesContent = usesSchema.parse({ title: 'Tools for thoughtful work.', intro: 'DEMO setup — an editable snapshot of hardware, software and habits, not confirmed purchasing advice.', groups: [
  { title: 'Hardware', items: [{ name: 'DEMO — Everyday laptop', why: 'A portable machine for local development and client demos.' }, { name: 'DEMO — External monitor', why: 'Space for a data model beside the interface.' }] },
  { title: 'Editor & AI tools', items: [{ name: 'DEMO — VS Code', why: 'A familiar editor with straightforward debugging.' }, { name: 'DEMO — Codex', why: 'Focused implementation and test runs with reviewable diffs.' }, { name: 'DEMO — Claude', why: 'Discussing architecture and documenting decisions.' }] },
  { title: 'Languages & frameworks', items: [{ name: 'DEMO — TypeScript, React & Next.js', why: 'Typed application workflows and accessible web interfaces.' }, { name: 'DEMO — Python', why: 'Data exploration and research experiments.' }] },
  { title: 'Databases', items: [{ name: 'DEMO — PostgreSQL', why: 'Transactions, constraints and explicit permission boundaries.' }, { name: 'DEMO — SQLite', why: 'Durable local storage for offline work.' }] },
  { title: 'Infrastructure & deployment', items: [{ name: 'DEMO — Vercel', why: 'Preview deployments for reviewing small releases.' }, { name: 'DEMO — Cloudflare & GitHub Actions', why: 'Delivery, automation and repeatable release steps.' }] },
  { title: 'Productivity', items: [{ name: 'DEMO — Plain Markdown notes', why: 'Portable decisions that stay close to the code.' }, { name: 'DEMO — A weekly review', why: 'A short pause to check priorities and unfinished work.' }] },
] });
