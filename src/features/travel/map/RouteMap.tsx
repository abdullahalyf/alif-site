import Image from "next/image";
import { useId } from "react";
import { travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import { BangladeshOutline } from "./BangladeshOutline";
import { MAP_VIEWBOX, project, routePath } from "./geo";
import "./map.css";

export function RouteMap({ trips, current, onNavigate }: { trips: Trip[]; current: number; onNavigate: (index: number) => void }) {
  const mask = useId();
  const active = trips[current];
  const point = project(active);
  const path = routePath(trips);
  return <aside className="travel-route-map" aria-label={c.mapLabel}>
    <p className="travel-label">{c.mapLabel}</p>
    <div className="travel-map-drawing">
      <svg viewBox={MAP_VIEWBOX} className="travel-map-svg" aria-label={c.mapLabel}>
        <BangladeshOutline />
        <path className="route-upcoming" d={path} />
        <defs><mask id={mask}><path className="route-draw-mask" d={path} pathLength="1" strokeDasharray="1" strokeDashoffset="0" fill="none" stroke="white" strokeWidth="5" /></mask></defs>
        <path className="route-visited" d={path} mask={`url(#${mask})`} />
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
        <Image src={active.photos[0].src} width={active.photos[0].width} height={active.photos[0].height} sizes="72px" unoptimized alt="" loading="lazy" />
      </div>
    </div>
    <p className="route-current-place" aria-live="polite">{active.place}</p>
    <p className="route-map-note">{c.mapNote}</p>
  </aside>;
}
