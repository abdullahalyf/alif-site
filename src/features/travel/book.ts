export function frameRotation(slug: string, index: number): number {
  let hash = index;
  for (const character of slug) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return (hash % 7) - 3;
}
export function pageIndex(index: number, count: number): number {
  return Math.max(0, Math.min(count - 1, index));
}
export function formatTripDate(date?: string): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}-01T00:00:00Z`));
}
