import { resumeLink } from "./site";
import { resumeSchema } from "./schemas/resume";
import { projects } from "./projects";
export const resumeContent = resumeSchema.parse({
  title: resumeLink.label,
  description: "Experience, projects and education in a printable format.",
  print: "Print CV",
  summaryTitle: "Summary",
  experienceTitle: "Experience",
  projectsTitle: "Projects",
  educationTitle: "Education",
  skillsTitle: "Skills",
  languagesTitle: "Languages",
  achievementsTitle: "Achievements",
  experience: [
    {
      title: projects[0].role,
      period: String(projects[0].year),
      text: projects[0].summary,
    },
  ],
});

export const cvProjects = projects.filter(({ slug }) => slug === "multi-branch-pos");

export const cvDownload = { label: "Download CV (PDF)", href: "/documents/alif-cv.pdf" };
