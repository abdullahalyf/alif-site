export type Coordinates = { lat: number; lng: number };
export const MAP_VIEWBOX = "0 0 400 520";
const radians = (degrees: number) => degrees * Math.PI / 180;

/** Local equirectangular projection centred on Bangladesh. */
export function project({ lat, lng }: Coordinates) {
  return { x: 200 + (lng - 90.35) * Math.cos(radians(23.65)) * 70, y: 260 - (lat - 23.65) * 70 };
}
export function distanceKm(first: Coordinates, second: Coordinates): number {
  const dLat = radians(second.lat - first.lat);
  const dLng = radians(second.lng - first.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(first.lat)) * Math.cos(radians(second.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}
export function routeDistanceKm(points: Coordinates[]): number {
  return points.slice(1).reduce((total, point, index) => total + distanceKm(points[index], point), 0);
}
export function routePath(points: Coordinates[]): string {
  return points.map((point, index) => { const { x, y } = project(point); return `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`; }).join(" ");
}
