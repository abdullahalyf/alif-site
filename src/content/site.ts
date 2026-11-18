import { demoImage } from "./demo-images";
import type { Site } from "./schema";

// Single source of truth for all site copy. Edit text here, never in components.
export const site = {
  name: "Abdullah Alif",
  fullName: "Md. Abdullah Alif",
  logoText: "Built by Alif",
  logoInitial: "A",
  role: "Software Systems Architect & Freelance Developer",
  location: "Dhaka, Bangladesh",
  intro:
    "I design and build reliable software systems for businesses — from architecture to launch.",
  now: [
    "Building client software systems.",
    "Studying Computer Science and Engineering at Daffodil International University.",
    "Researching traffic accident risk prediction with a university team.",
    "Learning basic Japanese through a DILC course.",
  ],
  achievements: [
    { title: "Nominated for a semester exchange at IIT Bombay (Spring 2027) — DIU–IIT Bombay MoU", org: "Daffodil International University · IIT Bombay", year: 2027, text: "Nominated for a Spring 2027 semester exchange under the DIU–IIT Bombay MoU." },
    // DEMO: replace this entire illustrative achievement.
    { title: "DEMO — Student systems showcase", org: "DEMO — Campus technology forum", year: 2026, text: "Presented an offline-first software concept at an illustrative student showcase.", demo: true },
    // DEMO: replace this entire illustrative achievement.
    { title: "DEMO — Community project recognition", org: "DEMO — Local developer circle", year: 2025, text: "Recognised for a sample community tool and a practical approach to documentation.", demo: true },
  ],
  // DEMO: the entire education timeline uses illustrative dates/details; replace before publication.
  education: [
    { title: "BSc in Computer Science & Engineering", org: "Daffodil International University", years: "2023–present · DEMO dates", text: "DEMO — coursework in software engineering, databases and intelligent systems.", image: { src: "/images/demo/education-university.jpg", width: 640, height: 480, alt: "Demo photograph of a university campus" } },
    { title: "Higher Secondary Certificate", org: "DEMO — Riverbend College", years: "2020–2022 · DEMO dates", text: "DEMO — a science-focused programme with mathematics and computing.", image: { src: "/images/demo/education-college.jpg", width: 640, height: 480, alt: "Demo photograph of a college courtyard" } },
    { title: "Secondary School Certificate", org: "DEMO — Northview High School", years: "2015–2020 · DEMO dates", text: "DEMO — early experiments with programming and small school projects.", image: { src: "/images/demo/education-school.jpg", width: 640, height: 480, alt: "Demo photograph of a school building" } },
  ],
  // DEMO: all skill groups are illustrative and should be checked by Alif.
  skills: [
    { title: "Systems & architecture", icon: "systems", items: [
      { name: "Domain modelling", level: 4, note: "Map branches, roles and stock movements." },
      { name: "Offline-first design", level: 4, note: "Keep a checkout usable during outages." },
      { name: "Access control", level: 4, note: "Model branch-specific permissions." },
      { name: "Data synchronisation", level: 4, note: "Retry queued POS changes safely." },
    ] },
    { title: "Web & interfaces", icon: "web", items: [
      { name: "TypeScript", level: 5, note: "Share types across UI and server code." },
      { name: "React", level: 4, note: "Build reusable dashboard controls." },
      { name: "Next.js", level: 4, note: "Ship server-rendered portfolio pages." },
      { name: "Accessible UI", level: 4, note: "Test keyboard navigation and focus." },
    ] },
    { title: "Data & tooling", icon: "data", items: [
      { name: "PostgreSQL", level: 4, note: "Reconcile inventory across branches." },
      { name: "SQLite", level: 4, note: "Store POS transactions on the device." },
      { name: "Python", level: 3, note: "Explore traffic-risk datasets." },
      { name: "Git & CI", level: 4, note: "Automate checks before merging." },
    ] },
  ],
  languages: [
    { name: "Bangla", level: "Fluent" }, { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Speaking" }, { name: "Japanese", level: "Basic · DILC course" },
  ],
  // DEMO: illustrative interests to replace or confirm.
  interests: ["Travelling across Bangladesh", "Street photography", "Football", "Reading about how cities work"],
  // DEMO: every number below is illustrative, not a claim about completed client work.
  stats: [{ value: "12+", label: "Demo projects explored" }, { value: "4", label: "Demo systems domains" }, { value: "3", label: "Demo years of building" }],
  // DEMO: all quotes, names and roles are fictional examples, not client endorsements.
  testimonials: [
    { name: "DEMO — Maya Rahman", role: "DEMO — Operations lead", quote: "The best part was seeing the messy process become a system everyone could understand." },
    { name: "DEMO — Arif Hasan", role: "DEMO — Small-business owner", quote: "Clear questions, a thoughtful plan and a tool that made the daily work feel simpler." },
    { name: "DEMO — Nina Chowdhury", role: "DEMO — Project collaborator", quote: "Every decision came back to the people using the software and what they needed next." },
  ],
  about: [
    "I'm a freelance developer from Bangladesh who starts every project with the system, not the screen. I map out the data, the roles, the failure cases and the costs first, then build software that keeps working when the internet doesn't.",
    "I'm studying Computer Science and Engineering at Daffodil International University and do research on traffic accident risk prediction.",
    "Outside work I travel across Bangladesh and talk to whoever I meet along the way — it's the best way I know to understand what people actually need. And yes, I'm a lifelong Cristiano Ronaldo fan.",
  ],
  email: "abdullahaylif@gmail.com",
  whatsapp: {
    display: "+880 1629-889764",
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
    availability: "Available for new projects",
    timezone: "Asia/Dhaka",
    timezoneLabel: "Dhaka",
    buildingLabel: "Currently building",
    building: "Offline-first POS & inventory platform",
    stack: ["TypeScript", "PostgreSQL", "Next.js"],
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
      title: "Understand the business",
      text: "I start by learning how the business really runs — who does what, where money and stock move, and what breaks today.",
    },
    {
      title: "Design the system",
      text: "Before any screen, I map the data, the roles and permissions, the failure cases and the running costs.",
    },
    {
      title: "Build in small releases",
      text: "I ship working pieces early so you can use them, give feedback and change direction without waste.",
    },
    {
      title: "Launch and look after it",
      text: "I roll out carefully, monitor what happens, and keep the system healthy as your business grows.",
    },
  ],
  // DEMO: review the story copy and replace each chapter photo.
  story: [
    {
      label: "Jhenaidah",
      title: "Where it started",
      text: "DEMO — Growing up in Jhenaidah, curiosity about everyday tools became a curiosity about computers and how they work.", // DEMO story copy.
      image: demoImage("alif-story-1", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "School & college",
      title: "Learning to build",
      text: "DEMO — School and college were a time for small experiments: simple pages, tiny programs and a growing habit of learning by building.", // DEMO story copy.
      image: demoImage("alif-story-2", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "Daffodil International University",
      title: "Computer Science & Engineering",
      text: "I study CSE at DIU and work with a research team on traffic accident risk prediction.",
      image: demoImage("alif-story-3", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
    {
      label: "Savar, Dhaka",
      title: "Now",
      text: "I live in Savar and design and build software systems for businesses as a freelancer.",
      image: demoImage("alif-story-4", "DEMO story photograph — replace with Alif’s own photo"), // DEMO image.
    },
  ],
} satisfies Site;

const navigationLinks = {
  work: { label: "Work", href: "/work" },
  services: { label: "Services", href: "/services" },
  approach: { label: "Approach", href: "/approach" },
  writing: { label: "Writing", href: "/writing" },
  about: { label: "About me", href: "/about" },
  contact: { label: "Contact", href: "/contact" },
  travel: { label: "Travel", href: "/travel" },
  lab: { label: "Lab", href: "/lab" },
  estimate: { label: "Estimate a project", href: "/estimate" },
  resume: { label: "Résumé", href: "/resume" },
  uses: { label: "Uses", href: "/uses" },
  now: { label: "Now", href: "/now" },
};

export const shell = {
  home: { label: "Home", href: "/" },
  introWord: "Alif",
  nav: [
    navigationLinks.work, navigationLinks.services, navigationLinks.approach,
    navigationLinks.writing, navigationLinks.about, navigationLinks.contact,
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

export const footerGroups = [
  { label: "Explore", links: [navigationLinks.work, navigationLinks.services, navigationLinks.approach, navigationLinks.about, navigationLinks.travel] },
  { label: "Resources", links: [navigationLinks.writing, navigationLinks.resume, navigationLinks.uses, navigationLinks.now, { label: "Writing RSS", href: "/writing/rss.xml" }] },
  { label: "Try", links: [{ ...navigationLinks.lab, label: "Lab demos" }, navigationLinks.estimate] },
  { label: "Connect", links: [{ ...shell.email, label: "Email" }, { href: site.whatsapp.href, label: shell.whatsappLabel }, ...site.socials] },
];

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
};

export const workContent = {
  approachLabel: "How I work",
  approachTitle: "Good systems start with good questions.",
  approachIntro: "From the first conversation to life after launch, here's how I turn a business problem into software that keeps working.",
  approachLink: "Explore my approach",
  selectedLabel: "Selected work",
  selectedTitle: "Built to keep working.",
  allWork: "View all work",
  previous: "Previous projects",
  next: "Next projects",
  carouselLabel: "Selected projects",
};

export const aboutContent = {
  intro: "I build business software and study how systems work in the real world.",
  facts: [
    { label: "Based in", value: "Savar, Dhaka" },
    { label: "From", value: "Jhenaidah, Bangladesh" },
    { label: "Studying", value: "CSE at Daffodil International University" },
    { label: "Languages", value: site.languages.map(({ name }) => name).join(" · ") },
    { label: site.statusCard.buildingLabel, value: site.statusCard.building },
  ],
  email: { ...shell.email, label: "Email" },
  resume: navigationLinks.resume,
  signature: site.name,
  storyLabel: "My story",
  storyTitle: "A few chapters along the way.",
};

export const pageContent = {
  approachIntro: "From the first conversation to life after launch, here's how I turn a business problem into software that works.",
  workFilter: "Filter by category",
  allWorkCategories: "All categories",
  workIntro: "Client work, independent projects and research. A closer look at the problems I solve and the systems behind them.",
  problem: "Problem",
  solution: "Solution",
  stack: "Stack",
  results: "Results",
  nextProject: "Next project",
  projectLink: "Visit project",
  /** The section heading for the architecture diagram inside a case study. */
  systemDesign: "System design",
  /** The link to the full-size diagram. */
  systemDesignLink: "Open the full diagram",
};

export const writingContent = {
  title: "Writing",
  intro: "Notes on building software, asking questions and learning along the way.",
  empty: "No published posts yet. Check back soon.",
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
  skillsLabel: "Skills",
  skillsNotice: "Illustrative skill levels and notes",
  skillLevel: (level: number) => `Demo skill level ${level} of 5`,
  languagesLabel: "Languages",
  interestsLabel: "Interests",
  interestsPhoto: { src: "/images/travel/jhenaidah-home/1.jpg", width: 1200, height: 900 }, // DEMO
  aboutDemoNotice: "Demo education details, skills and interests — to be confirmed by Alif.",
  statsLabel: "At a glance",
  statsNotice: "Demo figures · illustrative only",
  testimonialsLabel: "Working together",
  testimonialsTitle: "A little outside perspective.",
  testimonialsNotice: "Demo quotes from fictional people · not client endorsements",
  latestLabel: "Latest writing",
  latestTitle: "Notes from the workbench.",
};

export const heroPhotos = {
  label: "A few photos",
  images: [
    site.aboutPhoto,
    // DEMO: existing local travel placeholders, to be replaced with personal photos.
    { src: "/images/travel/jhenaidah-home/1.jpg", width: 1200, height: 900, alt: "Demo landscape photograph" },
    { src: "/images/travel/sylhet-tea/1.jpg", width: 1200, height: 900, alt: "Demo travel photograph" },
    { src: "/images/travel/bandarban/1.jpg", width: 1200, height: 900, alt: "Demo outdoor photograph" },
  ],
};
