import type { Trip } from "./schemas/travel";
import { photoSlot } from "./photo-slots";

function photo(slug: string, index: number, place: string) {
  const number = String(index).padStart(2, "0");
  return { ...photoSlot(`travel-${slug}-${index}`, 1200, 900, `${place}, photograph ${index}`), caption: `${place} · ${number}` };
}

export const trips = [
  {
    scope: "national", country: "Bangladesh", slug: "sitakunda",
    lat: 22.62, lng: 91.66, color: "#dce9ed", district: "Chattogram",
    place: "Sitakunda", region: "Chattogram",
    title: "Standing in the water at Sitakunda",
    story: "A grey, quiet day on the coast at Sitakunda, with the water so shallow I could walk out into it. The horizon was nearly flat in every direction.",
    tags: ["coast", "chattogram"],
    photos: [{ ...photo("sitakunda", 1, "Sitakunda"), width: 203, height: 206, alt: "Abdullah Alif standing in shallow water on the coast at Sitakunda", caption: "Sitakunda, Chattogram" }],
  },
  {
    scope: "national", country: "Bangladesh", slug: "hatiya",
    lat: 22.29, lng: 91.1, color: "#e4ead5", district: "Noakhali",
    place: "Hatiya", region: "Chattogram",
    title: "A wide beach on Hatiya island",
    story: "Hatiya is an island off the Noakhali coast. The beach was open and empty, with the tide far out.",
    tags: ["island", "coast"],
    photos: [{ ...photo("hatiya", 1, "Hatiya"), width: 205, height: 206, alt: "Abdullah Alif in a striped jumper on the beach at Hatiya", caption: "Hatiya, Noakhali" }],
  },
  {
    scope: "national", country: "Bangladesh", slug: "tangail-201-dome",
    lat: 24.56, lng: 89.92, color: "#e7e9d7", district: "Tangail",
    place: "201 Dome Mosque, Tangail", region: "Dhaka",
    title: "Among the domes in Tangail",
    story: "The 201 Dome Mosque in Gopalpur, Tangail, is covered in rows of small golden domes. I watched them from the roof for a long time.",
    tags: ["architecture", "mosque"],
    photos: [{ ...photo("tangail-201-dome", 1, "201 Dome Mosque"), width: 206, height: 206, alt: "Abdullah Alif seen from behind, looking at the golden domes of the 201 Dome Mosque in Tangail", caption: "201 Dome Mosque, Tangail" }],
  },
] satisfies Trip[];

export const internationalTrips = [
  {
    scope: "international", country: "Malaysia", slug: "putrajaya",
    lat: 2.936, lng: 101.689, color: "#dfe7db", district: "Putrajaya",
    place: "Putrajaya", region: "Putrajaya", date: "2025-06",
    title: "In front of Putra Mosque",
    story: "My trip to Malaysia was in June 2025, around Eid. In Putrajaya I stood in front of Putra Mosque, with its pink stone gate behind me.",
    tags: ["malaysia", "architecture"],
    photos: [{ ...photo("putrajaya", 1, "Putrajaya"), alt: "Abdullah Alif in sunglasses in front of Putra Mosque in Putrajaya", caption: "Putra Mosque, Putrajaya" }],
  },
  {
    scope: "international", country: "Malaysia", slug: "langkawi",
    lat: 6.35, lng: 99.8, color: "#e4ead5", district: "Langkawi",
    place: "Langkawi", region: "Kedah", date: "2025-06",
    title: "Langkawi, from the street to the Sky Bridge",
    story: "Langkawi was the slower part of the trip. One photo is a short break on a street in town; the other is from the Sky Bridge, with cable cars in the distance and hills fading into cloud.",
    tags: ["malaysia", "island"],
    photos: [
      { ...photo("langkawi", 1, "Langkawi"), width: 640, height: 640, alt: "Abdullah Alif sitting by a tree on a street in Langkawi", caption: "A street in Langkawi" },
      { ...photo("langkawi", 2, "Langkawi"), alt: "Abdullah Alif at the Langkawi Sky Bridge viewpoint, with misty hills behind", caption: "Langkawi Sky Bridge" },
    ],
  },
] satisfies Trip[];

export const allTrips: Trip[] = [...trips, ...internationalTrips];

export type TravelStop = {
  slug: string; place: string; title: string; note: string;
  quote?: { text: string; by: string };
  image: { src: string; width: number; height: number; alt: string };
};

