import { shell, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

export default function About() {
  return <div className="container page-shell">
    <SectionLabel>{site.name}</SectionLabel>
    <h1>{shell.aboutTitle}</h1>
    {site.about.map((text) => <p key={text}>{text}</p>)}
  </div>;
}
