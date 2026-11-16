import { notFound } from "next/navigation";
import { getProject } from "@/content/projects";
import { seo, shell, site } from "@/content/site";
import { getBaseUrl } from "@/seo/base-url";

export default async function ProjectLayout({ children, params }: LayoutProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const data = {
    "@context": seo.schemaContext,
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: new URL(shell.projectHref(project.slug), getBaseUrl()).href,
    genre: project.category,
    temporalCoverage: String(project.year),
    keywords: project.stack,
    creator: { "@type": "Person", name: site.fullName },
  };
  return <>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /></>;
}