export const travelStops: TravelStop[] = [
  {
    slug: "putrajaya", place: "Putrajaya, Malaysia", title: "In front of Putra Mosque",
    note: "The pink stone gate of Putra Mosque behind me, June 2025.",
    quote: { text: "A journey of a thousand miles begins with a single step.", by: "Lao Tzu" },
    image: photoSlot("travel-malaysia-putrajaya", 1200, 900, "Abdullah Alif in sunglasses in front of Putra Mosque in Putrajaya, Malaysia"),
  },
  {
    slug: "langkawi", place: "Langkawi, Malaysia", title: "A quiet stop in Langkawi",
    note: "A short break on the street in Langkawi, June 2025.",
    image: photoSlot("travel-langkawi", 640, 640, "Abdullah Alif sitting by a tree on a street in Langkawi, Malaysia"),
  },
  {
    slug: "langkawi", place: "Langkawi, Malaysia", title: "Langkawi Sky Bridge",
    note: "Cable cars in the distance and green hills fading into cloud.",
    quote: { text: "Travel is fatal to prejudice, bigotry, and narrow-mindedness.", by: "Mark Twain" },
    image: photoSlot("travel-viewpoint", 1200, 900, "Abdullah Alif leaning on a railing at the Langkawi Sky Bridge viewpoint, with misty hills behind"),
  },
  {
    slug: "sitakunda", place: "Sitakunda · Hatiya · Tangail", title: "Coasts, islands and golden domes",
    note: "Sitakunda, the beach on Hatiya island, the 201 Dome Mosque in Tangail, and Jahangirnagar.",
    image: photoSlot("travel-bangladesh-snapshots", 640, 360, "Four snapshots: in shallow water at Sitakunda, on the beach at Hatiya, looking at the 201 Dome Mosque in Tangail, and holding a flag at Jahangirnagar"),
  },
];

export const travelContent = {
  path: "/travel",
  title: "Travel",
  tripHref: (slug: string) => `/travel/${slug}`,
  readTrip: "Read this travel note",
  backToTravel: "Back to Travel",
  storyTitle: "A note from the road",
  galleryTitle: "Pages from the camera roll",
  galleryHint: "Select a photograph to see it larger.",
  openPhoto: (index: number, place: string) => `Open photograph ${index} from ${place}`,
  closeGallery: "Close",
  previousPhoto: "Previous photograph",
  nextPhoto: "Next photograph",
  lightboxHint: "Use arrow keys or swipe to browse. Escape closes the gallery.",
  journeyNavigation: "More travel notes",
  internationalTitle: "International",
  internationalIntro: "Travel notes from beyond Bangladesh.",
  internationalOrigin: { place: "Dhaka", lat: 23.8103, lng: 90.4125 },
  internationalMapLabel: "International routes from Dhaka",
  internationalRouteLabel: (destinations: string[]) => `Route from Dhaka to ${destinations.join(", ")}`,
  placeMapLabel: (place: string) => `${place} on a map of Bangladesh`,
  locationNote: "An approximate location on the map.",
  intro: "Across Bangladesh, I travel to see how people live, hear their stories and come home with better questions.",
  closing: "Some journeys take me somewhere new. Others help me see home a little more clearly.",
  description: "A photo-book of travel notes, people and places across Bangladesh and beyond.",
  bookTitle: "A few pages from the road",
  bookLabel: "Travel photo-book",
  desktopHint: "Scroll or drag to browse. At either end, keep scrolling to move down or up the page. Use the arrow keys when the book is focused.",
  swipeHint: "Swipe through the pages, or use the left and right arrow keys.",
  listHint: "One journey per page.",
  previous: "Previous journey",
  next: "Next journey",
  progress: "Travel book progress",
  peopleLabel: "A conversation along the way",
  mapLabel: "The journey so far",
  mapStopLabel: "Stop",
  mapPhotosLabel: "Photos",
  mapNote: "Approximate locations. Select a pin to turn to its page.",
  mapPinLabel: (place: string) => `Turn to ${place}`,
  statsTitle: "At a glance",
  statsTrips: "Journeys on these pages",
  statsDistricts: "Districts visited",
  statsDistance: "Route distance",
  statsSeason: "Countries",
  distanceUnit: "km",
  countries: "Bangladesh, Malaysia",
  distanceNote: "Straight-line distance between the places on these pages, not kilometres travelled. I have visited 24 of Bangladesh’s 64 districts so far.",
  filtersLabel: "Filter travel notes",
  regionLabel: "Region",
  tagLabel: "Tag",
  allRegions: "All regions",
  allTags: "All tags",
  resetFilters: "Show all places",
  resultsCount: (count: number) => `${count} ${count === 1 ? "place" : "places"}`,
  noPlaces: "No places match these filters. Try another region or tag.",
  placesTitle: "Places I've been",
  teaserIntro: "Places I've been and people I've met",
  teaserTitle: "A few notes from the road",
  homeTeaserTitle: "I travel",
  homeTeaserIntro: "I travel across Bangladesh and talk to people — it shapes how I design systems.",
  moreStories: "More travel stories",
  writingTravelLink: "Browse Travel in Writing",
  teaserStripLabel: "Recent travel photos",
  teaserProgress: "Travel photo strip position",
  openJournal: "Open the travel journal",
  allTravels: "See all travels",
  aboutLink: "More about me",
  aboutPath: "/about",
};

export function getTrip(slug: string): Trip | undefined { return allTrips.find(trip => trip.slug === slug); }
