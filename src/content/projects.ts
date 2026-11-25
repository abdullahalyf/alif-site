import type { Project } from "./schema";

function shot(name: string, width: number, height: number, alt: string): { src: string; width: number; height: number; alt: string };
function shot(name: string, width: number, height: number, alt: string, caption: string): { src: string; width: number; height: number; alt: string; caption: string };
function shot(name: string, width: number, height: number, alt: string, caption?: string) {
  return { src: `/images/projects/${name}.jpg`, width, height, alt, ...(caption && { caption }) };
}

// Single source of truth for all project copy. Edit text here, never in components.
export const projects = [
  {
    slug: "multi-branch-pos",
    title: "Alez POS",
    client: "Yaucha Food & Beverage",
    year: 2026,
    role: "System architect · Directed Codex and Claude · Reviewed and tested",
    category: "Client work",
    summary:
      "A POS and back-office system for a multi-branch boba tea brand in Dhaka. It is live in 3 branches and built to scale to 9. I designed the system and directed AI agents to build it, then reviewed and tested the implementation.",
    problem:
      "The brand runs several branches and needed one system for all of them: fast billing at every counter, owners who can see sales and reports from anywhere, and central control across branches — without a heavy, expensive setup.",
    solution: [
      "In every branch: an in-shop POS for billing at the counter.",
      "Online access: owners and managers check sales and reports from anywhere.",
      "Central control: all branches are managed from one system.",
      "Plug-and-play branches: adding a branch is configuration, not new code.",
      "Desktop POS (Electron) with a local SQLite database that syncs to the cloud, using branch- and device-prefixed order IDs so no sale is counted twice.",
      "Role-based access enforced at the database level with Postgres row-level security.",
      "Recipe-based inventory: every cup sold deducts its raw ingredients automatically.",
      "A virtual printer that previews receipts and cup stickers on screen, so printing can be built and tested without a physical printer.",
    ],
    stack: [
      "Electron",
      "React",
      "TypeScript",
      "SQLite",
      "Supabase",
      "PostgreSQL",
      "Cloudflare",
      "GitHub Actions",
    ],
    results: [
      "Live in 3 branches today",
      "Built to scale to 9 branches on a single codebase",
      "Adding a branch is configuration, not new code",
    ],
    link: null,
    builtWith: "Orchestrated with: Codex, Claude",
    decisions: [
      { decision: "Keep a local SQLite copy at each counter", alternatives: "A cloud-only checkout or a local store with automatic sync", why: "Counter sales must continue during outages. Local persistence makes the sale durable immediately, at the cost of designing a sync path." },
      { decision: "Give each sale a stable, branch- and device-prefixed ID", alternatives: "Rely on each server request as a new write or deduplicate by operation ID", why: "The same sale can be sent again after a lost response. Retrying the same ID avoids adding a duplicate to the ledger." },
      { decision: "Enforce branch rights with PostgreSQL row-level security", alternatives: "Application checks on every request or rules applied at the database", why: "The database protects records across the POS and back office. Each of the six roles still needs explicit policy tests." },
      { decision: "Stage updates and provide rollback", alternatives: "Update every branch at once or roll out in stages", why: "A rollout mistake should affect as few counters as possible. Staging reduces the blast radius and adds release coordination." },
    ],
    challenges: [
      { problem: "Unstable internet at the counter", resolution: "Store sales locally and reconcile automatically when the connection returns." },
      { problem: "Stock movements depend on recipes", resolution: "Capture the sale once, then deduct its ingredients using the defined recipe." },
      { problem: "Owners need visibility across the chain", resolution: "Use branch health checks, audits and nightly reports to surface what needs attention." },
    ],
    metrics: [
      { label: "Branches live", value: "3" },
      { label: "Built to scale to", value: "9 branches" },
      { label: "Adding a branch", value: "Configuration, not new code" },
    ],
    images: [
      shot("alez-pos/pos-sell", 1600, 846, "The Alez POS sell screen with the drink menu and the current order"),
      shot("alez-pos/portal-menu", 1600, 754, "The Alez online portal, menu and prices for a branch"),
      shot("alez-pos/output-receipts-stickers", 1079, 865, "Cup stickers and receipts previewed in the Alez virtual printer"),
      shot("alez-pos/pos-reports", 1600, 846, "The Alez POS sales report for the last seven days"),
    ],
    galleries: [
      {
        title: "In-shop POS software",
        text: "The screens a cashier uses at the counter. The figures shown come from a test till, not a real branch.",
        images: [
          shot("alez-pos/pos-sell", 1600, 846, "The Alez POS sell screen", "Sell screen: the drink menu with the branch discount, and the current order on the right."),
          shot("alez-pos/pos-customize", 1600, 861, "Customising a drink in the Alez POS", "Customising a drink: size, sugar level, ice and toppings."),
          shot("alez-pos/pos-sale-complete", 1600, 854, "The sale complete screen in the Alez POS", "Sale complete: the order number and the amount paid, ready for the next order."),
          shot("alez-pos/pos-shift", 1600, 860, "The shift screen in the Alez POS", "Shift: opening cash, bKash balance, expenses and the cash count when the day closes."),
          shot("alez-pos/pos-reports", 1600, 846, "The Alez POS sales report", "Reports: sales by payment method and by order type for the last seven days (test data)."),
        ],
      },
      {
        title: "Online management portal",
        text: "Where owners and managers control every branch from one place.",
        images: [
          shot("alez-pos/portal-menu", 1600, 754, "The Alez portal menu and prices page", "Menu and prices: company prices, branch prices and discounts for each drink size."),
          shot("alez-pos/portal-access", 1600, 762, "The Alez portal account access page", "Account access: the signed-in role and the actions it is allowed to take."),
        ],
      },
      {
        title: "POS output",
        text: "What the system prints and shows to customers. The virtual printer lets me check all of it on screen.",
        images: [
          shot("alez-pos/output-receipts-stickers", 1079, 865, "Cup stickers and receipts in the virtual printer", "Virtual printer: cup stickers and receipts previewed on screen, no physical printer needed."),
          shot("alez-pos/output-customer-display", 1600, 860, "The customer display showing an order", "Customer display: the order, discount and total shown to the customer."),
          shot("alez-pos/output-welcome-screen", 1600, 900, "The customer display welcome screen", "Customer display: the welcome screen while the counter is idle."),
        ],
      },
    ],
  },
  {
    slug: "cloudsentinel",
    title: "CloudSentinel",
    client: "International AI Builders Congress 2026 · CloudCamp Bangladesh",
    year: 2026,
    role: "Lead architect · System and infrastructure design, task planning (Team Hectors, 5 members)",
    category: "Hackathons",
    summary:
      "A web control tower for watching cloud and fleet infrastructure in one place. Finalist at the International AI Builders Congress 2026; the final is on 26 December at DIU.",
    solution: [
      "A web control tower with a fleet overview, a graph of agents, tools and models, and a session replay.",
      "I led the architecture, the infrastructure design and the team's task plan.",
      "It is the rebuilt successor of our OptiNode concept.",
    ],
    stack: [],
    results: ["Finalist · final on 26 December 2026 at DIU"],
    link: "https://cloudsentinel-sigma.vercel.app/fleet",
    images: [
      shot("cloudsentinel/overview", 843, 382, "The CloudSentinel fleet overview dashboard", "Fleet overview: the state of the whole fleet on one screen."),
      shot("cloudsentinel/fleet-graph", 843, 380, "The CloudSentinel fleet graph of agents, tools and models", "Fleet graph: how agents, tools and models connect."),
      shot("cloudsentinel/session-replay", 843, 381, "The CloudSentinel session replay", "Session replay: stepping back through what happened in a session."),
    ],
  },
  {
    slug: "jomi-barta",
    title: "Jomi Barta (জমিবার্তা)",
    client: "DIU LandTech Hackathon · Team TreeTweet",
    year: 2026,
    role: "Lead architect · System design (team lead: Irfanul Haque Tasin)",
    category: "Hackathons",
    summary:
      "A bilingual guide that helps people in Bangladesh check a piece of land before they buy it. Finalist at the DIU LandTech Hackathon; the final is on 12 December.",
    problem:
      "Buying land in Bangladesh means checking ownership, mutation, cases, khas land and acquisition, and most buyers do not know where to start or which papers to ask for.",
    solution: [
      "Five clear checks: ownership, mutation, cases, khas land and acquisition.",
      "A checklist of the papers to ask the seller for at each step.",
      "Links to the official government portals for each check.",
      "Bangla and English versions of every page.",
    ],
    stack: [],
    results: ["Finalist · final on 12 December 2026"],
    link: "https://jomibarta.vercel.app/",
    images: [
      shot("jomibarta/home-hero", 1200, 600, "The Jomi Barta home page in Bangla", "Home page: the promise and the first step, in Bangla."),
      shot("jomibarta/five-checks", 1200, 925, "The five checks on the Jomi Barta home page", "The five checks to make before buying land."),
    ],
  },
  {
    slug: "optinode",
    title: "OptiNode",
    client: "AI Innovation Hackathon 2026 · Dept. of CSE, DIU",
    year: 2026,
    role: "Team member · Concept and slides",
    category: "Hackathons",
    summary:
      "A concept for the theme “AI for Cluster Intelligence: Making Computers Faster, Cheaper, and More Reliable”. It reached the finals as a concept; the team did not take it further, and CloudSentinel is its rebuilt successor.",
    solution: [
      "A concept and a slide deck for the hackathon. The team did not build it.",
      "Its idea lives on in CloudSentinel.",
    ],
    stack: [],
    results: ["Concept finalist, 25 July 2026"],
    link: null,
    images: [
      { src: "/images/achievements/diu-ai-innovation-hackathon-2026.jpg", width: 526, height: 526, alt: "Poster for the DIU AI Innovation Hackathon 2026", caption: "The hackathon poster." },
    ],
  },
  {
    slug: "client-sites",
    title: "Personal websites for friends",
    client: "Yousha Ahmad · Fahmida Jannat Shruty · Ratul Hasan",
    year: 2026,
    role: "Designer and developer",
    category: "Client work",
    summary:
      "Three personal portfolio sites for fellow DIU students, each with a home page, an about page, projects, a blog and a contact page.",
    solution: [
      "Each person gets a home page, an about page, projects, a blog and a contact page.",
      "The sites are built with Hugo and published on GitHub Pages.",
    ],
    stack: ["Hugo", "GitHub Pages"],
    results: ["Three sites live on GitHub Pages"],
    link: null,
    images: [
      shot("client-sites/yousha-home-hero", 1200, 1071, "The home page of Yousha Ahmad's website"),
      shot("client-sites/shruty-home-main", 1200, 1071, "The home page of Fahmida Jannat Shruty's website"),
      shot("client-sites/ratul-home-hero", 1200, 857, "The home page of Ratul Hasan's website"),
    ],
    galleries: [
      {
        title: "Yousha Ahmad",
        link: { label: "Visit the site", href: "https://abdullahalyf.github.io/yusha-site/" },
        images: [
          shot("client-sites/yousha-home-hero", 1200, 1071, "The home page of Yousha Ahmad's website", "Home: name, role, photo and a short intro."),
          shot("client-sites/yousha-home-work", 1200, 669, "Projects and recent writing on Yousha Ahmad's home page", "Home: projects and recent writing."),
          shot("client-sites/yousha-about-intro", 1200, 1269, "The about page of Yousha Ahmad's website", "About: story, education and experience."),
          shot("client-sites/yousha-about-moments", 1200, 553, "The Moments photo gallery on Yousha Ahmad's about page", "About: a gallery of moments."),
          shot("client-sites/yousha-blog-list", 1200, 1029, "The blog page of Yousha Ahmad's website", "Blog: a list of posts with a cover image, date and reading time."),
        ],
      },
      {
        title: "Fahmida Jannat Shruty",
        link: { label: "Visit the site", href: "https://252-15-826-sketch.github.io/shruti/" },
        images: [
          shot("client-sites/shruty-home-main", 1200, 1071, "The home page of Fahmida Jannat Shruty's website", "Home: intro, semester results, selected project and moments."),
          shot("client-sites/shruty-blog-list", 1200, 1020, "The blog page of Fahmida Jannat Shruty's website", "Blog: notes on web development, systems and study."),
        ],
      },
      {
        title: "Ratul Hasan",
        link: { label: "Visit the site", href: "https://252-15-826-sketch.github.io/ratul-hasan/" },
        images: [
          shot("client-sites/ratul-home-hero", 1200, 857, "The home page of Ratul Hasan's website", "Home: intro, skills, selected project and moments."),
          shot("client-sites/ratul-home-results", 1200, 591, "Achievements and semester results on Ratul Hasan's home page", "Home: achievements and semester results."),
          shot("client-sites/ratul-about-intro", 1200, 1059, "The about page of Ratul Hasan's website", "About: background, results and education."),
          shot("client-sites/ratul-about-moments", 1200, 651, "The Moments photo gallery on Ratul Hasan's about page", "About: a gallery of moments with captions."),
        ],
      },
    ],
  },
  {
    slug: "campus-navigator",
    title: "Campus Navigator",
    client: "University course project · Daffodil International University",
    role: "Developer · Course project",
    category: "University",
    summary:
      "A campus navigation project for a university course. The course teacher was very pleased with it.",
    solution: [],
    stack: [],
    results: ["Praised by the course teacher"],
    link: null,
    images: [],
  },
  {
    slug: "console-ecommerce",
    title: "Console-based e-commerce system",
    client: "University course project · Daffodil International University",
    role: "Developer · Course project",
    category: "University",
    summary:
      "A full e-commerce system that runs entirely in the console, built for a university course. The course teacher highly appreciated how complete a system it was.",
    solution: [],
    stack: [],
    results: ["Highly appreciated by the course teacher"],
    link: null,
    images: [],
  },
  {
    slug: "traffic-accident-risk",
    title: "Traffic accident injury prediction",
    client: "Research · Daffodil International University",
    year: 2026,
    role: "Second author · Research team member",
    category: "Research",
    summary:
      "Machine learning research on predicting traffic accident injuries, done with a research team at DIU. The paper has been submitted.",
    problem:
      "Road accidents cost lives and money. Predicting where and when injuries are likely helps planners and traffic systems act before accidents happen.",
    solution: [
      "Compared and evaluated models that predict traffic accident injury.",
    ],
    stack: ["Python", "Machine learning"],
    results: ["Paper submitted for publication"],
    metrics: [{ label: "Research status", value: "Paper submitted" }],
    link: null,
    images: [
      { src: "/images/stock/research-road.jpg", width: 480, height: 600, alt: "An aerial view of cars at a road intersection", caption: "Stock photo, not from the project" },
    ],
  },
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
