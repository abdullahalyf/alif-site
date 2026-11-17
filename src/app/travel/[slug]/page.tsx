import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trips, getTrip, travelContent as c } from "@/content/travel";
import { PhotoReveal } from "@/components/motion";
import { formatTripDate } from "@/features/travel/book";
import { PlaceMap } from "@/features/travel/map/PlaceMap";
import { TripGallery } from "@/features/travel/TripGallery";
import { pageMetadata } from "@/seo/metadata";
import "./trip.css";

export const ensureStatic = "navigation";
export function generateStaticParams() { return trips.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps<"/travel/[slug]">) {
  const trip = getTrip((await params).slug); if (!trip) notFound();
  return pageMetadata(trip.title, trip.story, c.tripHref(trip.slug));
}
export default async function TripPage({ params }: PageProps<"/travel/[slug]">) {
  const trip = getTrip((await params).slug); if (!trip) notFound();
  const index = trips.findIndex(item => item.slug === trip.slug);
  const previous = trips[index - 1], next = trips[index + 1];
  const cover = trip.photos[0];
  return <article className="container trip-page">
    <header className="trip-intro"><Link className="text-link" href={c.path}>{c.backToTravel}</Link><p className="travel-label">{trip.place} · {formatTripDate(trip.date)} · {trip.region}</p><h1>{trip.title}</h1><p className="travel-demo-notice">{c.demoNotice}</p></header>
    <figure className="trip-cover"><PhotoReveal><Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(min-width: 1280px) 1216px, 100vw" unoptimized loading="eager" /></PhotoReveal><figcaption>{cover.caption}</figcaption></figure>
    <div className="trip-story-layout"><section className="trip-story" aria-labelledby="trip-story-title"><h2 id="trip-story-title">{c.storyTitle}</h2><p>{trip.story}</p>{trip.people && <div className="trip-conversation"><h3>{c.peopleLabel}</h3><p>{trip.people}</p></div>}<ul className="travel-tags">{trip.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section><PlaceMap trip={trip} /></div>
    <TripGallery trip={trip} />
    <nav className="trip-neighbors" aria-label={c.journeyNavigation}>{previous && <Link href={c.tripHref(previous.slug)} rel="prev"><span className="travel-label">{c.previous}</span><span>{previous.title}</span></Link>}{next && <Link href={c.tripHref(next.slug)} rel="next"><span className="travel-label">{c.next}</span><span>{next.title}</span></Link>}<Link className="text-link trip-all-link" href={c.path}>{c.allTravels}</Link></nav>
  </article>;
}
