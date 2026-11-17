import { notFound } from "next/navigation";
import { getTrip, travelContent as c } from "@/content/travel";
import { shareImage, shareImageSize } from "@/seo/share-image";
import { formatTripDate } from "@/features/travel/book";

export const alt = c.title;
export const size = shareImageSize;
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getTrip((await params).slug); if (!trip) notFound();
  return shareImage(trip.title, `${trip.place} · ${formatTripDate(trip.date)}`);
}
