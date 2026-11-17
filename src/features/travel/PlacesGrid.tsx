"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PhotoReveal } from "@/components/motion";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";
import { trips as defaultTrips, travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { formatTripDate } from "./book";

export function PlacesGrid({ trips = defaultTrips }: { trips?: Trip[] }) {
  const [{ region, tag }, setFilters] = useState({ region: "", tag: "" });
  const root = useRef<HTMLElement>(null);
  const positions = useRef(new Map<string, DOMRect>());
  const reduced = useReducedMotion();
  const regions = [...new Set(trips.map(trip => trip.region))].sort();
  const tags = [...new Set(trips.flatMap(trip => trip.tags))].sort();
  const visible = trips.filter(trip => (!region || trip.region === region) && (!tag || trip.tags.includes(tag)));
  useEffect(() => { const element = root.current; if (!element) return; element.dataset.enhanced = "true"; return () => { delete element.dataset.enhanced; }; }, []);
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !positions.current.size || !root.current) return;
    const gsap = getGsap();
    const context = gsap.context(() => {
      for (const card of root.current!.querySelectorAll<HTMLElement>("[data-trip-card]")) {
        const previous = positions.current.get(card.dataset.tripCard!);
        const next = card.getBoundingClientRect();
        gsap.fromTo(card, { x: previous ? previous.x - next.x : 0, y: previous ? previous.y - next.y : 12 }, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      }
    }, root.current);
    return () => context.revert();
  }, [region, tag, reduced, trips]);
  function filter(next: { region: string; tag: string }) {
    positions.current = new Map(Array.from(root.current?.querySelectorAll<HTMLElement>("[data-trip-card]") ?? []).map(card => [card.dataset.tripCard!, card.getBoundingClientRect()]));
    setFilters(next);
  }
  return <section ref={root} className="container travel-places" aria-labelledby="travel-places-title">
    <h2 id="travel-places-title">{c.placesTitle}</h2>
    <form className="travel-place-filters" aria-label={c.filtersLabel} onSubmit={event => event.preventDefault()}>
      <label>{c.regionLabel}<select value={region} onChange={event => filter({ region: event.target.value, tag })}><option value="">{c.allRegions}</option>{regions.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>{c.tagLabel}<select value={tag} onChange={event => filter({ region, tag: event.target.value })}><option value="">{c.allTags}</option>{tags.map(value => <option key={value}>{value}</option>)}</select></label>
      <button type="button" onClick={() => filter({ region: "", tag: "" })}>{c.resetFilters}</button>
    </form>
    <p className="travel-place-count" role="status">{c.resultsCount(visible.length)}</p>
    {visible.length ? <div className="travel-places-grid">{visible.map(trip => <article key={trip.slug} data-trip-card={trip.slug}>
      <Link href={c.tripHref(trip.slug)}><PhotoReveal className="travel-place-photo"><Image src={trip.photos[0].src} alt={trip.photos[0].alt} width={trip.photos[0].width} height={trip.photos[0].height} sizes="(min-width: 900px) 25vw, 90vw" unoptimized loading="lazy" /></PhotoReveal><h3>{trip.place}</h3></Link>
      <p className="travel-label">{trip.region} · <time dateTime={trip.date}>{formatTripDate(trip.date)}</time></p><ul className="travel-tags">{trip.tags.map(value => <li key={value}>{value}</li>)}</ul>
    </article>)}</div> : <p>{c.noPlaces}</p>}
  </section>;
}
