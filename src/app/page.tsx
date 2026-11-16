import { seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { PersonJsonLd } from "@/components/person-json-ld";
import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { Services } from "@/components/home/services";

export const metadata = pageMetadata(seo.pages.home.title, seo.pages.home.description, seo.pages.home.path);

export default function Home() {
  return <><PersonJsonLd /><Hero /><AboutTeaser /><Services /></>;
}
