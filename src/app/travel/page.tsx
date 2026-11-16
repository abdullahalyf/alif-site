import Image from "next/image";
import Link from "next/link";
import { trips, travelContent as c } from "@/content/travel";
import { PhotoBook } from "@/features/travel/PhotoBook";
import { formatTripDate } from "@/features/travel/book";
import { PhotoReveal, Reveal } from "@/components/motion";
import { pageMetadata } from "@/seo/metadata";
import "./travel.css";

export const metadata = pageMetadata(c.title, c.description, c.path);

export default function TravelPage() {
  return <div className="travel-page">
    <header className="container travel-page-hero">
      <Reveal><h1>{c.title}</h1><p className="travel-page-intro">{c.intro}</p></Reveal>
      <p className="travel-demo-notice">{c.demoNotice}</p>
    </header>
    <PhotoBook />
    <section className="container travel-places" aria-labelledby="travel-places-title">
      <h2 id="travel-places-title">{c.placesTitle}</h2>
      <div className="travel-places-grid">{trips.map((trip) => <article key={trip.slug}>
        <PhotoReveal className="travel-place-photo"><Image src={trip.photos[0].src} alt={trip.photos[0].alt} width={trip.photos[0].width} height={trip.photos[0].height} sizes="(min-width: 900px) 25vw, 50vw" unoptimized loading="lazy" /></PhotoReveal>
        <h3>{trip.place}</h3><p className="travel-label">{trip.region} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p>
      </article>)}</div>
    </section>
    <div className="container travel-closing"><p>{c.closing}</p><Link className="text-link" href={c.aboutPath}>{c.aboutLink}</Link></div>
  </div>;
}
