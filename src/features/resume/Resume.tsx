import { site, shell } from "@/content/site";
import { projects } from "@/content/projects";
import { resumeContent as c } from "@/content/resume";
export function Resume() {
  return (
    <article className="resume-document">
      <header>
        <h1>{site.fullName}</h1>
        <p className="lead">{site.role}</p>
        <p>{site.location}</p>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={site.whatsapp.href}>{site.whatsapp.display}</a>
        </p>
        {site.socials.map((link) => (
          <p key={link.href}>
            <a href={link.href}>{link.label}</a>
          </p>
        ))}
      </header>
      <section>
        <h2>{c.summaryTitle}</h2>
        <p>{site.intro}</p>
      </section>
      <section>
        <h2>{c.experienceTitle}</h2>
        {c.experience.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.period}</p>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>{c.projectsTitle}</h2>
        {projects.map((project) => (
          <div key={project.slug}>
            <h3>
              <a href={shell.projectHref(project.slug)}>{project.title}</a>
            </h3>
            <p>
              {project.year} · {project.role}
            </p>
            <p>{project.summary}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>{c.educationTitle}</h2>
        {site.education.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>
              {item.org} · {item.years}
            </p>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>{c.skillsTitle}</h2>
        {site.skills.map((item) => (
          <p key={item.title}>
            <strong>{item.title}: </strong>
            {item.items.join(", ")}
          </p>
        ))}
      </section>
      <section>
        <h2>{c.languagesTitle}</h2>
        {site.languages.map((item) => (
          <p key={item.name}>
            {item.name} · {item.level}
          </p>
        ))}
      </section>
      <section>
        <h2>{c.achievementsTitle}</h2>
        {site.achievements.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>
              {item.org} · {item.year}
            </p>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
