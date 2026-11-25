import Link from "next/link";
import { travelContent as c } from "@/content/travel";
import { PhotoBook } from "@/features/travel/PhotoBook";
import { pageMetadata } from "@/seo/metadata";
import { InternationalTrips } from "@/features/travel/InternationalTrips";
import { TravelStats } from "@/features/travel/TravelStats";
import { PlacesGrid } from "@/features/travel/PlacesGrid";
import { AboutSubnav } from "@/components/work-subnav";
import "./travel.css";

export const metadata = pageMetadata(c.title, c.description, c.path);

export default function TravelPage() {
  return <div className="travel-page">
    <header className="container travel-page-hero">
      <AboutSubnav current="/travel" /><h1>{c.title}</h1><p className="travel-page-intro">{c.intro}</p>
    </header>
    <TravelStats />
    <PhotoBook />
    <InternationalTrips />
    <PlacesGrid />
    <div className="container travel-closing"><p>{c.closing}</p><Link className="text-link" href={c.aboutPath}>{c.aboutLink}</Link></div>
  </div>;
}
