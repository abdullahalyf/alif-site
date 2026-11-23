import { seo, writingContent } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { WritingIndex } from "../../writing-index";

const filter = writingContent.filters.travel;
export const metadata = pageMetadata(filter.label, seo.pages.writing.description, filter.href);

export default function WritingCategory() {
  return <WritingIndex category="travel" />;
}
