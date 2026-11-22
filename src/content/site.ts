import { demoImage } from "./demo-images";
import type { Hackathon, Site } from "./schema";

export const skillProfile = {
  label: "Skills",
  intro: "I don't hand-write every line. I design the system, make the decisions, and direct AI to build it — then test and review everything.",
  coreTitle: "Core strengths",
  strengths: [
    { name: "System architecture & design", note: "Plan how data, services and interfaces fit together and keep working during outages." },
    { name: "Trade-off decisions with clear reasons", note: "Explain why I chose one design, what it costs to run, and what would make me revisit the decision." },
    { name: "AI-orchestrated development", note: "Plan, direct and review work by Codex and Claude, then test their changes before shipping production software." },
    { name: "Turning business processes into systems", note: "Map real workflows into data, roles and permissions. Account for failure cases and running costs up front." },
  ],
  workflowTitle: "How I build",
  workflow: ["Write the spec", "Break it into tasks", "Have AI agents implement", "Run automated tests and review changes", "Ship small releases"],
  toolsTitle: "Tools",
  tools: [
    { name: "Codex", why: "Implements scoped tasks and runs tests. I review the changes before merging." },
    { name: "Claude", why: "Helps explore architecture trade-offs, turn decisions into specs and review changes." },
    { name: "GitHub Actions", why: "Runs checks automatically before changes ship." },
    { name: "Vercel", why: "Hosts previews for reviewing and testing small releases." },
    { name: "Supabase", why: "Hosts project databases while I learn PostgreSQL and review permissions and constraints." },
    { name: "Playwright", why: "Checks behavior in a real browser before release." },
  ],
};

