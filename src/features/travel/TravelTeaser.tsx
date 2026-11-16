import Image from "next/image";
import Link from "next/link";
import { PhotoReveal } from "@/components/motion";
import { trips, travelContent as c } from "@/content/travel";
import { formatTripDate } from "./book";
import "./teaser.css";

export function TravelTeaser() {
  const latest = [...trips].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)).slice(0, 3);
  return <section className="travel-teaser" aria-labelledby="travel-teaser-title">
    <p className="travel-teaser-label">{c.teaserLabel}</p><h2 id="travel-teaser-title">{c.teaserTitle}</h2>
    <p className="travel-teaser-notice">{c.demoNotice}</p>
    <div className="travel-teaser-strip" tabIndex={0} role="region" aria-label={c.teaserTitle}>
      {latest.map((trip) => <figure className="travel-teaser-card" key={trip.slug}>
        <PhotoReveal className="travel-teaser-photo"><Image src={trip.photos[0].src} alt={trip.photos[0].alt} width={trip.photos[0].width} height={trip.photos[0].height} sizes="(min-width: 900px) 30vw, 80vw" unoptimized loading="lazy" /></PhotoReveal>
        <figcaption><p className="travel-teaser-label">{trip.place} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p><h3>{trip.title}</h3></figcaption>
      </figure>)}
    </div>
    <Link className="text-link" href={c.path}>{c.allTravels}</Link>
  </section>;
}
