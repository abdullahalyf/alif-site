import { Highlights, AtAGlance, Testimonials, LatestWriting } from "@/components/demo/sections";
import { seo } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { PersonJsonLd } from "@/components/person-json-ld";
import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { HowIWork } from "@/components/home/how-i-work";
import { SelectedWork } from "@/components/home/selected-work";
import { Services } from "@/components/home/services";

export const metadata = {
  ...pageMetadata(seo.pages.home.title, seo.pages.home.description, seo.pages.home.path),
  title: { absolute: seo.pages.home.title },
};

export default function Home() {
  return <><PersonJsonLd /><Hero /><AtAGlance /><AboutTeaser /><Highlights /><HowIWork /><Services /><SelectedWork /><Testimonials /><LatestWriting /></>;
}
