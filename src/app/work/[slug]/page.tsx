import { WorkSubnav } from "@/components/work-subnav";
import { ArrowUpRight } from "@/components/arrows";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { pageContent as c, shell } from "@/content/site";
import { diagrams, diagramContent } from "@/content/diagrams";
import { ArchitectureDiagram } from "@/features/diagram/ArchitectureDiagram";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { ProjectMedia } from "@/components/project-media";
import { ProjectGallery } from "@/components/project-gallery";
import { ButtonLink } from "@/components/button";
import { Reveal, StaggerIn } from "@/components/motion";
import "./architecture/architecture.css";
import "./case-study.css";

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
  const diagram = diagrams[project.slug];
  const demo = shell.liveDemos[project.slug];
  const contents = [
    { id: "problem", label: c.problem, show: project.problem },
    { id: "decisions", label: c.decisions, show: project.decisions?.length },
    { id: "system-design", label: c.systemDesign, show: diagram },
    { id: "solution", label: c.solution, show: project.solution.length },
    { id: "timeline", label: c.timeline, show: project.timeline?.length },
    { id: "challenges", label: c.challenges, show: project.challenges?.length },
    { id: "results", label: c.results, show: project.results.length },
    { id: "gallery", label: c.screens, show: project.images.length },
    { id: "stack", label: c.stack, show: project.stack.length || project.link || demo },
  ];
  const galleryLabels = { ...c.lightbox, open: c.openImage };
  const galleryImages = project.images.map((image) => ({ ...image, caption: image.caption ?? image.alt }));

  return <article className="container section-space case-study">
    <WorkSubnav current={shell.projectHref(project.slug)} />
    <SectionLabel>{shell.caseStudyLabel}</SectionLabel>
    <header className="case-hero">
      <div className="case-hero__copy">
        <p className="label">{[project.client, project.year].filter(Boolean).join(" · ")}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <p className="case-role">{project.role}</p>
      </div>
      <div className="case-cover">
        <ProjectMedia image={project.images[0]} sizes="(max-width: 768px) calc(100vw - 3rem), 35vw" eager />
      </div>
    </header>
    {project.metrics?.length && <dl className="case-metrics" aria-label={c.metrics}>
      {project.metrics.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>}

    <div className="case-layout">
      <nav className="case-toc" aria-label={c.contents}>
        <SectionLabel>{c.contents}</SectionLabel>
        <ul>{contents.filter(({ show }) => show).map(({ id, label }) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
      </nav>

      <div className="case-body">
        {project.problem && <section className="case-block" id="problem" aria-labelledby="problem-title">
          <Reveal><h2 id="problem-title">{c.problem}</h2></Reveal>
          <Reveal><p>{project.problem}</p></Reveal>
        </section>}

        {project.decisions?.length && <section className="case-block" id="decisions" aria-labelledby="decisions-title">
          <Reveal><h2 id="decisions-title">{c.decisions}</h2></Reveal>
          <StaggerIn className="case-decisions">{project.decisions.map(({ decision, alternatives, why }) => <article key={decision}>
            <h3>{decision}</h3>
            <dl><dt>{c.alternatives}</dt><dd>{alternatives}</dd><dt>{c.reasoning}</dt><dd>{why}</dd></dl>
          </article>)}</StaggerIn>
        </section>}

        {diagram && <section className="case-block case-section--diagram" id="system-design" aria-labelledby="system-design-title">
          <Reveal><h2 id="system-design-title">{c.systemDesign}</h2></Reveal>
          <ArchitectureDiagram diagram={diagram} legendHeading="h3" />
          <Link className="text-link" href={diagramContent.path(project.slug)}>{c.systemDesignLink}<ArrowUpRight /></Link>
        </section>}

        {project.solution.length > 0 && <section className="case-block" id="solution" aria-labelledby="solution-title">
          <Reveal><h2 id="solution-title">{c.solution}</h2></Reveal>
          <ul className="detail-list">{project.solution.map((text) => <li key={text}>{text}</li>)}</ul>
        </section>}

        {project.timeline?.length && <section className="case-block" id="timeline" aria-labelledby="timeline-title">
          <Reveal><h2 id="timeline-title">{c.timeline}</h2></Reveal>
          <StaggerIn as="ol" className="case-timeline">{project.timeline.map(({ phase, weeks }) => <li key={phase}>
            <p className="label">{weeks}</p><h3>{phase}</h3>
          </li>)}</StaggerIn>
        </section>}

        {project.challenges?.length && <section className="case-block" id="challenges" aria-labelledby="challenges-title">
          <Reveal><h2 id="challenges-title">{c.challenges}</h2></Reveal>
          <dl className="case-challenges">{project.challenges.map(({ problem, resolution }) => <div key={problem}><dt>{problem}</dt><dd>{resolution}</dd></div>)}</dl>
        </section>}

        {project.results.length > 0 && <section className="case-block" id="results" aria-labelledby="results-title">
          <Reveal><h2 id="results-title">{c.results}</h2></Reveal>
          <ul className="detail-list">{project.results.map((text) => <li key={text}>{text}</li>)}</ul>
        </section>}

        {project.images.length > 0 && <section className="case-block" id="gallery" aria-labelledby={project.galleries ? "gallery-title" : "gallery-0-title"}>
          {project.galleries
            ? <>
              <Reveal><h2 id="gallery-title">{c.screens}</h2></Reveal>
              <div className="case-galleries">{project.galleries.map((gallery, index) => <ProjectGallery key={gallery.title} id={`gallery-${index}`} {...gallery} labels={galleryLabels} />)}</div>
            </>
            : <ProjectGallery id="gallery-0" headingLevel="h2" title={c.screens} images={galleryImages} labels={galleryLabels} />}
        </section>}

        {(project.stack.length > 0 || project.link || demo) && <section className="case-block" id="stack" aria-labelledby="stack-title">
          <Reveal><h2 id="stack-title">{c.stack}</h2></Reveal>
          {project.stack.length > 0 && <ul className="stack-pills">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>}
          {project.builtWith && <p>{project.builtWith}</p>}
          {(project.link || demo) && <div className="button-row">
            {project.link && <ButtonLink href={project.link}>{c.projectLink}</ButtonLink>}
            {demo && <ButtonLink href={demo.href}>{demo.label}</ButtonLink>}
          </div>}
        </section>}
      </div>
    </div>

    <nav className="next-project" aria-label={c.nextProject}>
      <SectionLabel>{c.nextProject}</SectionLabel>
      <Link href={shell.projectHref(next.slug)}><span>{next.title}</span><ArrowUpRight /></Link>
    </nav>
  </article>;
}
