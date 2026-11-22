import Image from "next/image";
import Link from "next/link";
import { demoContent, seo, site, skillProfile, writingContent } from "@/content/site";
import type { Site } from "@/content/schema";
import { getPosts, formatPostDate } from "@/content/posts";
import { SectionLabel } from "@/components/section-label";
import { EducationTimeline } from "@/components/education-timeline";
import { CountUp, Reveal, StaggerIn } from "@/components/motion";
import { HorizontalRow } from "@/components/horizontal-row";
import "./demo.css";

function Achievement({ entry, featured }: { entry: Site["achievements"][number]; featured: boolean }) {
  return <article className="highlight-card" data-featured={featured || undefined}>
    <p className="label">{entry.period ?? entry.year} · {entry.org}</p>
    <h3>{entry.title}</h3><p>{entry.text}</p>
    {entry.demo && <span className="demo-badge">{demoContent.demoLabel}</span>}
  </article>;
}
export function Highlights({ standalone = true }: { standalone?: boolean }) {
  return <section className={standalone ? "container section-space" : undefined} aria-labelledby="highlights-title">
    <SectionLabel>{demoContent.highlightsLabel}</SectionLabel>
    <Reveal><h2 id="highlights-title" className="section-title">{demoContent.highlightsTitle}</h2></Reveal>
    <HorizontalRow className="highlights-grid" labelledBy="highlights-title">{site.achievements.map((entry, index) => <Achievement key={entry.title} entry={entry} featured={index === 0} />)}</HorizontalRow>
  </section>;
}
export function AtAGlance() {
  return <section className="container glance-section" aria-labelledby="glance-title">
    <div className="glance-head">
      <SectionLabel>{demoContent.statsLabel}</SectionLabel>
      <h2 id="glance-title" className="glance-notice">{demoContent.statsNotice}</h2>
    </div>
    <StaggerIn className="stats-grid">{site.stats.map((stat) => <div key={stat.label}><p className="stat-value"><CountUp value={stat.value} /></p><p className="stat-label">{stat.label}</p></div>)}</StaggerIn>
  </section>;
}
export function Testimonials() {
  const published = site.testimonials.filter((item) => item.published);
  if (!published.length) return null;
  return <section className="container section-space" aria-labelledby="testimonials-title">
    <SectionLabel>{demoContent.testimonialsLabel}</SectionLabel>
    <Reveal><h2 id="testimonials-title" className="section-title">{demoContent.testimonialsTitle}</h2></Reveal>
    <HorizontalRow className="testimonials-grid" labelledBy="testimonials-title">{published.map((item) => <figure className="testimonial" key={item.name}>
      <blockquote><p>{item.quote}</p></blockquote><figcaption><p>{item.name}</p><p className="label">{item.role}</p></figcaption>
    </figure>)}</HorizontalRow>
  </section>;
}
export function LatestWriting() {
  const posts = getPosts({ includeDrafts: false }).slice(0, 2);
  if (!posts.length) return null;
  return <section className="container section-space" aria-labelledby="latest-writing-title">
    <SectionLabel>{demoContent.latestLabel}</SectionLabel><Reveal><h2 id="latest-writing-title" className="section-title">{demoContent.latestTitle}</h2></Reveal>
    <div className="latest-writing-grid">{posts.map((post) => <article key={post.slug}><time dateTime={post.date} className="label">{formatPostDate(post.date)}</time><h3><Link href={writingContent.postHref(post.slug)}>{post.title}</Link></h3><p>{post.summary}</p></article>)}</div>
    <Link className="text-link" href={seo.pages.writing.path}>{writingContent.back}</Link>
  </section>;
}
export function AboutDetails() {
  const interestsPhoto = demoContent.interestsPhoto;

  return <>
    <div className="tint-a"><div className="container about-milestones section-space">
      <section aria-labelledby="education-title">
        <SectionLabel>{demoContent.educationLabel}</SectionLabel>
        <Reveal><h2 id="education-title" className="section-title">{demoContent.educationLabel}</h2><p className="demo-notice">{demoContent.aboutDemoNotice}</p></Reveal>
        <EducationTimeline items={site.education} />
      </section>
      <Highlights standalone={false} />
    </div></div>
    <div className="band-surface"><div className="container about-bento section-space">
      <section className="about-bento__skills" aria-labelledby="skills-title">
        <h2 id="skills-title">{skillProfile.label}</h2>
        <div className="skills-grid">
          <article className="skill-card skill-card--core">
            <h3>{skillProfile.coreTitle}</h3>
            <p>{skillProfile.intro}</p>
            <ul>{skillProfile.strengths.map(({ name, note }) => <li key={name}><strong>{name}</strong><p>{note}</p></li>)}</ul>
          </article>
          <article className="skill-card">
            <h3>{skillProfile.workflowTitle}</h3>
            <ol className="skill-workflow">{skillProfile.workflow.map((step) => <li key={step}>{step}</li>)}</ol>
          </article>
          {site.skills.map((group) => <article className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item.name}>
              <div className="skill-row">
                <strong>{item.name}</strong>
                <meter min={0} max={5} value={item.level} aria-label={item.name} aria-valuetext={item.note} />
              </div>
              <p>{item.note}</p>
            </li>)}</ul>
          </article>)}
          <article className="skill-card">
            <h3>{skillProfile.toolsTitle}</h3>
            <ul className="chip-list skill-tools">{skillProfile.tools.map(({ name }) => <li key={name} className="chip">{name}</li>)}</ul>
          </article>
        </div>
      </section>
      <section aria-labelledby="languages-title">
        <h2 id="languages-title">{demoContent.languagesLabel}</h2>
        <dl className="chip-list chip-list--languages">{site.languages.map((language) => <div key={language.name} className="chip"><dt>{language.name}</dt><dd>{language.level}</dd></div>)}</dl>
      </section>
      <section className="about-bento__interests" aria-labelledby="interests-title">
        <div>
          <h2 id="interests-title">{demoContent.interestsLabel}</h2>
          <ul className="chip-list chip-list--interests">{site.interests.map((interest) => <li key={interest} className="chip">{interest}</li>)}</ul>
        </div>
        <Image {...interestsPhoto} alt="" sizes="(max-width: 35rem) 80vw, 8rem" />
      </section>
    </div></div>
  </>;
}
