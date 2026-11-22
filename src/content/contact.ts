import { contactContentSchema } from "./schemas/contact";
export const contactContent = contactContentSchema.parse({
  title: "Let’s talk about your project.",
  intro:
    "Tell me what needs to work better. Your brief stays in your browser until you send it through your chosen app.",
  response: "Send a short brief and I will reply by email.",
  availability: "Available for work.",
  fallback: "Email me directly",
  emailButton: "Send brief by email",
  whatsappButton: "Send brief by WhatsApp",
  ready: "Open your prepared brief",
  subject: "Project enquiry",
  selectPlaceholder: "Choose an option",
  invalid: "Please check the highlighted fields.",
  fields: [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "company", label: "Company (optional)" },
    {
      name: "projectType",
      label: "Project type",
      options: [
        "System architecture",
        "Business software",
        "Offline-first app",
        "Database & access control",
        "Other",
      ],
    },
    {
      name: "budget",
      label: "Budget range",
      options: ["Not sure yet", "Under $2,000", "$2,000–$10,000", "$10,000+"],
    },
    {
      name: "timeline",
      label: "Timeline",
      options: ["Flexible", "Within a month", "1–3 months", "3+ months"],
    },
    { name: "message", label: "Message" },
  ],
});
