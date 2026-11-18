import Image from "next/image";
import Link from "next/link";
import { demoContent, seo, site, writingContent } from "@/content/site";
import type { Site } from "@/content/schema";
import { getPosts, formatPostDate } from "@/content/posts";
import { SectionLabel } from "@/components/section-label";
import { EducationTimeline } from "@/components/education-timeline";
import { CountUp, Reveal, StaggerIn } from "@/components/motion";
import "./demo.css";

function Achievement({ entry }: { entry: Site["achievements"][number] }) {
  return <article className="highlight-card">
    <p className="label">{entry.year} · {entry.org}</p>
    <h3>{entry.title}</h3><p>{entry.text}</p>
    {entry.demo && <span className="demo-badge">{demoContent.demoLabel}</span>}
  </article>;
}
export function Highlights({ standalone = true }: { standalone?: boolean }) {
  return <section className={standalone ? "container section-space" : undefined} aria-labelledby="highlights-title">
    <SectionLabel>{demoContent.highlightsLabel}</SectionLabel>
    <Reveal><h2 id="highlights-title" className="section-title">{demoContent.highlightsTitle}</h2></Reveal>
    <StaggerIn className="highlights-grid" data-horizontal-scroll tabIndex={0} role="region" aria-labelledby="highlights-title">{site.achievements.map((entry) => <Achievement key={entry.title} entry={entry} />)}</StaggerIn>
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
  return <section className="container section-space" aria-labelledby="testimonials-title">
    <SectionLabel>{demoContent.testimonialsLabel}</SectionLabel>
    <Reveal><h2 id="testimonials-title" className="section-title">{demoContent.testimonialsTitle}</h2><p className="demo-notice">{demoContent.testimonialsNotice}</p></Reveal>
    <StaggerIn className="testimonials-grid" data-horizontal-scroll tabIndex={0} role="region" aria-labelledby="testimonials-title">{site.testimonials.map((item) => <figure className="testimonial" key={item.name}>
      <blockquote><p>{item.quote}</p></blockquote><figcaption><p>{item.name}</p><p className="label">{item.role}</p></figcaption>
    </figure>)}</StaggerIn>
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
const skillIcons = {
  systems: "M9 3h6v5H9zM3 16h6v5H3zm12 0h6v5h-6zM12 8v4m-6 4v-4h12v4",
  web: "M3 5h18v14H3zm0 4h18m-11 3-2 2 2 2m4-4 2 2-2 2",
  data: "M4 7c0-2 3.6-4 8-4s8 2 8 4-3.6 4-8 4-8-2-8-4zm0 0v10c0 2 3.6 4 8 4s8-2 8-4V7M4 12c0 2 3.6 4 8 4s8-2 8-4",
};

export function AboutDetails() {
  const interestsPhoto = demoContent.interestsPhoto;

  return <div className="container">
    <div className="about-milestones section-space">
      <section aria-labelledby="education-title">
        <SectionLabel>{demoContent.educationLabel}</SectionLabel>
        <Reveal><h2 id="education-title" className="section-title">{demoContent.educationLabel}</h2><p className="demo-notice">{demoContent.aboutDemoNotice}</p></Reveal>
        <EducationTimeline items={site.education} />
      </section>
      <Highlights standalone={false} />
    </div>
    <div className="about-bento">
      <section className="about-bento__skills" aria-labelledby="skills-title">
        <h2 id="skills-title">{demoContent.skillsLabel}</h2>
        <p className="demo-notice">{demoContent.skillsNotice}</p>
        <div className="skills-grid">
          {site.skills.map((group) => <article className="skill-card" key={group.title}>
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={skillIcons[group.icon]} />
              </svg>
              {group.title}
            </h3>
            <ul>{group.items.map((item) => <li key={item.name}>
              <div className="skill-row">
                <strong>{item.name}</strong>
                <meter min={0} max={5} value={item.level} aria-label={demoContent.skillLevel(item.level)} />
              </div>
              <p>{item.note}</p>
            </li>)}</ul>
          </article>)}
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
    </div>
  </div>;
}
