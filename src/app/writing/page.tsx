import { seo, writingContent } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { WritingIndex } from "./writing-index";

export const metadata = {
  ...pageMetadata(seo.pages.writing.title, seo.pages.writing.description, seo.pages.writing.path),
  alternates: { canonical: seo.pages.writing.path, types: { "application/rss+xml": writingContent.rssPath } },
};
export default function Writing() {
  return <WritingIndex category="all" />;
}
