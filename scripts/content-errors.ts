import type { ZodIssue } from 'zod';

export function formatIssue(file: string, issue: Pick<ZodIssue, 'path' | 'message'>): string {
  const field = issue.path.map(String).join('.') || '(root)';
  const key = String(issue.path.at(-1) ?? '');
  const example = /email/i.test(key) ? '"you@example.com"' : /date/i.test(key) ? '"2026-01-15"' : /slug/i.test(key) ? '"my-project"' : /width|height|year/i.test(key) ? '2400' : /draft/i.test(key) ? 'false' : /src|href|link/i.test(key) ? '"https://example.com/photo.jpg"' : 'a non-empty value matching the schema (for example "Your Name" for text)';
  return `${file} → ${field}: ${issue.message}. Example: ${example}`;
}
