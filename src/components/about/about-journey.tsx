import Image from "next/image";
import { aboutPage, site } from "@/content/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export function AboutJourney() {
  const { profile, learned, experience } = aboutPage;
  return <div className="container section-space about-journey">
    <aside className="profile-card" aria-label={profile.label}>
      <Image className="profile-card__photo" {...site.avatar} width={96} height={96} sizes="96px" alt={site.avatar.alt} />
      <p className="profile-card__name">{site.name}</p>
      <p className="profile-card__role">{site.role}</p>
      <dl>{profile.rows.map(({ label, value }) => <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>)}</dl>
      <a className="button button--secondary" href={profile.cv.href} download>{profile.cv.label}</a>
    </aside>
    <div className="about-journey__main">
      <section aria-labelledby="learned-title">
        <SectionLabel>{learned.label}</SectionLabel>
        <Reveal><h2 id="learned-title" className="section-title">{learned.title}</h2></Reveal>
        <div className="prose about-journey__story">{learned.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
        <blockquote className="story-quote about-journey__quote"><p>{learned.quote.text}</p><footer>{learned.quote.by}</footer></blockquote>
      </section>
      <section aria-labelledby="experience-title">
        <SectionLabel>{experience.label}</SectionLabel>
        <Reveal><h2 id="experience-title" className="section-title">{experience.title}</h2></Reveal>
        <ol className="experience-timeline">{experience.items.map((item) => <li key={item.title}>
          <p className="label">{item.period}</p>
          <h3>{item.title}</h3>
          <p className="experience-timeline__org">{item.org}</p>
          <p>{item.text}</p>
        </li>)}</ol>
      </section>
    </div>
  </div>;
}
