import { photoSlot } from "./photo-slots";
import type { Hackathon, ImageAsset, Site } from "./schema";

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
    "Completed a basic Japanese course at DILC and keep practising.",
  ],
  achievements: [
    { title: "Exchange semester at IIT Bombay", org: "DIU–IIT Bombay MoU", year: 2027, period: "Dec 31, 2026 – ~May 31, 2027", text: "Selected by Daffodil International University for a one-semester exchange at IIT Bombay." },
    { title: "Research paper submitted", org: "Traffic accident injury prediction", year: 2026, text: "Second author on \"Explainable Machine Learning for Traffic Accident Injury Prediction: A Leakage-Aware and Statistically Validated Framework\". Status: submitted." },
  ],
  education: [
    { title: "BSc in Computer Science & Engineering", org: "Daffodil International University, Dhaka", years: "Currently 5th semester", text: "Software engineering, databases and intelligent systems, plus research on traffic accident risk prediction.", image: photoSlot("education-university", 640, 480, "Daffodil International University campus") },
    { title: "Higher Secondary Certificate (Science)", org: "Dhaka Commerce College, Dhaka", years: "2024 · GPA 5.00", text: "Science group.", image: photoSlot("education-college", 640, 480, "Dhaka Commerce College") },
    { title: "Secondary School Certificate (Science)", org: "Central Laboratory School & College, Dhaka", years: "2022 · GPA 5.00", text: "Science group. Government Talent-pool scholarship recipient.", image: photoSlot("education-school", 640, 480, "Central Laboratory School & College") },
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
    display: "WhatsApp",
    href: "https://wa.me/8801629889764",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/abdullahalyf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-alyf/" },
  ],
  heroPhoto: { src: "/images/alif-portrait.jpg", width: 2400, height: 1350, alt: "Portrait of Abdullah Alif against a grey wall" },
  avatar: photoSlot("profile-avatar-face", 440, 440, "Portrait of Abdullah Alif"),
  aboutPhoto: photoSlot("about-airport-full", 960, 1280, "Abdullah Alif at an airport, wearing a backpack"),
  heroSide: photoSlot("home-hero-airport", 960, 1173, "Abdullah Alif at an airport with a red and white backpack"),
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
    "Custom software",
    "POS software",
    "Back-office & inventory",
    "Dashboards & web apps",
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
      label: "COVID, Class 9",
      title: "A first laptop",
      text: "When school moved online in Class 9, I chose a laptop over a phone: a Dell Inspiron 15 3000. Between online classes, I started building small things on it.",
      images: [
        photoSlot("story-school", 1200, 900, "A Dell Inspiron laptop, similar to the first one"),
        { src: "/images/stock/online-class.jpg", width: 1200, height: 801, alt: "A student taking notes during an online class (stock photo)" },
      ],
      quote: { text: "Education is the most powerful weapon which you can use to change the world.", by: "Nelson Mandela" },
      credit: "Online class photo: Julia M Cameron on Pexels.",
    },
    {
      label: "College to university",
      title: "From Dhaka Commerce College to DIU",
      text: "After my HSC at Dhaka Commerce College, I chose Computer Science & Engineering at Daffodil International University. There I found the part I enjoy most: system design.",
      images: [
        photoSlot("story-college-2", 387, 516, "The entrance of Dhaka Commerce College"),
        photoSlot("story-diu-campus", 1000, 1165, "The Daffodil International University main entrance"),
      ],
      quote: { text: "I have no special talent. I am only passionately curious.", by: "Albert Einstein" },
    },
    {
      label: "Real clients",
      title: "Building for a real business",
      text: "My first real client was a boba tea company. I designed Alez POS for them: a point of sale that keeps selling when the internet drops and syncs when it returns.",
      images: [
        photoSlot("pos-overview", 1280, 960, "The Alez POS selling screen"),
        photoSlot("pos-detail", 1280, 960, "A detail of the Alez POS order flow"),
      ],
      quote: { text: "Simplicity is prerequisite for reliability.", by: "Edsger W. Dijkstra" },
    },
    {
      label: "Hackathons",
      title: "Building against the clock",
      text: "With my teammates I compete in hackathons. For CloudSentinel, a finalist at the International AI Builders Congress, I worked on the architecture, infrastructure design and task plan.",
      images: [
        { src: "/images/achievements/ai-builders-congress-final-round.jpg", width: 640, height: 360, alt: "AI Builders Congress final round team list, including team Hectors" },
        { src: "/images/projects/cloudsentinel/overview.jpg", width: 843, height: 382, alt: "The CloudSentinel fleet overview dashboard" },
      ],
      quote: { text: "Talk is cheap. Show me the code.", by: "Linus Torvalds" },
    },
  ],
} satisfies Site;

