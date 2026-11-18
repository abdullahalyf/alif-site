import { site, shell, skillProfile } from "@/content/site";
import { projects } from "@/content/projects";
import { resumeContent as c } from "@/content/resume";
import { Reveal, StaggerIn } from "@/components/motion";
export function Resume() {
  return (
    <article className="resume-document">
      {/* The entrance animation is a clip that shifts the content. A printed
          page has no animation, so the print stylesheet clears the clip and
          every line sits still. */}
      <Reveal>
        <header>
          <p className="label">{c.title}</p>
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
      </Reveal>
      <Reveal>
        <section>
          <h2>{c.summaryTitle}</h2>
          <p>{site.intro}</p>
        </section>
      </Reveal>
      <section>
        <Reveal>
          <h2>{c.experienceTitle}</h2>
        </Reveal>
        <StaggerIn>
          {c.experience.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.period}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h2>{c.projectsTitle}</h2>
        </Reveal>
        <StaggerIn>
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
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h2>{c.educationTitle}</h2>
        </Reveal>
        <StaggerIn>
          {site.education.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
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
          <h2>{c.skillsTitle}</h2>
        </Reveal>
        <StaggerIn>
          <div>
            <h3>{skillProfile.coreTitle}</h3>
            <p>{skillProfile.intro}</p>
            <p>{skillProfile.strengths.map(({ name }) => name).join(" · ")}</p>
          </div>
          <div>
            <h3>{skillProfile.workflowTitle}</h3>
            <p>{skillProfile.workflow.join(" → ")}</p>
          </div>
          {site.skills.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map(({ name, note }) => <p key={name}>{name} · {note}</p>)}
            </div>
          ))}
          <div>
            <h3>{skillProfile.toolsTitle}</h3>
            <p>{skillProfile.tools.map(({ name }) => name).join(" · ")}</p>
          </div>
        </StaggerIn>
      </section>
      <section>
        <Reveal>
          <h2>{c.languagesTitle}</h2>
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
          <h2>{c.achievementsTitle}</h2>
        </Reveal>
        <StaggerIn>
          {site.achievements.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
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
