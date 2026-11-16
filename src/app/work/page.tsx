import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { demoContent, pageContent, shell, site, seo } from "@/content/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { ProjectMedia } from "@/components/project-media";

export const metadata = pageMetadata(seo.pages.work.title, seo.pages.work.description, seo.pages.work.path);

export default function Work() {
  return <div className="container section-space">
    <SectionLabel>{site.name}</SectionLabel>
    <div className="page-intro"><h1>{shell.workTitle}</h1><p>{pageContent.workIntro}</p></div>
    <ul className="work-list">{projects.map((project) => <li key={project.slug}>
      <Link className="work-row" href={shell.projectHref(project.slug)}>
        <span className="label">{project.year} · {project.category}{project.demo && ` · ${demoContent.demoLabel}`}</span>
        <h2 id={`work-${project.slug}`}>{project.title}</h2>
        <ArrowUpRight className="work-arrow" />
        <div className="work-preview" aria-hidden="true"><ProjectMedia image={project.images[0]} sizes="320px" /></div>
      </Link>
    </li>)}</ul>
  </div>;
}
