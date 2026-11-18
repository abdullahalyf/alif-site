import { travelContent as c } from "@/content/travel";
import type { Trip } from "@/content/schemas/travel";
import type { Coordinates } from "./geo";
import { worldOutline } from "./world-paths";
import "./map.css";

const worldPoint = ({ lng, lat }: Coordinates) => ({ x: lng + 180, y: 90 - lat });

export function InternationalMap({ trips }: { trips: Trip[] }) {
  const from = worldPoint(c.internationalOrigin);
  const stops = trips.map(trip => ({ ...worldPoint(trip), label: trip.place, slug: trip.slug }));
  const minX = Math.min(from.x, ...stops.map(stop => stop.x)) - 16;
  const maxX = Math.max(from.x, ...stops.map(stop => stop.x)) + 16;
  const minY = Math.min(from.y, ...stops.map(stop => stop.y)) - 10;
  const maxY = Math.max(from.y, ...stops.map(stop => stop.y)) + 12;
  const padding = Math.max(0, ((maxY - minY) * 1.45 - (maxX - minX)) / 2);
  const width = maxX - minX + padding * 2;
  const marker = width / 120;
  const destinations = [...new Set(stops.map(stop => stop.label))];

  return <figure className="international-map">
    <svg viewBox={`${minX - padding} ${minY} ${width} ${maxY - minY}`} role="img" aria-label={c.internationalRouteLabel(destinations)}>
      <path className="international-map-land" d={worldOutline} vectorEffect="non-scaling-stroke" />
      {stops.map(({ x, y, slug }) => {
        const distance = Math.hypot(x - from.x, y - from.y);
        return <path key={slug} className="international-map-route" d={`M${from.x},${from.y} Q${(from.x + x) / 2 + distance * 0.35},${(from.y + y) / 2 - distance * 0.3} ${x},${y}`} vectorEffect="non-scaling-stroke" />;
      })}
      {[{ ...from, slug: "origin", label: c.internationalOrigin.place }, ...stops].map(({ x, y, label, slug }) =>
        <g key={slug} className="international-map-stop" aria-hidden="true">
          <circle cx={x} cy={y} r={marker} />
          <text x={x + marker * 2} y={y - marker * 1.45} fontSize={marker * 3.4}>{label}</text>
        </g>
      )}
    </svg>
    <figcaption className="travel-label">{c.internationalMapLabel}</figcaption>
  </figure>;
}
