import type { Trip } from "@/content/schemas/travel";
import { travelContent as c } from "@/content/travel";
import { BangladeshOutline } from "./BangladeshOutline";
import { MAP_VIEWBOX, project } from "./geo";
import "./map.css";

export function PlaceMap({ trip }: { trip: Trip }) {
  const point = project(trip);
  return <figure className="trip-place-map">
    <svg viewBox={MAP_VIEWBOX} role="img" aria-label={c.placeMapLabel(trip.place)}><BangladeshOutline /><circle cx={point.x} cy={point.y} r="9" fill="currentColor" /><circle cx={point.x} cy={point.y} r="17" fill="none" stroke="currentColor" /></svg>
    <figcaption><span className="travel-label">{trip.place} · {trip.region}</span><p>{c.locationNote}</p></figcaption>
  </figure>;
}
