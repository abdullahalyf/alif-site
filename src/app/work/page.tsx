import { WorkSubnav } from "@/components/work-subnav";
import { ArrowUpRight } from "@/components/arrows";
import Image from "next/image";
import Link from "next/link";
import { demoContent, pageContent, shell, site, seo } from "@/content/site";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { HoverPreview } from "@/components/motion";
import { Hackathons } from "@/components/hackathons";
import { ProjectFilter } from "./ProjectFilter";
import "./work-index.css";

export const metadata = pageMetadata(seo.pages.work.title, seo.pages.work.description, seo.pages.work.path);

export default function Work() {
  const entries = projects.map((project) => {
    const image = project.images[0];
    const featured = project.slug === "multi-branch-pos";
    const row = <Link className="work-row" data-featured={featured || undefined} href={shell.projectHref(project.slug)}>
        <span className="work-thumbnail">
          {image && <Image src={image.src} width={image.width} height={image.height} alt="" sizes={featured ? "(max-width: 768px) calc(100vw - 3rem), 36vw" : "(max-width: 768px) 72px, 112px"} fetchPriority={featured ? "high" : undefined} loading={featured ? "eager" : undefined} />}
        </span>
        <div className="work-row__copy">
          {featured && <p className="label work-featured-label">{pageContent.featuredProject}</p>}
          <p className="label">{project.category} · {project.year}{project.demo && ` · ${demoContent.demoLabel}`}</p>
          <h2>{project.title}</h2>
          <p className="work-outcome">{featured ? project.summary : (project.results[0] ?? project.summary)}</p>
          {featured && project.metrics[0] && <p className="work-featured-metric">{project.metrics[0].value} · {project.metrics[0].label}</p>}
        </div>
        <ArrowUpRight className="work-arrow" />
      </Link>;
    return {
      slug: project.slug,
      category: project.category,
      featured,
      row: image && !featured ? <HoverPreview {...image} size={232}>{row}</HoverPreview> : row,
    };
  });

  return <div className="container section-space">
      <WorkSubnav current="/work" />

    <SectionLabel>{site.name}</SectionLabel>
    <div className="page-intro"><h1>{shell.workTitle}</h1><p>{pageContent.workIntro}</p></div>
    <noscript><style>{".work-filter { display: none; }"}</style></noscript>
    <ProjectFilter label={pageContent.workFilter} allLabel={pageContent.allWorkCategories} emptyLabel={pageContent.workEmpty} entries={entries} />
    <Hackathons />
  </div>;
}
