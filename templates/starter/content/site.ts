import type { Site } from '../../../src/content/schema';

// REPLACE every placeholder with confirmed content before publication.
export const site = {
  "name": "Your Name", // REPLACE
  "fullName": "Your Full Name", // REPLACE
  "logoText": "Your Name", // REPLACE
  "logoInitial": "Y", // REPLACE
  "role": "Your Role", // REPLACE
  "location": "Your City, Country", // REPLACE
  "intro": "Introduce yourself and your work.", // REPLACE
  "now": [ // REPLACE
    "Your current focus." // REPLACE
  ], // REPLACE
  "achievements": [ // REPLACE
    {
      "title": "Your achievement", // REPLACE
      "org": "Your organisation", // REPLACE
      "year": 2026, // REPLACE
      "text": "Describe your achievement." // REPLACE
    }
  ], // REPLACE
  "education": [ // REPLACE
    {
      "title": "Your qualification", // REPLACE
      "org": "Your school", // REPLACE
      "years": "Your study years", // REPLACE
      "text": "Describe your studies.", // REPLACE
      "image": { "src": "/images/alif-portrait.jpg", "width": 2400, "height": 1350, "alt": "Your school photo" } // REPLACE
    }
  ], // REPLACE
  "skills": [ // REPLACE
    {
      "title": "Your skill group", // REPLACE
      "icon": "systems", // REPLACE
      "items": [ // REPLACE
        { "name": "Your skill", "level": 3, "note": "Where you used it" } // REPLACE
      ] // REPLACE
    }
  ], // REPLACE
  "languages": [ // REPLACE
    {
      "name": "Your language", // REPLACE
      "level": "Your level" // REPLACE
    }
  ], // REPLACE
  "interests": [ // REPLACE
    "Your interest" // REPLACE
  ], // REPLACE
  "stats": [ // REPLACE
    {
      "value": "Your figure", // REPLACE
      "label": "Your verified measure" // REPLACE
    }
  ], // REPLACE
  "testimonials": [ // REPLACE
    {
      "name": "Your reference name", // REPLACE
      "role": "Your reference role", // REPLACE
      "quote": "Replace with a real approved quote." // REPLACE
    }, // REPLACE
    {
      "name": "Your second reference", // REPLACE
      "role": "Your reference role", // REPLACE
      "quote": "Replace with another real approved quote." // REPLACE
    }
  ], // REPLACE
  "about": [ // REPLACE
    "Your personal story." // REPLACE
  ], // REPLACE
  "email": "you@example.com", // REPLACE
  "whatsapp": { // REPLACE
    "display": "Your phone number", // REPLACE
    "href": "https://wa.me/15555550100" // REPLACE
  }, // REPLACE
  "socials": [ // REPLACE
    {
      "label": "Your profile", // REPLACE
      "href": "https://example.com" // REPLACE
    }
  ], // REPLACE
  "heroPhoto": { // REPLACE
    "src": "/images/your-portrait.jpg", // REPLACE
    "width": 2400, // REPLACE
    "height": 1350, // REPLACE
    "alt": "Your portrait description" // REPLACE
  }, // REPLACE
  "avatar": { // REPLACE
    "src": "/images/your-portrait.jpg", // REPLACE
    "width": 400, // REPLACE
    "height": 400, // REPLACE
    "alt": "Your portrait description" // REPLACE
  }, // REPLACE
  "aboutPhoto": { // REPLACE
    "src": "/images/your-portrait.jpg", // REPLACE
    "width": 1200, // REPLACE
    "height": 1500, // REPLACE
    "alt": "Your portrait description" // REPLACE
  }, // REPLACE
  "heroSide": { // REPLACE
    "src": "/images/your-portrait.jpg", // REPLACE
    "width": 900, // REPLACE
    "height": 1100, // REPLACE
    "alt": "Your portrait description" // REPLACE
  }, // REPLACE
  "statusCard": { // REPLACE
    "availability": "Available for new projects", // REPLACE
    "timezone": "Asia/Dhaka", // REPLACE
    "timezoneLabel": "Your City", // REPLACE
    "buildingLabel": "Currently building", // REPLACE
    "building": "What you are working on", // REPLACE
    "stack": [ // REPLACE
      "Your technology" // REPLACE
    ], // REPLACE
  }, // REPLACE
  "systemDiagram": { // REPLACE
    "label": "How the system fits together", // REPLACE
    "steps": [ // REPLACE
      "First", // REPLACE
      "Second" // REPLACE
    ], // REPLACE
  }, // REPLACE
  "services": [ // REPLACE
    "Your service" // REPLACE
  ], // REPLACE
  "tagline": "Your tagline", // REPLACE
  "approach": [ // REPLACE
    {
      "slug": "your-process-step", // REPLACE
      "title": "Your process step", // REPLACE
      "details": [], // REPLACE
      "text": "Describe how you work." // REPLACE
    }
  ], // REPLACE
  "story": [ // REPLACE
    {
      "label": "Your chapter label", // REPLACE
      "title": "Your chapter title", // REPLACE
      "text": "Describe this chapter of your life.", // REPLACE
      "images": [] // REPLACE
    }
  ] // REPLACE
} satisfies Site;

