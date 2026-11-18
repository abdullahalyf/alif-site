import Image from "next/image";
import Link from "next/link";
import { trips, travelContent as c } from "@/content/travel";
import { formatTripDate } from "./book";
import { TeaserStrip } from "./TeaserStrip";
import "./teaser.css";

export function TravelTeaser() {
  const latest = [...trips].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)).slice(0, 3);
  return <section className="travel-teaser" aria-labelledby="travel-teaser-title">
    <p className="travel-teaser-label">{c.teaserLabel}</p><h2 id="travel-teaser-title">{c.teaserTitle}</h2>
    <p className="travel-teaser-notice">{c.demoNotice}</p>
    <TeaserStrip title={c.teaserStripLabel} progressLabel={c.teaserProgress}>
      {latest.map((trip) => <figure className="travel-teaser-card" key={trip.slug}>
        <div className="travel-teaser-photo"><Image src={trip.photos[0].src} alt={trip.photos[0].alt} width={trip.photos[0].width} height={trip.photos[0].height} sizes="(min-width: 900px) 30vw, 80vw" unoptimized={trip.photos[0].src.startsWith("https://")} loading="lazy" /></div>
        <figcaption><p className="travel-teaser-label">{trip.place} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p><h3>{trip.title}</h3></figcaption>
      </figure>)}
    </TeaserStrip>
    <Link className="text-link" href={c.path}>{c.allTravels}</Link>
  </section>;
}
