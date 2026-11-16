import { shell } from "@/content/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { diagrams, diagramContent as c } from "@/content/diagrams";
import { ArchitectureDiagram } from "@/features/diagram/ArchitectureDiagram";
import { pageMetadata } from "@/seo/metadata";
import "./architecture.css";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const diagram = diagrams[slug];
  if (!diagram) notFound();
  return pageMetadata(diagram.title, diagram.description, c.path(slug));
}
export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  const diagram = diagrams[slug];
  return (
    <div className="container page-shell architecture-page">
      <p className="label">{c.title}</p>
      <h1>{diagram.title}</h1>
      <ArchitectureDiagram diagram={diagram} />
      <Link href={shell.projectHref(slug)}>{c.back}</Link>
    </div>
  );
}
