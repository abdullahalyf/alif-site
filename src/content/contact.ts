import { briefBudgets, briefProjectTypes, contactContentSchema } from "./schemas/contact";
import { availability, site } from "./site";

const linkedin = site.socials.find(({ label }) => label === "LinkedIn")!;
const github = site.socials.find(({ label }) => label === "GitHub")!;

export const contactContent = contactContentSchema.parse({
  title: "Contact",
  heading: "Let’s talk about your project.",
  intro:
    "Email or WhatsApp is the fastest way to reach me. If you would rather write it down first, send a short brief below. It stays in your browser until you send it through the app you choose.",
  response: "I reply by email, usually within a day.",
  availability: availability.status,
  offersLabel: availability.offersLabel,
  fallback: "Email me directly",
  emailButton: "Send brief by email",
  whatsappButton: "Send brief by WhatsApp",
  ready: "Open your prepared brief",
  subject: "Project enquiry",
  selectPlaceholder: "Choose an option",
  invalid: "Please check the highlighted fields.",
  channelsLabel: "Ways to reach me",
  cards: [
    { id: "email", label: "Email", value: site.email, note: "Best for briefs and files", href: `mailto:${site.email}` },
    { id: "whatsapp", label: "WhatsApp", value: "Message me", note: "Quick questions and calls", href: site.whatsapp.href, external: true },
    { id: "linkedin", label: "LinkedIn", value: "abdullah-alyf", note: "Background and updates", href: linkedin.href, external: true },
    { id: "github", label: "GitHub", value: "abdullahalyf", note: "Code and projects", href: github.href, external: true },
    { id: "location", label: "Based in", value: site.location, note: "Working remotely with clients" },
  ],
  formTitle: "Send a short brief",
  formIntro: "Two or three sentences about what the business does and what should work better is enough to start.",
  cvPrompt: "Looking for my background?",
  cvLabel: "View my CV",
  fields: [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "company", label: "Company (optional)" },
    { name: "projectType", label: "Project type", options: [...briefProjectTypes] },
    { name: "budget", label: "Budget range", options: [...briefBudgets] },
    { name: "timeline", label: "Timeline", options: ["Flexible", "Within a month", "1–3 months", "3+ months"] },
    { name: "message", label: "Message" },
  ],
});
