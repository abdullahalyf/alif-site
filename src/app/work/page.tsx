import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { demoContent, pageContent, shell, site, seo } from "@/content/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { HoverPreview, Reveal } from "@/components/motion";

export const metadata = pageMetadata(seo.pages.work.title, seo.pages.work.description, seo.pages.work.path);

export default function Work() {
  return <div className="container section-space">
    <SectionLabel>{site.name}</SectionLabel>
    <div className="page-intro"><Reveal><h1>{shell.workTitle}</h1></Reveal><Reveal><p>{pageContent.workIntro}</p></Reveal></div>
    <ul className="work-list">{projects.map((project) => {
      const image = project.images[0];
      return <li key={project.slug}>
        <HoverPreview
          className="work-row-wrap"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          size={320}
        >
          <Link className="work-row" href={shell.projectHref(project.slug)}>
            <span className="label">{project.year} · {project.category}{project.demo && ` · ${demoContent.demoLabel}`}</span>
            <h2 id={`work-${project.slug}`}>{project.title}</h2>
            <ArrowUpRight className="work-arrow" />
          </Link>
        </HoverPreview>
      </li>;
    })}</ul>
  </div>;
}
