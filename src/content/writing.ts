import { getPosts } from "./posts";
import { writingContent } from "./site";
import { allTrips, travelContent } from "./travel";

export function getWritingEntries(options?: Parameters<typeof getPosts>[0]) {
  const tech = getPosts(options).map(({ slug, title, date, summary, tags, draft }) => ({
    title, date, summary, tags, draft, feedDate: date, category: "tech" as const, href: writingContent.postHref(slug),
  }));
  const travel = allTrips.flatMap(({ slug, title, date, story, tags }) => date ? [{
    title, date, summary: story, tags: [writingContent.filters.travel.label, ...tags], draft: false,
    feedDate: `${date}-01`, category: "travel" as const, href: travelContent.tripHref(slug),
  }] : []);
  return [...tech, ...travel].sort((a, b) => b.feedDate.localeCompare(a.feedDate) || a.href.localeCompare(b.href));
}
