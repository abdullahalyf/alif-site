import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { demoContent, navHref, shell, workContent } from "@/content/site";
import { projects } from "@/content/projects";
import { SectionLabel } from "@/components/section-label";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/motion";
import { WorkCarousel } from "./work-carousel";

export function SelectedWork() {
  return <section className="band-surface section-space selected-work" aria-labelledby="selected-title">
    <div className="container">
      <SectionLabel>{workContent.selectedLabel}</SectionLabel>
      <div className="section-heading"><Reveal><h2 id="selected-title">{workContent.selectedTitle}</h2></Reveal><Reveal><Link className="text-link" href={navHref("/work")}>{workContent.allWork}<ArrowUpRight /></Link></Reveal></div>
      <WorkCarousel>{projects.map((project) => <li className="project-card" key={project.slug}>
        <Link href={shell.projectHref(project.slug)}>
          <ProjectMedia image={project.images[0]} />
          <p className="label category-tag" data-category={project.category}>{project.category}{project.demo && ` · ${demoContent.demoLabel}`}</p>
          <h3 id={`project-${project.slug}`}>{project.title}</h3>
          <p>{project.summary}</p>
        </Link>
      </li>)}</WorkCarousel>
    </div>
  </section>;
}
