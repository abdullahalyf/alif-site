import Link from "next/link";
import { seo, site, writingContent } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import "../writing/writing.css";

export const metadata = pageMetadata(seo.pages.now.title, seo.pages.now.description, seo.pages.now.path);
export default function Now() {
  return <section className="container writing-page"><div className="post-article">
    <SectionLabel>{writingContent.nowLabel}</SectionLabel>
    <header className="writing-heading"><h1>{writingContent.nowTitle}</h1><p>{writingContent.nowIntro}</p></header>
    <ul className="now-list">{site.now.map((item) => <li key={item}>{item}</li>)}</ul>
    <nav className="post-neighbours" aria-label={writingContent.title}><Link href={seo.pages.writing.path}>{writingContent.back}</Link></nav>
  </div></section>;
}
