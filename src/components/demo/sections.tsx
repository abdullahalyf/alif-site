import Link from "next/link";
import { demoContent, seo, site, writingContent } from "@/content/site";
import type { Site } from "@/content/schema";
import { getPosts, formatPostDate } from "@/content/posts";
import { SectionLabel } from "@/components/section-label";
import { Reveal, StaggerIn } from "@/components/motion";
import "./demo.css";

function Achievement({ entry }: { entry: Site["achievements"][number] }) {
  return <article className="highlight-card">
    <p className="label">{entry.year} · {entry.org}</p>
    <h3>{entry.title}</h3><p>{entry.text}</p>
    {entry.demo && <span className="demo-badge">{demoContent.demoLabel}</span>}
  </article>;
}
export function Highlights() {
  return <section className="container section-space" aria-labelledby="highlights-title">
    <SectionLabel>{demoContent.highlightsLabel}</SectionLabel>
    <Reveal><h2 id="highlights-title" className="section-title">{demoContent.highlightsTitle}</h2></Reveal>
    <StaggerIn className="highlights-grid">{site.achievements.map((entry) => <Achievement key={entry.title} entry={entry} />)}</StaggerIn>
  </section>;
}
export function AtAGlance() {
  return <section className="container glance-section" aria-labelledby="glance-title">
    <SectionLabel>{demoContent.statsLabel}</SectionLabel><h2 id="glance-title" className="label">{demoContent.statsNotice}</h2>
    <StaggerIn className="stats-grid">{site.stats.map((stat) => <div key={stat.label}><p className="stat-value">{stat.value}</p><p>{stat.label}</p></div>)}</StaggerIn>
  </section>;
}
export function Testimonials() {
  return <section className="container section-space" aria-labelledby="testimonials-title">
    <SectionLabel>{demoContent.testimonialsLabel}</SectionLabel>
    <Reveal><h2 id="testimonials-title" className="section-title">{demoContent.testimonialsTitle}</h2><p className="demo-notice">{demoContent.testimonialsNotice}</p></Reveal>
    <StaggerIn className="testimonials-grid">{site.testimonials.map((item) => <figure className="testimonial" key={item.name}>
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
export function AboutDetails() {
  return <div className="container">
    <section className="section-space" aria-labelledby="education-title">
      <SectionLabel>{demoContent.educationLabel}</SectionLabel><Reveal><h2 id="education-title" className="section-title">{demoContent.educationLabel}</h2><p className="demo-notice">{demoContent.aboutDemoNotice}</p></Reveal>
      <div className="education-timeline">{site.education.map((item) => <article key={item.org}><p className="label">{item.years}</p><div><h3>{item.title}</h3><p>{item.org}</p><p>{item.text}</p></div></article>)}</div>
    </section>
    <section className="section-space" aria-labelledby="skills-title">
      <SectionLabel>{demoContent.skillsLabel}</SectionLabel><Reveal><h2 id="skills-title" className="section-title">{demoContent.skillsLabel}</h2></Reveal>
      <StaggerIn className="skills-grid">{site.skills.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</StaggerIn>
    </section>
    <section className="section-space" aria-labelledby="languages-title">
      <SectionLabel>{demoContent.languagesLabel}</SectionLabel><Reveal><h2 id="languages-title" className="section-title">{demoContent.languagesLabel}</h2></Reveal>
      <dl className="language-list">{site.languages.map((language) => <div key={language.name}><dt>{language.name}</dt><dd>{language.level}</dd></div>)}</dl>
    </section>
    <section className="section-space" aria-labelledby="interests-title">
      <SectionLabel>{demoContent.interestsLabel}</SectionLabel><Reveal><h2 id="interests-title" className="section-title">{demoContent.interestsLabel}</h2></Reveal>
      <ul className="interests-list">{site.interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
    </section>
  </div>;
}
