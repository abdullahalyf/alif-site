import type { SearchEntry } from '@/content/schemas/search';
function normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
export function score(query: string, text: string): number {
  const needle = normalize(query).trim(); const haystack = normalize(text);
  if (!needle) return 1;
  if (haystack === needle) return 1000;
  const at = haystack.indexOf(needle); if (at >= 0) return 500 - Math.min(at, 200);
  let cursor = 0, gaps = 0;
  for (const character of needle) { const next = haystack.indexOf(character, cursor); if (next < 0) return 0; gaps += next - cursor; cursor = next + 1; }
  return Math.max(1, 100 - gaps);
}
export function searchEntries(entries: SearchEntry[], query: string) {
  return entries.map(entry => ({ entry, rank: score(query, entry.title) * 2 + score(query, entry.description) })).filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank || a.entry.title.localeCompare(b.entry.title)).slice(0, 15).map(item => item.entry);
}
