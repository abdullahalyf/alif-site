import { travelContent } from "@/content/travel";
import { shareImage, shareImageSize } from "@/seo/share-image";

export const alt = travelContent.title;
export const size = shareImageSize;
export const contentType = "image/png";
export default function Image() {
  return shareImage(travelContent.title, travelContent.description);
}
