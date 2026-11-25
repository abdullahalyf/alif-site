import { resumeSchema } from "./schemas/resume";
import { site } from "./site";

export const resumeContent = resumeSchema.parse({
  title: "CV",
  description: "Education, research, freelance experience, projects and skills of Abdullah Alif. View online, print or download as PDF.",
  name: site.fullName,
  role: "Software Systems Architect · Undergraduate, Computer Science and Engineering",
  location: site.location,
  profile:
    "Fifth-semester Computer Science and Engineering undergraduate at Daffodil International University, interested in machine learning and software system design. Second author of a paper on explainable machine learning for traffic accident injury prediction, submitted to ICEICT 2027. As a freelance developer, I design and build an offline-first business management system for a client with several branches. Selected for the Spring Semester Exchange Programme 2026–27 at IIT Bombay under the DIU–IIT Bombay MoU.",
  download: { label: "Download PDF", href: "/documents/alif-cv.pdf" },
  print: "Print CV",
  note: "References and further details on request.",
  contactLabel: "Contact",
  sections: [
    {
      id: "education",
      title: "Education",
      entries: [
        {
          title: "B.Sc. in Computer Science and Engineering",
          org: "Daffodil International University, Dhaka",
          period: "Summer 2025 – present",
          bullets: [
            "Currently Level 2, Term 2 · expected graduation April 2029 · CGPA 3.48 / 4.00",
            "Key courses: Data Structure, Algorithms, Programming and Problem Solving, Discrete Mathematics, Electrical Circuits, Calculus, Linear Algebra, Engineering Mathematics",
          ],
        },
        { title: "Higher Secondary Certificate (HSC)", org: "Dhaka Commerce College, Dhaka", period: "2024", note: "GPA 5.00 / 5.00" },
        { title: "Secondary School Certificate (SSC)", org: "Central Laboratory School & College, Dhaka", period: "2022", note: "GPA 5.00 / 5.00" },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      entries: [
        {
          title: "Freelance software developer",
          org: "Alez POS and business management system, multi-branch beverage business",
          period: "2026 – present",
          bullets: [
            "Designed the architecture of an offline-first point-of-sale used across several branches, with local storage and automatic, idempotent synchronisation to a central cloud database.",
            "Planned role-based access control, database-level row security, append-only audit logs and a web dashboard for owners to follow sales, stock and branch status.",
            "I own the architecture and technical decisions, use AI coding assistants for much of the implementation, and review and test the output myself.",
            "Stack: Electron, React, TypeScript, SQLite, Supabase (PostgreSQL), Cloudflare Pages, GitHub Actions.",
          ],
          links: [{ label: "Read the case study", href: "/work/multi-branch-pos" }],
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      entries: [
        {
          title: "Explainable Machine Learning for Traffic Accident Injury Prediction: A Leakage-Aware and Statistically Validated Framework",
          org: "Second author · submitted to ICEICT 2027",
          period: "2026",
          bullets: ["Contributed to the literature review, drafting of the manuscript and verification of results, on a framework built around leakage-aware data handling and statistical validation."],
        },
        { title: "Network intrusion anomaly detection", org: "Ongoing, with the research team", period: "2026", note: "An early-stage study of research gaps in network security and intrusion detection." },
      ],
    },
    {
      id: "projects",
      title: "Projects",
      entries: [
        { title: "CloudSentinel", org: "Lead architect · International AI Builders Congress", period: "2026", note: "A control tower for cloud and fleet infrastructure. Finalist; the final is on 26 December.", links: [{ label: "Case study", href: "/work/cloudsentinel" }] },
        { title: "Jomi Barta", org: "Lead architect · DIU LandTech Hackathon", period: "2026", note: "A bilingual guide that helps people in Bangladesh check a piece of land before they buy it. Finalist; the final is on 12 December.", links: [{ label: "Case study", href: "/work/jomi-barta" }] },
        { title: "QueueStorm Investigator", org: "SUST CSE Carnival 2026 Hackathon", period: "2026", note: "An AI-powered FinTech support investigation API. Node.js, Express, Google Gemini API, Zod.", links: [{ label: "GitHub", href: "https://github.com/abdullahalyf/sust-preli-queuestorm" }] },
        { title: "Campus Navigator", org: "University course project", note: "A C program that applies graph algorithms to navigation around the campus." },
        { title: "Console-based e-commerce", org: "University course project", note: "A console application in C built on core data structures.", links: [{ label: "GitHub", href: "https://github.com/abdullahalyf/Consolebased_Ecommerce" }] },
      ],
    },
    {
      id: "competitions",
      title: "Hackathons and competitions",
      lines: [
        { value: "Finalist, International AI Builders Congress 2026 (CloudSentinel)" },
        { value: "Finalist, DIU LandTech Hackathon 2026 (Jomi Barta)" },
        { value: "Finalist, DIU AI & Innovation Hackathon 2026 (OptiNode, an AI-based cluster intelligence concept)" },
        { value: "Finalist, Take-Off 2025, programming contest at Daffodil International University" },
        { value: "Participant, SUST CSE Carnival 2026 Hackathon; IUT ICT Fest 2026 AI Hackathon; BUP CSE Fest AI Hackathon; IUT AutoMech 2025 and 2026" },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      lines: [
        { label: "Languages", value: "C, C++, Python, JavaScript" },
        { label: "Project experience", value: "React, TypeScript, Electron, Node.js, Express, SQLite, PostgreSQL (Supabase)" },
        { label: "Tools", value: "Git, GitHub, GitHub Actions, Docker, Linux / CLI, VS Code" },
        { label: "Machine learning", value: "Model training and evaluation, explainable ML (working knowledge)" },
        { label: "Working style", value: "Write the spec, split it into tasks, have AI agents implement, then run tests and review the changes before each small release" },
        { label: "Soft skills", value: "Presentation, public speaking, negotiation, leadership" },
      ],
    },
    {
      id: "courses",
      title: "Courses and certifications",
      lines: [
        { value: "Basic Japanese Language Course (Level 1), Daffodil Institute of Languages & Culture, DIU, 2026" },
        { value: "ML Bootcamp for Beginners, Shohoj Coding × Daffodil AI Club, 2026" },
        { value: "App Development Course, Computer Programming Club (CPC), DIU (in progress)" },
      ],
    },
    {
      id: "community",
      title: "Leadership and community",
      lines: [
        { value: "Member, Computer Programming Club (CPC) and Daffodil AI Club, DIU" },
        { value: "Volunteer at university events" },
      ],
    },
    {
      id: "languages",
      title: "Languages and interests",
      lines: [
        { label: "Languages", value: "Bangla (native), English (professional proficiency), Hindi (speaking and listening), Japanese (basic)" },
        { label: "Interests", value: "Technology and hardware, system design, automobiles and engines, travel" },
      ],
    },
  ],
});
