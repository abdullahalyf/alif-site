import { usesContent as c, workSetupPhoto } from "@/content/uses";
import Image from "next/image";
import { pageMetadata } from "@/seo/metadata";
import { Reveal, StaggerIn } from "@/components/motion";
import "./uses.css";
export const metadata = pageMetadata(c.title, c.intro, "/uses");
export default function UsesPage() {
  return (
    <div className="container page-shell uses-page">
      <header>
        <Reveal><h1>{c.title}</h1></Reveal>
        <Reveal><p className="lead">{c.intro}</p></Reveal>
      </header>
      <Image {...workSetupPhoto} alt={workSetupPhoto.alt} className="uses-setup" sizes="(min-width: 64rem) 36rem, calc(100vw - 3rem)" />
      {c.groups.map((group) => (
        <section key={group.title}>
          <Reveal><h2>{group.title}</h2></Reveal>
          <StaggerIn as="ul">
            {group.items.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.why}</p>
              </li>
            ))}
          </StaggerIn>
        </section>
      ))}
    </div>
  );
}
