import type { Site } from "./schema";

// Single source of truth for all site copy. Edit text here, never in components.
export const site = {
  name: "Abdullah Alif",
  fullName: "Md. Abdullah Alif",
  logoText: "© Built by Alif",
  role: "Software Systems Architect & Freelance Developer",
  location: "Dhaka, Bangladesh",
  intro:
    "I design and build reliable software systems for businesses — from architecture to launch.",
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
  // TODO(Alif): replace with your real story + add a photo for each chapter.
  story: [
    {
      label: "Jhenaidah",
      title: "Where it started",
      text: "I grew up in Jhenaidah. TODO(Alif): a few lines about childhood and how you first met computers.",
      image: null,
    },
    {
      label: "School & college",
      title: "Learning to build",
      text: "TODO(Alif): school and college years — what you studied and what you started making.",
      image: null,
    },
    {
      label: "Daffodil International University",
      title: "Computer Science & Engineering",
      text: "I study CSE at DIU and work with a research team on traffic accident risk prediction.",
      image: null,
    },
    {
      label: "Savar, Dhaka",
      title: "Now",
      text: "I live in Savar and design and build software systems for businesses as a freelancer.",
      image: null,
    },
  ],
} satisfies Site;

export const shell = {
  home: { label: "Home", href: "/" },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/approach" },
    { label: "About me", href: "/about" },
    { label: "Contact", href: "#contact" },
  ],
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
};


export const seo = {
  fallbackUrl: "http://localhost:3000",
  schemaContext: "https://schema.org",
  sitemapPath: "/sitemap.xml",
  imagePath: "/opengraph-image",
  pages: {
    home: { title: `${site.name} — ${site.role}`, description: site.intro, path: shell.home.href },
    about: { title: shell.aboutTitle, description: site.about[0], path: shell.nav[2].href },
    approach: { title: shell.approachTitle, description: site.tagline + " " + site.approach[0].text, path: shell.nav[1].href },
    work: { title: shell.workTitle, description: "Selected software systems, client projects and research by Abdullah Alif.", path: shell.nav[0].href },
  },
};

export const homeContent = {
  aboutLabel: "A little about me",
  aboutTitle: "The person behind the systems.",
  aboutLink: "More about me",
  servicesLabel: "What I do",
  servicesTitle: "Software built around your business.",
};
