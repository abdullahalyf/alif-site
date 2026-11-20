import { resumeLink } from "./site";
import { resumeSchema } from "./schemas/resume";
import { projects } from "./projects";
export const resumeContent = resumeSchema.parse({
  title: resumeLink.label,
  description: "Experience, projects and education in a printable format.",
  print: "Download PDF",
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
    // DEMO: illustrative experience; replace with confirmed role and dates.
    {
      title: "DEMO — Independent software collaborator",
      period: "DEMO — dates to confirm",
      text: "DEMO — specified operations workflows, directed AI prototypes and documented decisions for a small team.",
    },
  ],
});
