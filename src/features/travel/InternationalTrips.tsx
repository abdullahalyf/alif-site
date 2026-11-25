import Image from "next/image";
import Link from "next/link";
import { internationalTrips, travelContent as c } from "@/content/travel";
import { formatTripDate } from "./book";
import { InternationalMap } from "./map/InternationalMap";

export function InternationalTrips() {
  return <section className="container travel-international" aria-labelledby="international-title">
    <h2 id="international-title">{c.internationalTitle}</h2>
    <p>{c.internationalIntro}</p>
    <div className="travel-international-layout">
      <InternationalMap trips={internationalTrips} />
      <div className="travel-international-trips">
        {internationalTrips.map(trip => {
          const cover = trip.photos[0];
          return <article key={trip.slug} className="travel-international-card">
            <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 800px) 90vw, 460px" />
            <div className="travel-international-card-copy">
              <p className="travel-label">{trip.place} · {trip.country}{trip.date && <> · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></>}</p>
              <h3><Link href={c.tripHref(trip.slug)}>{trip.title}</Link></h3>
              <p>{trip.story}</p>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
