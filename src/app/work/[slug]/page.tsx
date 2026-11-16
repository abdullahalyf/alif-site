import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { pageContent, shell } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { ProjectMedia } from "@/components/project-media";
import { ButtonLink } from "@/components/button";

// Resolve missing projects before streaming so their HTTP status is 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.summary, shell.projectHref(project.slug));
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  return <article className="container section-space case-study">
    <SectionLabel>{shell.caseStudyLabel}</SectionLabel>
    <header className="case-intro">
      <p className="label">{project.client} · {project.year} · {project.role}</p>
      <h1>{project.title}</h1>
      <p className="lead">{project.summary}</p>
      {project.link && <div><ButtonLink href={project.link}>{pageContent.projectLink}</ButtonLink></div>}
    </header>
    <div className="case-cover"><ProjectMedia image={project.images[0]} sizes="(max-width: 768px) 100vw, 1216px" /></div>
    <div className="case-sections">
      <section className="case-section" aria-labelledby="problem-title"><h2 id="problem-title">{pageContent.problem}</h2><p>{project.problem}</p></section>
      <section className="case-section" aria-labelledby="solution-title"><h2 id="solution-title">{pageContent.solution}</h2><ul className="detail-list">{project.solution.map((text) => <li key={text}>{text}</li>)}</ul></section>
      <section className="case-section" aria-labelledby="stack-title"><h2 id="stack-title">{pageContent.stack}</h2><ul className="stack-pills">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></section>
      {project.results.length > 0 && <section className="case-section" aria-labelledby="results-title"><h2 id="results-title">{pageContent.results}</h2><ul className="detail-list">{project.results.map((text) => <li key={text}>{text}</li>)}</ul></section>}
    </div>
    {project.images.slice(1).map((image) => <ProjectMedia key={image.src} image={image} sizes="(max-width: 768px) 100vw, 1216px" />)}
    <nav className="next-project" aria-label={pageContent.nextProject}>
      <SectionLabel>{pageContent.nextProject}</SectionLabel>
      <Link href={shell.projectHref(next.slug)}><span>{next.title}</span><span aria-hidden="true">↗</span></Link>
    </nav>
  </article>;
}
