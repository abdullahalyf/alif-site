import Link from "next/link";
import { shell, site } from "@/content/site";
import { projects } from "@/content/projects";
import { SectionLabel } from "@/components/section-label";

export default function Work() {
  return <div className="container page-shell">
    <SectionLabel>{site.name}</SectionLabel>
    <h1>{shell.workTitle}</h1>
    {projects.map((project) => <article className="placeholder-row" key={project.slug}>
      <p className="label">{project.year} · {project.category}</p>
      <h2><Link href={shell.projectHref(project.slug)}>{project.title}</Link></h2>
      <p>{project.summary}</p>
    </article>)}
  </div>;
}
