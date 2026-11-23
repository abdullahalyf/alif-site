import { hackathonContent, hackathons } from "@/content/site";
import type { Hackathon } from "@/content/schema";
import { SectionLabel } from "@/components/section-label";

export function Hackathons({ items = hackathons }: { items?: Hackathon[] }) {
  if (!items.length) return null;
  return <section className="section-space" aria-labelledby="hackathons-title">
    <SectionLabel>{hackathonContent.label}</SectionLabel>
    <h2 id="hackathons-title" className="section-title">{hackathonContent.title}</h2>
    <ul className="hackathon-list">{items.map((item) => <li key={item.name}>
      <h3>{item.name}</h3>
      <p className="label">{item.role}</p>
      <p>{item.result}</p>
      <p>{item.github && <a href={item.github}>{hackathonContent.github}</a>}{item.github && item.live && " · "}{item.live && <a href={item.live}>{hackathonContent.live}</a>}</p>
    </li>)}</ul>
  </section>;
}
