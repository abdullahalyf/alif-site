import { site, shell, skillProfile } from "@/content/site";
import { cvDownload, cvEducation, cvProjects, resumeContent as c } from "@/content/resume";
import { Reveal, StaggerIn } from "@/components/motion";
import { PrintButton } from "./PrintButton";
export function Resume({ id }: { id: string }) {
  return (
    <article id={id} className="resume-document" aria-labelledby={`${id}-title`}>
      <Reveal>
        <header>
          <p className="label">{c.title}</p>
          <h2 id={`${id}-title`}>{site.fullName}</h2>
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
          <div className="resume-actions button-row">
            <a className="button button--primary" href={cvDownload.href} download>{cvDownload.label}</a>
            <PrintButton />
          </div>
        </header>
      </Reveal>
      <Reveal>
        <section>
          <h3>{c.summaryTitle}</h3>
          <p>{site.intro}</p>
        </section>
      </Reveal>
      <section>
        <Reveal>
          <h3>{c.experienceTitle}</h3>
        </Reveal>
        <StaggerIn>
          {c.experience.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.period}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h3>{c.projectsTitle}</h3>
        </Reveal>
        <StaggerIn>
          {cvProjects.map((project) => (
            <div key={project.slug}>
              <h4>
                <a href={shell.projectHref(project.slug)}>{project.title}</a>
              </h4>
              <p>
                {project.year} · {project.role}
              </p>
              <p>{project.summary}</p>
            </div>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h3>{c.educationTitle}</h3>
        </Reveal>
        <StaggerIn>
          {cvEducation.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <p>
                {item.org} · {item.years}
              </p>
              <p>{item.text}</p>
            </div>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h3>{c.skillsTitle}</h3>
        </Reveal>
        <StaggerIn>
          <div>
            <h4>{skillProfile.coreTitle}</h4>
            <p>{skillProfile.intro}</p>
            <p>{skillProfile.strengths.map(({ name }) => name).join(" · ")}</p>
          </div>
          <div>
            <h4>{skillProfile.workflowTitle}</h4>
            <p>{skillProfile.workflow.join(" → ")}</p>
          </div>
          {site.skills.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.items.map(({ name, note }) => <p key={name}>{name} · {note}</p>)}
            </div>
          ))}
          <div>
            <h4>{skillProfile.toolsTitle}</h4>
            <p>{skillProfile.tools.map(({ name }) => name).join(" · ")}</p>
          </div>
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h3>{c.languagesTitle}</h3>
        </Reveal>
        <StaggerIn>
          {site.languages.map((item) => (
            <p key={item.name}>
              {item.name} · {item.level}
            </p>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h3>{c.achievementsTitle}</h3>
        </Reveal>
        <StaggerIn>
          {site.achievements.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <p>
                {item.org} · {item.year}
              </p>
              <p>{item.text}</p>
            </div>
          ))}
        </StaggerIn>
      </section>
    </article>
  );
}
