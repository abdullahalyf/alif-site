import { getPosts } from "./posts";
import { writingContent } from "./site";
import { allTrips, travelContent } from "./travel";

export type WritingCategory = keyof typeof writingContent.filters;
type Cover = { src: string; alt: string; width: number; height: number; credit?: string };

export function getWritingEntries(options?: Parameters<typeof getPosts>[0]) {
  const posts = getPosts(options).map(({ slug, title, date, summary, tags, draft, category, cover, coverAlt, coverCredit, readMinutes }) => ({
    title, date, summary, tags, draft, category: category as WritingCategory, feedDate: date, href: writingContent.postHref(slug),
    cover: { src: cover, alt: coverAlt, width: 1200, height: 800, credit: coverCredit } as Cover | undefined, readMinutes,
  }));
  const travel = allTrips.flatMap(({ slug, title, date, story, tags, photos }) => {
    if (!date) return [];
    const photo = photos.find((item) => item.width >= 600);
    return [{
      title, date, summary: story, tags: [writingContent.filters.travel.label, ...tags], draft: false,
      feedDate: `${date}-01`, category: "travel" as WritingCategory, href: travelContent.tripHref(slug),
      cover: photo ? { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height } as Cover : undefined,
      readMinutes: undefined as number | undefined,
    }];
  });
  return [...posts, ...travel].sort((a, b) => b.feedDate.localeCompare(a.feedDate) || a.href.localeCompare(b.href));
}
