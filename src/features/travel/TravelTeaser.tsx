import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/arrows";
import { travelStops, travelContent as c } from "@/content/travel";
import { TeaserStrip } from "./TeaserStrip";
import "./teaser.css";

export function TravelTeaser({ compact = false }: { compact?: boolean }) {
  return <section className={`travel-teaser band-surface section-space${compact ? " travel-teaser--compact" : ""}`} aria-labelledby="travel-teaser-title">
    <div className="container">
      <h2 id="travel-teaser-title">{compact ? c.homeTeaserTitle : c.teaserTitle}</h2>
      <p className="travel-teaser-intro">{compact ? c.homeTeaserIntro : c.teaserIntro}</p>
      <TeaserStrip title={c.teaserStripLabel} progressLabel={c.teaserProgress}>
        {travelStops.map((stop) => <figure className="travel-teaser-card" key={stop.slug}>
          <div className="travel-teaser-photo">
            <Image src={stop.image.src} width={stop.image.width} height={stop.image.height} alt={stop.image.alt} loading="lazy" fetchPriority="low" quality={72} sizes={compact ? "(min-width: 80rem) 27rem, (min-width: 56.25rem) 36vw, 72vw" : "(min-width: 80rem) 34rem, (min-width: 56.25rem) 44vw, 84vw"} />
          </div>
          <figcaption>
            <p className="travel-teaser-label">{stop.place}</p>
            <h3>{stop.title}</h3>
            <p className="travel-teaser-note">{stop.note}</p>
            {stop.quote && <p className="travel-teaser-quote"><q>{stop.quote.text}</q> <cite>{stop.quote.by}</cite></p>}
          </figcaption>
        </figure>)}
      </TeaserStrip>
      <Link className="text-link" href={c.path}>{c.openJournal}<ArrowRight /></Link>
    </div>
  </section>;
}
