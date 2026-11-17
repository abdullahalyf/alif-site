import { trips, travelContent as c } from "@/content/travel";
import { routeDistanceKm } from "./map/geo";

export function TravelStats() {
  const stats = [
    [c.statsTrips, String(trips.length)],
    [c.statsDistricts, String(new Set(trips.map(trip => trip.district)).size)],
    [c.statsDistance, `${Math.round(routeDistanceKm(trips)).toLocaleString("en")} ${c.distanceUnit}`],
    [c.statsSeason, c.favouriteSeason],
  ];
  return <section className="container travel-stats" aria-labelledby="travel-stats-title"><h2 id="travel-stats-title" className="travel-label">{c.statsTitle}</h2><dl>{stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>{c.distanceNote}</p></section>;
}
