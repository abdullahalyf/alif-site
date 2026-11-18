import { ArrowUpRight } from "@/components/arrows";
import Image from "next/image";
import Link from "next/link";
import { demoContent, pageContent, shell, site, seo } from "@/content/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";
import { ProjectFilter } from "./ProjectFilter";

export const metadata = pageMetadata(seo.pages.work.title, seo.pages.work.description, seo.pages.work.path);

export default function Work() {
  const entries = projects.map((project) => {
    const image = project.images[0];
    return {
      slug: project.slug,
      category: project.category,
      row: <Link className="work-row" href={shell.projectHref(project.slug)}>
        <span className="work-thumbnail">
          {image && <Image src={image.src} width={image.width} height={image.height} alt="" sizes="(max-width: 768px) 64px, 144px" />}
        </span>
        <div className="work-row__copy">
          <p className="label">{project.category} · {project.year}{project.demo && ` · ${demoContent.demoLabel}`}</p>
          <h2>{project.title}</h2>
          <p className="work-outcome">{project.results[0] ?? project.summary}</p>
        </div>
        <ArrowUpRight className="work-arrow" />
      </Link>,
    };
  });

  return <div className="container section-space">
    <SectionLabel>{site.name}</SectionLabel>
    <div className="page-intro"><Reveal><h1>{shell.workTitle}</h1></Reveal><Reveal><p>{pageContent.workIntro}</p></Reveal></div>
    <ProjectFilter label={pageContent.workFilter} allLabel={pageContent.allWorkCategories} entries={entries} />
  </div>;
}