// REPLACE shared labels, descriptions and routes below as needed.
export const shell = { // REPLACE
  home: { label: "Home", href: "/" }, // REPLACE
  nav: [ // REPLACE
    { label: "Work", href: "/work" }, // REPLACE
    { label: "Approach", href: "/approach" }, // REPLACE
    { label: "Writing", href: "/writing" }, // REPLACE
    { label: "About me", href: "/about" }, // REPLACE
    { label: "Contact", href: "#contact" }, // REPLACE
  ], // REPLACE
  navigation: "Main navigation", // REPLACE
  menu: "Menu", // REPLACE
  closeMenu: "Close menu", // REPLACE
  skip: "Skip to content", // REPLACE
  mainHref: "#main", // REPLACE
  contactId: "contact", // REPLACE
  copyright: (year: number) => `© ${year} ${site.name}`, // REPLACE
  footerTitle: "Let's build something that keeps working.", // REPLACE
  email: { label: "Email me", href: `mailto:${site.email}` }, // REPLACE
  whatsappLabel: "WhatsApp", // REPLACE
  workLabel: "See my work", // REPLACE
  aboutTitle: "About me", // REPLACE
  approachTitle: "Approach", // REPLACE
  workTitle: "Work", // REPLACE
  caseStudyLabel: "Case study", // REPLACE
  notFoundTitle: "Page not found", // REPLACE
  notFoundText: "This page isn't here. Let's get you back home.", // REPLACE
  backHome: "Back home", // REPLACE
  projectHref: (slug: string) => `/work/${slug}`, // REPLACE
}; // REPLACE


export const seo = { // REPLACE
  fallbackUrl: "https://example.com", // REPLACE
  schemaContext: "https://schema.org", // REPLACE
  sitemapPath: "/sitemap.xml", // REPLACE
  imagePath: "/opengraph-image", // REPLACE
  pages: { // REPLACE
    home: { title: `${site.name} — ${site.role}`, description: site.intro, path: shell.home.href }, // REPLACE
    about: { title: shell.aboutTitle, description: site.about[0], path: shell.nav[3].href }, // REPLACE
    approach: { title: shell.approachTitle, description: site.tagline + " " + site.approach[0].text, path: shell.nav[1].href }, // REPLACE
    writing: { title: "Writing", description: "Notes on software systems, research and things I'm learning.", path: "/writing" }, // REPLACE
    now: { title: "What I'm doing now", description: "What Your Name is building, studying and learning now.", path: "/now" }, // REPLACE
    work: { title: shell.workTitle, description: "Selected software systems, client projects and research by Your Name.", path: shell.nav[0].href }, // REPLACE
  }, // REPLACE
}; // REPLACE

export const homeContent = { // REPLACE
  aboutLabel: "A little about me", // REPLACE
  aboutTitle: "The person behind the systems.", // REPLACE
  aboutLink: "More about me", // REPLACE
  servicesLabel: "What I do", // REPLACE
  servicesTitle: "Software built around your business.", // REPLACE
}; // REPLACE

export const workContent = { // REPLACE
  approachLabel: "How I work", // REPLACE
  approachTitle: "Good systems start with good questions.", // REPLACE
  approachLink: "Explore my approach", // REPLACE
  selectedLabel: "Selected work", // REPLACE
  selectedTitle: "Built to keep working.", // REPLACE
  allWork: "View all work", // REPLACE
  previous: "Previous projects", // REPLACE
  next: "Next projects", // REPLACE
  carouselLabel: "Selected projects", // REPLACE
}; // REPLACE

export const aboutContent = { // REPLACE
  storyLabel: "My story", // REPLACE
  storyTitle: "A few chapters along the way.", // REPLACE
}; // REPLACE

export const pageContent = { // REPLACE
  approachIntro: "From the first conversation to life after launch, here's how I turn a business problem into software that works.", // REPLACE
  workIntro: "Client work, independent projects and research. A closer look at the problems I solve and the systems behind them.", // REPLACE
  problem: "Problem", // REPLACE
  solution: "Solution", // REPLACE
  stack: "Stack", // REPLACE
  results: "Results", // REPLACE
  nextProject: "Next project", // REPLACE
  projectLink: "Visit project", // REPLACE
}; // REPLACE

export const writingContent = { // REPLACE
  title: "Writing", // REPLACE
  intro: "Notes on building software, asking questions and learning along the way.", // REPLACE
  empty: "No published posts yet. Check back soon.", // REPLACE
  rssLabel: "RSS feed", // REPLACE
  rssPath: "/writing/rss.xml", // REPLACE
  nowLabel: "Now", // REPLACE
  nowPath: "/now", // REPLACE
  nowTitle: "What I'm doing now", // REPLACE
  nowIntro: "A short snapshot of what has my attention.", // REPLACE
  back: "All writing", // REPLACE
  previous: "Previous post", // REPLACE
  next: "Next post", // REPLACE
  draft: "Draft preview", // REPLACE
  postHref: (slug: string) => `/writing/${slug}`, // REPLACE
}; // REPLACE

export const demoContent = { // REPLACE
  demoLabel: "DEMO", // REPLACE
  imageNotice: "Demo photographs · illustrative, not project screenshots", // REPLACE
  highlightsLabel: "Highlights", // REPLACE
  highlightsTitle: "Milestones along the way.", // REPLACE
  educationLabel: "Education", // REPLACE
  skillsLabel: "Skills", // REPLACE
  languagesLabel: "Languages", // REPLACE
  interestsLabel: "Interests", // REPLACE
  aboutDemoNotice: "Demo education details, skills and interests — to be confirmed by Alif.", // REPLACE
  statsLabel: "At a glance", // REPLACE
  statsNotice: "Demo figures · illustrative only", // REPLACE
  testimonialsLabel: "Working together", // REPLACE
  testimonialsTitle: "A little outside perspective.", // REPLACE
  testimonialsNotice: "Demo quotes from fictional people · not client endorsements", // REPLACE
  latestLabel: "Latest writing", // REPLACE
  latestTitle: "Notes from the workbench.", // REPLACE
}; // REPLACE
