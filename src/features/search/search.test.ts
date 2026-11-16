// @vitest-environment node
import { expect, it } from 'vitest';
import { score, searchEntries } from './score';
import { buildSearchIndex } from './index';
import { getPosts } from '@/content/posts';
it('scores exact, substring, fuzzy and impossible queries', () => { expect(score('resume', 'Résumé')).toBe(1000); expect(score('arch', 'Architecture')).toBeGreaterThan(score('arctctr', 'Architecture')); expect(score('zzzz', 'Architecture')).toBe(0); });
it('indexes public content and excludes drafts', () => { const entries = buildSearchIndex(); expect(entries.some(entry => entry.href === '/contact')).toBe(true); expect(new Set(entries.map(entry => entry.href)).size).toBe(entries.length); for (const draft of getPosts({ includeDrafts: true }).filter(post => post.draft)) expect(entries.some(entry => entry.href === `/writing/${draft.slug}`)).toBe(false); expect(searchEntries(entries, 'POS')[0].title).toContain('POS'); });
