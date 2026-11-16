import { describe, it, expect } from 'vitest';
import { formatIssue } from '../../scripts/content-errors';
describe('content error formatter', () => {
  it('identifies file, nested field, problem and a relevant example', () => {
    expect(formatIssue('projects.ts', { path: [2, 'images', 0, 'width'], message: 'Must be positive' })).toBe('projects.ts → 2.images.0.width: Must be positive. Example: 2400');
    expect(formatIssue('site.ts', { path: ['email'], message: 'Invalid email' })).toContain('you@example.com');
  });
  it('handles root errors', () => {
    expect(formatIssue('projects.ts', { path: [], message: 'Project slugs must be unique' })).toContain('(root): Project slugs must be unique');
  });
});