// Single source of truth for all site copy. Edit text here, never in components.
export const site = {
  name: "Abdullah Alif",
  fullName: "Md. Abdullah Alif",
  logoText: "Built by Alif",
  logoInitial: "A",
  role: "Software Systems Architect",
  location: "Dhaka, Bangladesh",
  intro:
    "I design reliable software for businesses, direct AI agents to build it, and review and test the work before launch.",
  now: [
    "5th semester, BSc in Computer Science and Engineering at Daffodil International University.",
    "Selected for the DIU–IIT Bombay exchange semester, Dec 31, 2026 to about May 31, 2027.",
    "Research paper on explainable machine learning for traffic accident injury prediction — second author, submitted.",
    "Freelancing as a software systems architect: designing client systems and directing AI implementation, reviews and tests.",
    "Learning basic Japanese through a DILC course.",
  ],
  achievements: [
    { title: "Exchange semester at IIT Bombay", org: "DIU–IIT Bombay MoU", year: 2027, period: "Dec 31, 2026 – ~May 31, 2027", text: "Selected by Daffodil International University for a one-semester exchange at IIT Bombay." },
    { title: "Research paper submitted", org: "Traffic accident injury prediction", year: 2026, text: "Second author on \"Explainable Machine Learning for Traffic Accident Injury Prediction: A Leakage-Aware and Statistically Validated Framework\". Status: submitted." },
  ],
  education: [
    { title: "BSc in Computer Science & Engineering", org: "Daffodil International University, Dhaka", years: "Currently 5th semester", text: "Software engineering, databases and intelligent systems, plus research on traffic accident risk prediction.", image: { src: "/images/demo/education-university.jpg", width: 640, height: 480, alt: "Demo photograph of a university campus" } },
    { title: "Higher Secondary Certificate (Science)", org: "Dhaka Commerce College, Dhaka", years: "GPA 5.00", text: "Science group.", image: { src: "/images/demo/education-college.jpg", width: 640, height: 480, alt: "Demo photograph of a college courtyard" } },
    { title: "Secondary School Certificate (Science)", org: "Central Laboratory School & College, Dhaka", years: "GPA 5.00", text: "Science group. Government Talent-pool scholarship recipient.", image: { src: "/images/demo/education-school.jpg", width: 640, height: 480, alt: "Demo photograph of a school building" } },
  ],
  skills: [
    { title: "Working knowledge", icon: "data", items: [
      { name: "Git & CI", level: 4, note: "Comfortable" },
      { name: "SQLite", level: 3, note: "Working knowledge" },
      { name: "Python", level: 2, note: "Basic" },
      { name: "PostgreSQL", level: 1, note: "Learning" },
      { name: "React / Next.js", level: 2, note: "Reads and reviews code built with AI" },
    ] },
  ],
  languages: [
    { name: "Bangla", level: "Fluent" }, { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Conversational" }, { name: "Japanese", level: "Basic · DILC course" },
  ],
  interests: ["Travelling across Bangladesh (24 of 64 districts) and Malaysia"],
  stats: [{ value: "3", label: "Branches live on my POS" }, { value: "9", label: "Branches the POS is built to scale to" }, { value: "24/64", label: "Districts travelled in Bangladesh" }],
  // Draft from Alif's notes. Nothing renders while `published` is false — set it to true only after Asad approves.
  testimonials: [
    { name: "Md. Asaduzzaman", role: "Managing Director", quote: "Alif built our POS from the ground up. We now run every branch from one system — the counters work smoothly in-shop, and we can check sales and reports online from anywhere. It's made managing our outlets much easier.", published: false },
  ],
  about: [
    "I'm a software systems architect in Bangladesh. I map out the data, roles, failure cases and costs, explain the trade-offs to clients, then guide AI agents through implementation. I review the changes and test what happens when things go wrong.",
    "I was born in Jhenaidah and grew up in Dhaka. I got my first laptop in Class 9, during COVID online classes, and started building from there.",
    "I'm studying Computer Science and Engineering at Daffodil International University, and I'm part of a research team working on traffic accident risk prediction.",
  ],
  email: "abdullahaylif@gmail.com",
  whatsapp: {
    display: "Message on WhatsApp",
    href: "https://wa.me/8801629889764",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/abdullahalyf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-alyf/" },
  ],
  heroPhoto: {
    src: "/images/alif-portrait.jpg",
    width: 2400,
    height: 1350,
    alt: "Abdullah Alif standing against a grey wall",
  },
  avatar: {
    src: "/images/alif-avatar.jpg",
    width: 400,
    height: 400,
    alt: "Portrait of Abdullah Alif",
  },
  aboutPhoto: {
    src: "/images/alif-about.jpg",
    width: 1200,
    height: 1500,
    alt: "Abdullah Alif in a patterned shirt, hands in pockets",
  },
  // DEMO: placeholder photograph for the hero side panel — replace with a real photo.
  //
  // Keep this same-origin so the image optimiser can resize it to the viewport.
  heroSide: {
    src: "/images/alif-hero-side.jpg",
    width: 900,
    height: 1100,
    alt: "DEMO photograph — replace with a real portrait of Alif",
  },
  statusCard: {
    availability: "Available for work",
    timezone: "Asia/Dhaka",
    timezoneLabel: "Dhaka",
    buildingLabel: "Currently building",
    building: "Offline-first POS & inventory platform",
    stack: ["System design", "AI agents", "Offline-first"],
  },
  systemDiagram: {
    label: "How the system fits together",
    steps: ["POS", "Sync", "Cloud DB", "Dashboard"],
  },
  services: [
    "System architecture & design",
    "Business software (POS, inventory, dashboards)",
    "Offline-first desktop & web apps",
    "Database design & access control",
  ],
  tagline: "Systems first, screens second.",
  approach: [
    {
      slug: "understand-the-business",
      title: "Understand the business",
      details: [],
      text: "I start by learning how the business really runs — who does what, where money and stock move, and what breaks today.",
    },
    {
      slug: "design-the-system",
      title: "Design the system",
      details: [],
      text: "Before any screen, I map the data, the roles and permissions, the failure cases and the running costs.",
    },
    {
      slug: "build-in-small-releases",
      title: "Build in small releases",
      details: [],
      text: "I turn the design into a spec and give AI agents small implementation tasks. I review their changes and run tests so you can try each release early.",
    },
    {
      slug: "launch-and-look-after-it",
      title: "Launch and look after it",
      details: [],
      text: "I roll out carefully, monitor what happens, and keep the system healthy as your business grows.",
    },
  ],
  story: [
    {
      label: "Jhenaidah",
      title: "Where it started",
      text: "Born in Jhenaidah, Bangladesh, with a short early stretch in Jessore. I grew up in Dhaka from Class 1.",
      image: demoImage("alif-story-1", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "School & college",
      title: "Learning to build",
      text: "I got my first laptop in Class 9, during COVID online classes. That is where building started.",
      image: demoImage("alif-story-2", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "Daffodil International University",
      title: "Computer Science & Engineering",
      text: "I study CSE at DIU and work with a research team on traffic accident risk prediction.",
      image: demoImage("alif-story-3", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "Dhaka",
      title: "Now",
      text: "I live in Dhaka and freelance as a systems architect. I design software for businesses and direct AI agents to implement it.",
      image: demoImage("alif-story-4", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
  ],
} satisfies Site;

export const hackathons: Hackathon[] = [];

export const hackathonContent = {
  label: "Hackathons",
  title: "Built against the clock.",
  github: "GitHub",
  live: "Live",
};

export const cvId = "cv";
export const resumeLink = { label: "CV", href: `/contact#${cvId}` };

const navigationLinks = {
  work: { label: "Work", href: "/work" },
  services: { label: "Services", href: "/services" },
  approach: { label: "Approach", href: "/approach" },
  writing: { label: "Writing", href: "/writing" },
  about: { label: "About me", href: "/about" },
  contact: { label: "Contact", href: "/contact" },
  travel: { label: "Travel", href: "/travel" },
  lab: { label: "Lab demos", href: "/lab" },
  estimate: { label: "Estimate a project", href: "/estimate" },
  resume: resumeLink,
  uses: { label: "Uses", href: "/uses" },
  now: { label: "Now", href: "/now" },
};

export const greetingIntro = [
  { word: "Hello", lang: "en" },
  { word: "হ্যালো", lang: "bn" },
  { word: "Hola", lang: "es" },
  { word: "Bonjour", lang: "fr" },
  { word: "こんにちは", lang: "ja" },
  { word: "你好", lang: "zh" },
  { word: "مرحبا", lang: "ar" },
  { word: "Hallo", lang: "de" },
  { word: "Alif", lang: "en" },
  { word: "আলিফ", lang: "bn" },
  { word: "アリフ", lang: "ja" },
  { word: "阿利夫", lang: "zh" },
  { word: "ألف", lang: "ar" },
] as const;

export const shell = {
  useDarkTheme: "Use dark theme",
  useLightTheme: "Use light theme",
  home: { label: "Home", href: "/" },
  nav: [
    navigationLinks.work, navigationLinks.writing, navigationLinks.about, navigationLinks.contact,
  ],
  contact: navigationLinks.contact,
  navigation: "Main navigation",
  menu: "Menu",
  closeMenu: "Close menu",
  skip: "Skip to content",
  mainHref: "#main",
  contactId: "contact",
  copyright: (year: number) => `© ${year} ${site.name}`,
  footerTitle: "Let's build something that keeps working.",
  email: { label: "Email me", href: `mailto:${site.email}` },
  whatsappLabel: "WhatsApp",
  workLabel: "See my work",
  aboutTitle: "About me",
  approachTitle: "Approach",
  workTitle: "Work",
  caseStudyLabel: "Case study",
  notFoundTitle: "Page not found",
  notFoundText: "This page isn't here. Let's get you back home.",
  backHome: "Back home",
  projectHref: (slug: string) => `/work/${slug}`,
  /** Interactive demos linked from a case study, keyed by project slug. */
  liveDemos: {
    "multi-branch-pos": { label: "Try the live demo", href: "/lab/offline-sync" },
  } as Record<string, { label: string; href: string }>,
  /** The search button in the header. */
  searchLabel: "Search",
  /** The keyboard hint shown next to the search button. */
  searchHint: "⌘K",
  footerNavigation: "Footer navigation",
};

export const workNavigation = {
  label: "Work sections",
  links: [{ ...navigationLinks.work, label: "Projects" }, navigationLinks.services, navigationLinks.approach, navigationLinks.lab, navigationLinks.estimate],
};

export const menuGroups = [
  { label: navigationLinks.work.label, links: workNavigation.links },
  { label: "Writing & Travel", links: [navigationLinks.writing, navigationLinks.travel, { label: "Writing RSS", href: "/writing/rss.xml" }] },
  { label: "About", links: [navigationLinks.about] },
  { label: "Contact & CV", links: [navigationLinks.contact, navigationLinks.resume, { ...shell.email, label: "Email" }, { href: site.whatsapp.href, label: shell.whatsappLabel }, ...site.socials] },
  { label: "More", links: [navigationLinks.uses, navigationLinks.now] },
];

export const footerGroups = menuGroups;
export const aboutSiteLinks = {
  title: "Also on this site",
  links: [navigationLinks.uses, navigationLinks.now, navigationLinks.lab, navigationLinks.estimate, navigationLinks.travel],
};

/**
 * Looks a navigation link up by its path.
 *
 * The nav is a plain list, so its order is free to change; this keeps the
 * handful of places that link to "the approach page" or "the about page"
 * honest when the list is reordered.
 */
export function navHref(path: string): string {
  const link = shell.nav.find((item) => item.href === path);
  return link?.href ?? path;
}


export const seo = {
  fallbackUrl: "http://localhost:3000",
  schemaContext: "https://schema.org",
  sitemapPath: "/sitemap.xml",
  imagePath: "/opengraph-image",
  pages: {
    home: { title: `${site.name} — ${site.role}`, description: site.intro, path: shell.home.href },
    about: { title: shell.aboutTitle, description: site.about[0], path: navHref("/about") },
    approach: { title: shell.approachTitle, description: site.tagline + " " + site.approach[0].text, path: navHref("/approach") },
    writing: { title: "Writing", description: "Notes on software systems, research and things I'm learning.", path: "/writing" },
    now: { title: "What I'm doing now", description: "What Abdullah Alif is building, studying and learning now.", path: "/now" },
    work: { title: shell.workTitle, description: "Selected software systems, client projects and research by Abdullah Alif.", path: navHref("/work") },
  },
};

export const homeContent = {
  aboutLabel: "A little about me",
  aboutTitle: "The person behind the systems.",
  aboutLink: "More about me",
  servicesLabel: "What I do",
  servicesTitle: "Software built around your business.",
  currentlyLabel: "Currently",
  currently: "5th semester CSE at DIU · IIT Bombay exchange from Dec 31, 2026 · research paper submitted",
  currentlyLink: "More on Now",
};

export const availability = {
  status: "Available for work",
  offersLabel: "What I take on",
  offers: [
    "POS systems (my own POS, available to new shops)",
    "Business websites",
    "Inventory management",
    "Business OS and back-office systems",
    "Custom software",
  ],
};

export const workContent = {
  approachLabel: "How I work",
  approachTitle: "Good systems start with good questions.",
  approachIntro: "From the first conversation to life after launch, here's how I turn a business problem into software that keeps working.",
  approachLink: "Explore my approach",
  stepLink: "Read more",
  selectedLabel: "Selected work",
  selectedTitle: "Built to keep working.",
  allWork: "View all work",
  previous: "Previous projects",
  next: "Next projects",
  carouselLabel: "Selected projects",
};

export const aboutContent = {
  intro: "I design business software, explain the trade-offs, and direct AI agents to build it.",
  facts: [
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "From", value: "Jhenaidah, Bangladesh" },
    { label: "Studying", value: "CSE at Daffodil International University" },
    { label: "Exchange", value: "IIT Bombay, Dec 31, 2026 – ~May 31, 2027" },
    { label: "Languages", value: site.languages.map(({ name }) => name).join(" · ") },
    { label: site.statusCard.buildingLabel, value: site.statusCard.building },
  ],
  email: { ...shell.email, label: "Email" },
  resume: navigationLinks.resume,
  signature: site.name,
  missionVision: { label: "Mission & vision", missionLabel: "Mission", visionLabel: "Vision", mission: "", vision: "" },
  storyLabel: "My story",
  storyTitle: "A few chapters along the way.",
};

export const approachDetail = {
  href: (slug: string) => `/approach/${slug}`,
  stepLabel: (index: number) => `Step ${String(index + 1).padStart(2, "0")}`,
  pending: "The full write-up for this step is coming soon.",
  back: "All steps",
  next: "Next step",
};

export const pageContent = {
  approachIntro: "From the first conversation to life after launch, here's how I turn a business problem into software that works.",
  workFilter: "Filter by category",
  featuredProject: "Featured project",
  workEmpty: "No projects match this category.",
  allWorkCategories: "All categories",
  workIntro: "Client work, independent projects and research. A closer look at the problems I solve and the systems behind them.",
  contents: "In this case study",
  decisions: "Key decisions & trade-offs",
  alternatives: "Options considered",
  reasoning: "Why this decision",
  timeline: "Delivery timeline",
  challenges: "Challenges",
  metrics: "Project outcomes",
  researchNote: "The research decisions and delivery phases below are illustrative and pending confirmation.",
  problem: "Problem",
  solution: "Solution",
  stack: "Built with (via AI agents)",
  orchestrated: "Orchestrated with: Codex, Claude",
  results: "Results",
  nextProject: "Next project",
  projectLink: "Visit project",
  /** The section heading for the architecture diagram inside a case study. */
  systemDesign: "System design",
  /** The link to the full-size diagram. */
  diagramScroll: "Scroll to see the full diagram →",
  systemDesignLink: "Open the full diagram",
};

export const writingContent = {
  title: "Writing",
  intro: "Notes on building software, asking questions and learning along the way.",
  empty: "No published posts yet. Check back soon.",
  filterLabel: "Filter writing by topic",
  filters: {
    all: { label: "All", href: "/writing" },
    tech: { label: "Tech", href: "/writing/category/tech" },
    travel: { label: "Travel", href: "/writing/category/travel" },
  },
  rssLabel: "RSS feed",
  rssPath: "/writing/rss.xml",
  nowLabel: "Now",
  nowPath: "/now",
  nowTitle: "What I'm doing now",
  nowIntro: "A short snapshot of what has my attention.",
  back: "All writing",
  previous: "Previous post",
  next: "Next post",
  draft: "Draft preview",
  postHref: (slug: string) => `/writing/${slug}`,
};

export const demoContent = {
  demoLabel: "DEMO",
  imageNotice: "Demo photographs · illustrative, not project screenshots",
  highlightsLabel: "Highlights",
  highlightsTitle: "Milestones along the way.",
  educationLabel: "Education",
  languagesLabel: "Languages",
  interestsLabel: "Interests",
  interestsPhoto: { src: "/images/travel/jhenaidah-home/1.jpg", width: 1200, height: 900 }, // DEMO
  aboutDemoNotice: "Demo education details and interests — to be confirmed by Alif.",
  statsLabel: "At a glance",
  statsNotice: "A few facts, no padding.",
  testimonialsLabel: "Working together",
  testimonialsTitle: "A little outside perspective.",
  latestLabel: "Latest writing",
  latestTitle: "Notes from the workbench.",
};

export const heroPhotos = {
  label: "A few photos",
  images: [
    // DEMO: existing local travel placeholders, to be replaced with personal photos.
    { src: "/images/travel/sundarbans/1.jpg", width: 1200, height: 900, alt: "Demo photograph of the Sundarbans" },
    { src: "/images/travel/jhenaidah-home/1.jpg", width: 1200, height: 900, alt: "Demo landscape photograph" },
    { src: "/images/travel/sylhet-tea/1.jpg", width: 1200, height: 900, alt: "Demo travel photograph" },
    { src: "/images/travel/bandarban/1.jpg", width: 1200, height: 900, alt: "Demo outdoor photograph" },
  ],
};

export const horizontalContent = { previous: "Previous cards", next: "Next cards", progress: "Scroll through cards" };

export const contactNext = {
  title: "What happens next",
  steps: [
    "Send a short brief describing the workflow and what needs to improve.",
    "I review the brief and ask about scope, users and constraints.",
    "If the project is a fit, we agree on a first step and a way to measure it.",
  ],
};

export const homeServices = {
  learn: "Learn more",
  cards: [
    { icon: "architecture", title: site.services[0], description: "Map your data, workflows and failure cases before committing to a build.", href: "/services#architecture", image: "/images/demo/sync-inspector-overview.jpg" },
    { icon: "operations", title: site.services[1], description: "Give operators a clear way to handle sales, stock and daily exceptions.", href: "/services#operations", image: "/images/demo/stockroom-operations-overview.jpg" },
    { icon: "offline", title: site.services[2], description: "Keep critical work running across outages and reconcile it when connections return.", href: "/services#offline", image: "/images/demo/field-service-overview.jpg" },
    { icon: "access", title: site.services[3], description: "Give every role the access it needs with rules enforced where the data lives.", href: "/services#access", image: "/images/demo/clinic-booking-overview.jpg" },
  ] as const,
};

export const toolsMarquee = {
  label: "How I build: I design, AI agents implement, I review and test.",
  pause: "Pause scrolling",
  items: ["Codex", "Claude", "GitHub", "GitHub Actions", "Vercel", "Supabase", "Playwright", "SQLite"],
};
