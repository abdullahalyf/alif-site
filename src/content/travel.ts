import type { Trip } from "./schemas/travel";
// DEMO: local seeded Picsum placeholders (1200×900, JPEG quality 75), not photographs of the named destinations.
function photo(slug: string, index: number, place: string) {
  return { src: `/images/travel/${slug}/${index}.jpg`, width: 1200, height: 900, alt: `DEMO photograph for the ${place} travel note`, caption: `DEMO · ${place} · ${String(index).padStart(2, "0")}` };
}

export const trips = [
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "sylhet-tea",
    lat: 24.918, lng: 91.921, color: "#e4ead5", district: "Sylhet",
    "place": "Sylhet tea gardens",
    "region": "Sylhet",
    "date": "2026-10",
    "title": "The quiet between the rows",
    "story": "DEMO — A narrow path winds between tea bushes after a morning shower. I stop for a cup of tea and let the afternoon lose its hurry. The best part of this imagined journey is the conversation rather than the view.",
    "tags": [
      "tea",
      "landscape"
    ],
    "people": "DEMO — a tea grower sharing stories about the changing seasons",
    photos: [photo("sylhet-tea", 1, "Sylhet tea gardens"), photo("sylhet-tea", 2, "Sylhet tea gardens"), photo("sylhet-tea", 3, "Sylhet tea gardens")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "sundarbans",
    lat: 22.08, lng: 89.55, color: "#dfe7db", district: "Khulna",
    "place": "Sundarbans",
    "region": "Khulna",
    "date": "2026-08",
    "title": "Following the water",
    "story": "DEMO — The river sets the pace of this imagined visit to the mangroves. Trees lean towards the water and the boat grows quiet between bends. I come away thinking about how much a place can teach you when you listen first.",
    "tags": [
      "river",
      "forest"
    ],
    "people": "DEMO — a boat guide explaining the rhythm of the tides",
    photos: [photo("sundarbans", 1, "Sundarbans"), photo("sundarbans", 2, "Sundarbans")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "coxs-bazar",
    lat: 21.427, lng: 92.005, color: "#dce9ed", district: "Cox’s Bazar",
    "place": "Cox’s Bazar",
    "region": "Chattogram",
    "date": "2026-06",
    "title": "A longer way to the sea",
    "story": "DEMO — I reach the beach before the busiest part of the evening in this sample travel note. Fishing boats rest above the waterline while the light softens. There is no particular destination left for the day, just a walk along the shore.",
    "tags": [
      "coast",
      "walking"
    ],
    "people": "DEMO — a fisherman talking about early starts and uncertain weather",
    photos: [photo("coxs-bazar", 1, "Cox’s Bazar"), photo("coxs-bazar", 2, "Cox’s Bazar"), photo("coxs-bazar", 3, "Cox’s Bazar")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "bandarban",
    lat: 22.195, lng: 92.218, color: "#e1e6e8", district: "Bandarban",
    "place": "Bandarban hills",
    "region": "Chattogram",
    "date": "2026-03",
    "title": "Room to look further",
    "story": "DEMO — Mist moves between the hills on an imagined early walk. A roadside stop becomes a slow breakfast and a chance to hear about life away from the city. I leave space in the plan for the places I did not know to ask about.",
    "tags": [
      "hills",
      "walking"
    ],
    "people": "DEMO — a roadside host sharing breakfast and local directions",
    photos: [photo("bandarban", 1, "Bandarban hills"), photo("bandarban", 2, "Bandarban hills")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "sreemangal",
    lat: 24.306, lng: 91.729, color: "#e4ebd7", district: "Moulvibazar",
    "place": "Sreemangal",
    "region": "Sylhet",
    "date": "2025-12",
    "title": "An afternoon without a schedule",
    "story": "DEMO — This sample journey follows small roads past tea estates and village shops. I put the map away for a while and ask where people like to walk. A quiet afternoon feels like enough of a reason to travel.",
    "tags": [
      "tea",
      "slow-travel"
    ],
    "people": "DEMO — a shopkeeper recommending a favourite afternoon route",
    photos: [photo("sreemangal", 1, "Sreemangal")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "rajshahi",
    lat: 24.374, lng: 88.603, color: "#efe5c8", district: "Rajshahi",
    "place": "Rajshahi",
    "region": "Rajshahi",
    "date": "2025-10",
    "title": "By the river at dusk",
    "story": "DEMO — A broad riverbank becomes a meeting place as the day cools in this imagined visit. People pause to talk, eat and watch the light move across the water. I stay until the city begins to sound like evening.",
    "tags": [
      "city",
      "river"
    ],
    "people": "DEMO — a student talking about studying and growing up beside the Padma",
    photos: [photo("rajshahi", 1, "Rajshahi"), photo("rajshahi", 2, "Rajshahi")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "kuakata",
    lat: 21.816, lng: 90.12, color: "#f4dfcf", district: "Patuakhali",
    "place": "Kuakata",
    "region": "Barishal",
    "date": "2025-08",
    "title": "Where the day opens",
    "story": "DEMO — In this sample chapter, the horizon arrives before the rest of the morning. The beach is still quiet enough to hear footsteps beside the surf. I take fewer photographs than planned and remember the walk more clearly.",
    "tags": [
      "coast",
      "sunrise"
    ],
    "people": "DEMO — a tea seller describing the beach through different seasons",
    photos: [photo("kuakata", 1, "Kuakata"), photo("kuakata", 2, "Kuakata"), photo("kuakata", 3, "Kuakata")],
  },
  // DEMO: this entire journey is illustrative copy for Alif to replace.
  {
    scope: "national", country: "Bangladesh",
    "slug": "jhenaidah-home",
    lat: 23.544, lng: 89.153, color: "#eee3d2", district: "Jhenaidah",
    "place": "Jhenaidah",
    "region": "Khulna",
    "date": "2025-06",
    "title": "The familiar road home",
    "story": "DEMO — Going home can be a journey too, even when the turns are familiar. This illustrative chapter follows a walk past old shops and open fields. The details are waiting for Alif to replace them with his own memories.",
    "tags": [
      "home",
      "everyday-life"
    ],
    photos: [photo("jhenaidah-home", 1, "Jhenaidah"), photo("jhenaidah-home", 2, "Jhenaidah")],
  },
] satisfies Trip[];

export const internationalTrips = [
  // DEMO: imagined story and generated photographs for Kuala Lumpur.
  {
    scope: "international", country: "Malaysia", slug: "kuala-lumpur",
    lat: 3.1579, lng: 101.7123, color: "#e7e9d7", district: "Kuala Lumpur",
    place: "Kuala Lumpur", region: "Kuala Lumpur", date: "2026-04",
    title: "A morning in Kuala Lumpur",
    story: "DEMO — In this imagined visit, the towers come into view across the park before the city gets busy. Later, I follow the covered market lanes past the old shophouses and stop for breakfast.",
    tags: ["city", "walking"],
    photos: [
      { ...photo("kuala-lumpur", 1, "Kuala Lumpur"), alt: "Illustrated view of the Petronas Twin Towers from KLCC Park", caption: "DEMO · KLCC Park · generated image" },
      { ...photo("kuala-lumpur", 2, "Kuala Lumpur"), alt: "Illustration of a quiet covered market lane in Kuala Lumpur", caption: "DEMO · Market lane · generated image" },
    ],
  },
] satisfies Trip[];

export const allTrips: Trip[] = [...trips, ...internationalTrips];

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
  internationalRouteLabel: (destinations: string[]) => `Illustrative route from Dhaka to ${destinations.join(", ")}`,
  placeMapLabel: (place: string) => `${place} on a map of Bangladesh`,
  locationNote: "DEMO — an approximate location, not a recorded travel track.",
  // DEMO: replace the travel-page introduction and closing with Alif’s own words.
  intro: "Across Bangladesh, I travel to see how people live, hear their stories and come home with better questions.",
  closing: "Some journeys take me somewhere new. Others help me see home a little more clearly.", // DEMO
  description: "A photo-book of travel notes, people and places across Bangladesh and beyond.", // DEMO
  demoNotice: "DEMO travel notes and illustrative photographs.",
  bookTitle: "A few pages from the road",
  bookLabel: "Travel photo-book",
  desktopHint: "Scroll or drag to browse. At either end, keep scrolling to move down or up the page. Use the arrow keys when the book is focused.",
  swipeHint: "Swipe through the pages, or use the left and right arrow keys.",
  listHint: "Eight journeys, one page at a time.",
  previous: "Previous journey",
  next: "Next journey",
  progress: "Travel book progress",
  peopleLabel: "A conversation along the way",
  mapLabel: "The journey so far",
  mapNote: "Approximate demo locations. Select a pin to turn to its page.",
  mapPinLabel: (place: string) => `Turn to ${place}`,
  statsTitle: "At a glance",
  statsTrips: "Demo journeys",
  statsDistricts: "Districts visited",
  statsDistance: "Route distance",
  statsSeason: "Favourite season",
  distanceUnit: "km",
  favouriteSeason: "Winter · DEMO", // DEMO: Alif to confirm.
  distanceNote: "DEMO route — straight-line distance between approximate locations, not actual kilometres travelled.",
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
  teaserStripLabel: "Recent travel photos",
  teaserProgress: "Travel photo strip position",
  openJournal: "Open the travel journal",
  allTravels: "See all travels",
  aboutLink: "More about me",
  aboutPath: "/about",
};

export function getTrip(slug: string): Trip | undefined { return allTrips.find(trip => trip.slug === slug); }
