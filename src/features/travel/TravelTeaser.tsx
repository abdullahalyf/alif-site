import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/arrows";
import { trips, travelContent as c } from "@/content/travel";
import { formatTripDate } from "./book";
import { TeaserStrip } from "./TeaserStrip";
import "./teaser.css";

export function TravelTeaser({ compact = false }: { compact?: boolean }) {
  const latest = [...trips].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)).slice(0, 3);
  return <section className={`travel-teaser band-surface section-space${compact ? " travel-teaser--compact" : ""}`} aria-labelledby="travel-teaser-title">
    <div className="container">
      <h2 id="travel-teaser-title">{compact ? c.homeTeaserTitle : c.teaserTitle}</h2>
      <p className="travel-teaser-intro">{compact ? c.homeTeaserIntro : c.teaserIntro}</p>
      <p className="travel-teaser-notice">{c.demoNotice}</p>
      <TeaserStrip title={c.teaserStripLabel} progressLabel={c.teaserProgress}>
        {latest.map((trip) => {
          const photo = trip.photos[0];
          const [note] = trip.story.split(/(?<=[.!?।])\s+/);
          return <figure className="travel-teaser-card" key={trip.slug}>
            <div className="travel-teaser-photo">
              <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes={compact ? "(min-width: 80rem) 27rem, (min-width: 56.25rem) 36vw, 72vw" : "(min-width: 80rem) 34rem, (min-width: 56.25rem) 44vw, 84vw"} unoptimized={photo.src.startsWith("https://")} />
            </div>
            <figcaption>
              <p className="travel-teaser-label">{trip.place} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p>
              <h3><Link href={c.tripHref(trip.slug)}>{trip.title}</Link></h3>
              {!compact && <p className="travel-teaser-note">{note}</p>}
            </figcaption>
          </figure>;
        })}
      </TeaserStrip>
      <Link className="text-link" href={c.path}>{c.openJournal}<ArrowRight /></Link>
    </div>
  </section>;
}