export const hackathons: Hackathon[] = [
  { name: "CloudSentinel · International AI Builders Congress 2026", role: "Lead architect · Team Hectors", result: "Finalist · final on 26 December 2026", live: "https://cloudsentinel-sigma.vercel.app/fleet" },
  { name: "Jomi Barta · DIU LandTech Hackathon", role: "Lead architect · Team TreeTweet", result: "Finalist · final on 12 December 2026", live: "https://jomibarta.vercel.app/" },
  { name: "OptiNode · AI Innovation Hackathon 2026, DIU", role: "Team member", result: "Concept finalist · 25 July 2026" },
  { name: "Vibe coding contest · AI Dev Fest 2026", role: "Participant", result: "73rd place" },
  { name: "12th ICT Fest hackathon · IUT", role: "Participant", result: "Preliminary round" },
  { name: "CSE Fest hackathon · BUP", role: "Participant", result: "Preliminary round" },
];

export const hackathonContent = {
  label: "Hackathons",
  title: "Built against the clock.",
  github: "GitHub",
  live: "Live",
};

export const resumeLink = { label: "CV", href: "/cv" };

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
    { label: "Home", href: "/" }, navigationLinks.services, navigationLinks.writing, navigationLinks.about, navigationLinks.contact,
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
  whatsappLabel: site.whatsapp.display,
  workLabel: "See my work",
  aboutTitle: "About me",
  approachTitle: "Approach",
  workTitle: "Work",
  workNavLabel: "Services",
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

const serviceDestinations = [
  { ...navigationLinks.work, label: "Projects" },
  navigationLinks.approach,
  navigationLinks.lab,
];

export const workNavigation = {
  label: "Services sections",
  dropdown: [...serviceDestinations, navigationLinks.estimate],
  links: [navigationLinks.services, ...serviceDestinations, { ...navigationLinks.estimate, label: "Estimate" }],
};

export const menuGroups = [
  { label: "Home", links: [{ label: "Home", href: "/" }] },
  { label: navigationLinks.services.label, links: workNavigation.links },
  { label: "Writing & Travel", links: [navigationLinks.writing, navigationLinks.travel] },
  { label: "About", links: [navigationLinks.about] },
  { label: "Contact & CV", links: [navigationLinks.contact, navigationLinks.resume, { ...shell.email, label: "Email" }, { href: site.whatsapp.href, label: shell.whatsappLabel }, ...site.socials] },
  { label: "More", links: [navigationLinks.uses, navigationLinks.now] },
];

export const footerGroups = menuGroups.map((group) => ({
  ...group,
  links: group.links.filter(({ href }) => href !== site.whatsapp.href),
}));
const achievementPhoto = (name: string, width: number, height: number, alt: string) => ({ src: `/images/achievements/${name}.jpg`, width, height, alt });
const stockPhoto = (name: string, width: number, height: number, alt: string) => ({ src: `/images/stock/${name}.jpg`, width, height, alt });

