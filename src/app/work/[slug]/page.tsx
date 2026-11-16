import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { shell } from "@/content/site";
import { SectionLabel } from "@/components/section-label";

// Wait for the static result so missing projects return HTTP 404 before streaming.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <article className="container page-shell">
    <SectionLabel>{shell.caseStudyLabel}</SectionLabel>
    <p className="label">{project.client} · {project.year} · {project.role}</p>
    <h1>{project.title}</h1>
    <p>{project.summary}</p>
  </article>;
}
