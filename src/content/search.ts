import { resumeLink } from "./site";
import type { SearchContent } from "./schemas/search";
export const searchContent = {
  title: "Find your way around.",
  intro:
    "Search pages, projects and published writing. Use ⌘K or Ctrl+K to open search.",
  resultsLabel: "results",
  open: "Search the site",
  close: "Close search",
  label: "Search pages, projects and posts",
  loading: "Loading search…",
  error: "Search could not load. Close and reopen to retry.",
  empty: "No matches. Try a shorter phrase.",
  hint: "Use arrow keys to choose, Enter to open, Escape to close.",
  indexPath: "/search-index.json",
  groups: { page: "Pages", project: "Projects", post: "Writing" },
  pages: [
    {
      title: "Services",
      description:
        "Architecture, business software, offline-first apps and database services.",
      href: "/services",
    },
    {
      title: "Contact",
      description: "Direct channels and project brief.",
      href: "/contact",
    },
    {
      title: resumeLink.label,
      description: "Printable experience, education and skills.",
      href: resumeLink.href,
    },
    {
      title: "Uses",
      description: "Tools, hardware and working setup.",
      href: "/uses",
    },
    {
      title: "Search",
      description: "Find pages, projects and published posts.",
      href: "/search",
    },
  ],
} satisfies SearchContent;