export const aboutPage = {
  profile: {
    label: "Profile",
    rows: [
      { label: "Studying", value: "BSc CSE, Daffodil International University" },
      { label: "Based in", value: "Dhaka, Bangladesh" },
      { label: "Exchange", value: "IIT Bombay, spring 2027" },
      { label: "Builds", value: "POS, business systems, websites" },
      { label: "Speaks", value: "Bangla, English, Hindi, Japanese (basic)" },
      { label: "From", value: "Jhenaidah, Bangladesh" },
    ],
    cv: { label: "Download CV", href: "/cv" },
  },
  learned: {
    label: "How I learned to build",
    title: "A laptop instead of a phone.",
    paragraphs: [
      "When COVID moved my Class 9 lessons online, I needed a device. I chose a laptop over a phone: a Dell Inspiron 15 3000 with an i3 and 4 GB of RAM. It was slow, but it was mine, and it was enough to start building.",
      "I learned by making small things and breaking them. That curiosity led me to Computer Science & Engineering at Daffodil International University, where system design became the part I enjoy most.",
      "Now I design software for real businesses: I map the data, roles and failure cases, explain the trade-offs, and direct AI agents to build it — then test what happens when things go wrong.",
    ],
    quote: { text: "The most damaging phrase in the language is: it's always been done this way.", by: "Grace Hopper" },
  },
  experience: {
    label: "Experience",
    title: "Where I've put it to work.",
    items: [
      { period: "Ongoing", title: "Freelance software systems architect", org: "Independent", text: "Designed Alez POS for Yaucha Food & Beverage — an offline-first point of sale that keeps selling when the internet drops — and built personal websites for clients." },
      { period: "2026", title: "Research team member, second author", org: "Traffic accident injury prediction, DIU", text: "Explainable machine learning for predicting traffic accident injury severity. The paper has been submitted." },
      { period: "2026", title: "Lead architect in hackathon teams", org: "Team Hectors · Team TreeTweet", text: "Architecture, infrastructure design and task planning for CloudSentinel and Jomi Barta, both finalists." },
    ],
  },
  achievements: {
    label: "Achievements",
    title: "Milestones, hackathons and results.",
    columns: { year: "Year", title: "What", org: "Organiser", result: "Result", photo: "Photo" },
    view: "View",
    rows: [
      { year: "2027", title: "Exchange semester at IIT Bombay", org: "DIU–IIT Bombay MoU", result: "Selected", photo: null },
      { year: "2026", title: "CloudSentinel", org: "International AI Builders Congress (CloudCamp Bangladesh)", result: "Finalist · final on 26 Dec", photo: null },
      { year: "2026", title: "Jomi Barta", org: "DIU LandTech Hackathon", result: "Finalist · final on 12 Dec", photo: null },
      { year: "2026", title: "Research paper on traffic accident injury prediction", org: "Daffodil International University", result: "Submitted · second author", photo: null },
      { year: "2026", title: "OptiNode", org: "DIU AI Innovation Hackathon", result: "Concept finalist", photo: achievementPhoto("diu-ai-innovation-hackathon-2026", 526, 526, "Poster for the DIU AI Innovation Hackathon 2026") },
      { year: "2026", title: "Vibe coding contest", org: "AI Dev Fest", result: "73rd place", photo: null },
      { year: "2026", title: "12th ICT Fest hackathon", org: "IUT", result: "Preliminary round", photo: null },
      { year: "2026", title: "CSE Fest hackathon", org: "BUP", result: "Preliminary round", photo: null },
    ],
    close: "Close",
  },
  outside: {
    label: "Outside work",
    title: "What I do when I'm not designing systems.",
    items: [
      { title: "Travel", text: "24 of 64 districts in Bangladesh so far, and Malaysia in June 2025.", image: photoSlot("outside-travel-map", 800, 1000, "Map of Bangladesh with the districts Abdullah Alif has visited highlighted") },
      { title: "Hackathons", text: "Building against the clock with my team, from idea to demo in a weekend.", image: { src: "/images/projects/cloudsentinel/fleet-graph.jpg", width: 843, height: 380, alt: "The CloudSentinel fleet graph of agents, tools and models" } },
      { title: "Research", text: "Machine learning for traffic accident injury prediction, with a research team at DIU.", image: stockPhoto("research-road", 480, 600, "An aerial view of cars at a road intersection (stock photo)") },
      { title: "Learning Japanese", text: "Finished a basic Japanese course at DILC; I hope to study in Japan one day.", image: stockPhoto("japanese-study", 480, 600, "Japanese study notes and a pen (stock photo)") },
    ],
    credit: "Stock photos: Tyler Casey on Unsplash (Research), Gu Ko on Pexels (Learning Japanese).",
  },
  moments: {
    label: "Moments",
    title: "Moments along the way.",
    hint: "Select a photograph to see it larger.",
    place: "Moments",
    photos: [
      { ...photoSlot("home-about-car", 1280, 720, "Abdullah Alif sitting in a red car with his arm on the open door"), caption: "Behind the wheel — one of my favourite photos", large: true },
      { ...photoSlot("moment-metro-rail-hd", 756, 736, "Abdullah Alif in a jacket on the Dhaka Metro Rail"), caption: "Dhaka Metro Rail, February 2024", large: true },
      { ...photoSlot("moment-savar-resort-hd", 957, 960, "Abdullah Alif in a kurta by a pool with palm trees"), caption: "A resort in Savar", large: true },
      { ...photoSlot("moment-boat-dome", 960, 960, "Abdullah Alif in a jacket in front of a wooden boat at the Military Museum in Dhaka"), caption: "A wooden boat at the Military Museum, Dhaka" },
      { ...photoSlot("moment-jahangirnagar", 205, 206, "Abdullah Alif holding the flag of Bangladesh in a field"), caption: "Jahangirnagar University, July 2024" },
      { ...photoSlot("moment-mirror", 200, 200, "Abdullah Alif taking a mirror selfie in a round mirror"), caption: "A quick mirror selfie" },
    ],
  },
  now: {
    label: "Now",
    title: "What I'm doing now.",
    more: "More on the Now page",
  },
  alsoOnSite: {
    label: "Also on this site",
    cards: [
      { icon: "architecture", title: "Writing", text: "Notes on systems, travel and technology.", href: "/writing" },
      { icon: "operations", title: "Travel", text: "Travel notes from Bangladesh and Malaysia.", href: "/travel" },
      { icon: "operations", title: "Now", text: "What I'm building and learning this season.", href: "/now" },
      { icon: "operations", title: "Uses", text: "The tools and setup I work with.", href: "/uses" },
      { icon: "access", title: "Lab demos", text: "Small interactive demos of ideas from my work.", href: "/lab" },
      { icon: "architecture", title: "Estimate a project", text: "A quick range for time and budget.", href: "/estimate" },
    ] as const,
  },
};

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
  aboutPhoto: photoSlot("home-about-car", 1280, 720, "Abdullah Alif sitting in a red car with his arm on the open door"),
  aboutPhotoQuote: { text: "The best way to predict the future is to invent it.", by: "Alan Kay" },
  heroActions: { email: "Email me", work: "See my work", cv: "Download CV", cvHref: "/cv", socials: "Find me online" },
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
  label: "About me",
  heading: site.name,
  brief: "I'm a CSE student in Dhaka who likes to understand a system before building it. I start with the questions behind a business — who uses it, what can go wrong, what it costs to run — and turn the answers into software people can rely on. I'm curious by default, patient with hard problems, and I would rather ship one thing that works than five that almost do.",
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
  // DEMO: awaiting mission and vision copy.
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
  workFilter: "Filter projects by category",
  featuredProject: "Featured project",
  viewCaseStudy: "View case study",
  screens: "Screens",
  openImage: "Open image",
  lightbox: { close: "Close", previous: "Previous image", next: "Next image", hint: "Use the arrow keys or swipe to move between images. Press Esc to close." },
  workEmpty: "No projects match this category.",
  allWorkCategories: "All",
  workIntro: "Client work, hackathons, university projects and research. Click a card for the full case study, or an image to see it larger.",
  contents: "In this case study",
  decisions: "Key decisions & trade-offs",
  alternatives: "Options considered",
  reasoning: "Why this decision",
  timeline: "Delivery timeline",
  challenges: "Challenges",
  metrics: "Project outcomes",
  problem: "Problem",
  solution: "Solution",
  stack: "Built with (via AI agents)",
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
    "tech-economy": { label: "Tech & economy", href: "/writing/category/tech-economy" },
    "my-take": { label: "My take", href: "/writing/category/my-take" },
  },
  readTime: (minutes: number) => `${minutes} min read`,
  rssLabel: "RSS feed",
  rssPath: "/writing/rss.xml",
  rssPage: {
    title: "RSS feed",
    intro: "This is the RSS feed for Abdullah Alif's writing. Copy the address below into a feed reader to follow new posts.",
    addressLabel: "Feed address",
    latest: "Latest posts",
    back: "Back to the site",
  },
  coverAlt: (title: string) => `Cover image for ${title}`,
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
    photoSlot("travel-malaysia-putrajaya", 1200, 900, "Abdullah Alif in front of Putra Mosque in Putrajaya"),
    photoSlot("moment-metro-rail-hd", 756, 736, "Abdullah Alif on the Dhaka Metro Rail"),
    photoSlot("moment-savar-resort-hd", 957, 960, "Abdullah Alif in a kurta at a resort in Savar"),
    photoSlot("travel-langkawi", 640, 640, "Abdullah Alif sitting by a tree on a street in Langkawi, Malaysia"),
    photoSlot("home-about-car", 1280, 720, "Abdullah Alif sitting in a red car with his arm on the open door"),
    photoSlot("travel-viewpoint", 1200, 900, "Abdullah Alif at the Langkawi Sky Bridge viewpoint, with misty hills behind"),
    photoSlot("travel-malaysia-hat", 1200, 900, "Abdullah Alif in a brown hat with a Malaysian flag"),
    photoSlot("travel-bangladesh-trio", 618, 206, "Sitakunda, Hatiya and the 201 Dome Mosque in Tangail"),
  ] as ImageAsset[],
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
  credit: "Stock photos from Pexels: divinetechygirl (flowchart), Brett Sayles (server racks).",
  cards: [
    { icon: "custom", title: site.services[0], description: "Software shaped around how your business really works, from the first sketch to launch.", href: "/services#custom", image: { src: "/images/stock/service-architecture.jpg", width: 480, height: 600, alt: "A hand drawing a flowchart on a whiteboard" } },
    { icon: "pos", title: site.services[1], description: "Billing, stock and daily reports for shops and cafés, with an offline mode.", href: "/services#pos", image: { src: "/images/slots/service-operations.jpg", width: 360, height: 450, alt: "The Alez POS selling screen" } },
    { icon: "backoffice", title: site.services[2], description: "Track stock, suppliers and staff work behind the counter.", href: "/services#backoffice", image: { src: "/images/stock/service-offline.jpg", width: 480, height: 600, alt: "Rows of server racks in a data centre" } },
    { icon: "dashboard", title: site.services[3], description: "Screens that show your numbers, or web tools your team uses every day.", href: "/services#dashboard", image: { src: "/images/stock/service-access.jpg", width: 480, height: 600, alt: "Locked server cabinets in a data centre" } },
  ] as const,
};

export const toolsMarquee = {
  label: "How I build: I design, AI agents implement, I review and test.",
  pause: "Pause scrolling",
  items: ["Codex", "Claude", "GitHub", "GitHub Actions", "Vercel", "Supabase", "Playwright", "SQLite"],
};
