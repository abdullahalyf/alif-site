import Image from "next/image";
import { useId } from "react";
import { formatTripDate } from "../book";
import { travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { BangladeshOutline } from "./BangladeshOutline";
import { MAP_VIEWBOX, project, routeCurves } from "./geo";
import "./map.css";

export function RouteMap({ trips, current, onNavigate }: { trips: Trip[]; current: number; onNavigate: (index: number) => void }) {
  const active = trips[current];
  const point = project(active);
  const { path } = routeCurves(trips.map(project));
  const progressId = useId();
  return <><svg className="journey-route-backdrop" viewBox={MAP_VIEWBOX} aria-hidden="true">
    <BangladeshOutline />
  </svg><aside className="travel-route-map" aria-label={c.mapLabel}>
    <p className="travel-label">{c.mapLabel}</p>
    <div className="travel-map-drawing">
      <svg viewBox={MAP_VIEWBOX} className="travel-map-svg" aria-label={c.mapLabel}>
        <BangladeshOutline />
        <path className="route-upcoming" d={path} />
        <defs>
          <mask id={progressId} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="520">
            <path className="route-visited" d={path} pathLength="1" strokeDasharray="1" />
          </mask>
        </defs>
        <path className="route-progress" d={path} mask={`url(#${progressId})`} />
        {trips.map((trip, index) => {
          const position = project(trip);
          const state = index === current ? "active" : index < current ? "visited" : "upcoming";
          return <a className="route-pin" href={`#trip-${trip.slug}`} key={trip.slug} data-state={state} aria-label={c.mapPinLabel(trip.place)} aria-current={index === current ? "location" : undefined} onClick={event => { event.preventDefault(); onNavigate(index); }}>
            <circle className="route-pin-target" cx={position.x} cy={position.y} r="22" />
            <circle className="route-pin-halo" cx={position.x} cy={position.y} r="15" />
            <circle className="route-pin-dot" cx={position.x} cy={position.y} r="6" />
          </a>;
        })}
      </svg>
      <div className="route-thumbnail" key={active.slug} style={{ left: `${point.x / 4}%`, top: `${point.y / 5.2}%` }} aria-hidden="true">
        <Image src={active.photos[0].src} width={active.photos[0].width} height={active.photos[0].height} sizes="72px" unoptimized={active.photos[0].src.startsWith("https://")} alt="" loading="lazy" />
      </div>
    </div>
    <div className="route-current" aria-live="polite">
      <p className="route-current-place">{active.place}</p>
      <time dateTime={active.date}>{formatTripDate(active.date)}</time>
      <p>{active.story.split(/(?<=[.!?।])\s+/)[0]}</p>
      <dl>
        <div><dt>{c.mapStopLabel}</dt><dd>{current + 1} / {trips.length}</dd></div>
        <div><dt>{c.mapPhotosLabel}</dt><dd>{active.photos.length}</dd></div>
      </dl>
    </div>
    <p className="route-map-note">{c.mapNote}</p>
  </aside></>;
}
