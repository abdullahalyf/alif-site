import { WorkSubnav } from "@/components/work-subnav";
import { pageContent, shell, site, seo } from "@/content/site";
import { projects } from "@/content/projects";
import { projectCategories } from "@/content/schema";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { Hackathons } from "@/components/hackathons";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCard";
import "./work-index.css";

export const metadata = pageMetadata(seo.pages.work.title, seo.pages.work.description, seo.pages.work.path);

const labels = { ...pageContent.lightbox, open: pageContent.openImage };

export default function Work() {
  const entries = projects.map((project) => {
    const featured = project.slug === "multi-branch-pos";
    return {
      slug: project.slug,
      category: project.category,
      featured,
      card: <ProjectCard
        href={shell.projectHref(project.slug)}
        title={project.title}
        meta={[project.category, project.year].filter(Boolean).join(" · ")}
        role={project.role}
        summary={project.summary}
        featuredLabel={featured ? pageContent.featuredProject : undefined}
        tags={project.stack.slice(0, 5)}
        images={project.images.slice(0, 4)}
        cta={pageContent.viewCaseStudy}
        labels={labels}
        featured={featured}
      />,
    };
  });

  return <div className="container section-space">
      <WorkSubnav current="/work" />

    <SectionLabel>{site.name}</SectionLabel>
    <div className="page-intro"><h1>{shell.workTitle}</h1><p>{pageContent.workIntro}</p></div>
    <noscript><style>{".work-filter { display: none; }"}</style></noscript>
    <ProjectFilter label={pageContent.workFilter} allLabel={pageContent.allWorkCategories} emptyLabel={pageContent.workEmpty} categories={[...projectCategories]} entries={entries} />
    <Hackathons />
  </div>;
}
