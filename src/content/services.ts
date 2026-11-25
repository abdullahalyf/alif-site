import { servicesSchema } from "./schemas/services";
export const servicesContent = servicesSchema.parse({
  title: "Software and websites built around your business.",
  intro:
    "From a one-page website to a POS that runs every branch: tell me what you need, and I give you a clear range and a fixed quote after a short call.",
  label: "Services",
  browseLabel: "See the services",
  allServicesLabel: "Nine ways I can help",
  timelineLabel: "Typical timeline",
  processTitle: "How an engagement works",
  recommendedModel: "Fixed-scope project",
  recommendedLabel: "Best for a first project",
  priceLabel: "Price",
  modelsTitle: "Ways to work together",
  faqTitle: "Before we begin",
  cta: "Tell me about your project",
  contactPath: "/contact",
  estimateLabel: "Estimate this",
  rangeLabel: "Typical range",
  credit: "Stock photos from Pexels: Kevin Ku (code), Tiger Lily (warehouse), Mateusz Dach (desk), Jakub Zerdzicki (laptop and phone), Daniil Komov (laptop with code), Nataliya Vaitkevich (shopping cart), Lukas Blazek (dashboard), Atahan Demir (phone). The POS screen is my own Alez POS.",
  rangeNote: "Typical ranges in Bangladeshi taka. The final quote is agreed after a short call, before any work starts.",
  blocks: [
    { id: "custom", title: "Custom software", description: "Software shaped around how your business really works, built from scratch.", timeline: "Depends on scope", range: "Quote after a short call", image: { src: "/images/stock/service-custom.jpg", width: 960, height: 540, alt: "Code on a monitor seen through a pair of glasses" } },
    { id: "pos", title: "POS software", description: "Billing, stock and daily reports for shops and cafés, with an offline mode.", timeline: "4–8 weeks", range: "৳40,000–1,20,000", rangeNote: "or rent it monthly", image: { src: "/images/slots/service-pos-screen.jpg", width: 960, height: 514, alt: "The Alez POS selling screen with a drinks menu and the current order" } },
    { id: "backoffice", title: "Back-office & inventory", description: "Track stock, suppliers and staff work behind the counter.", timeline: "5–10 weeks", range: "৳50,000–1,50,000", image: { src: "/images/stock/service-backoffice.jpg", width: 960, height: 540, alt: "A warehouse aisle with shelves of boxes" } },
    { id: "business", title: "Business websites", description: "A fast, professional site that shows what you offer and brings in enquiries.", timeline: "2–4 weeks", range: "৳15,000–40,000", image: { src: "/images/stock/service-business.jpg", width: 960, height: 540, alt: "A desk with a laptop and monitor beside an open-for-business sign" } },
    { id: "landing", title: "Landing pages", description: "One focused page that turns visitors into calls and messages.", timeline: "1–2 weeks", range: "৳8,000–15,000", image: { src: "/images/stock/service-landing.jpg", width: 960, height: 540, alt: "A laptop and a phone on a wooden desk" } },
    { id: "portfolio", title: "Personal & portfolio websites", description: "A clean site that shows your work and your story.", timeline: "1–2 weeks", range: "৳5,000–12,000", image: { src: "/images/stock/service-portfolio.jpg", width: 960, height: 540, alt: "A laptop on a desk showing code beside a mug and notebook" } },
    { id: "ecommerce", title: "E-commerce", description: "An online shop with products, orders and payments.", timeline: "3–6 weeks", range: "৳30,000–80,000", image: { src: "/images/stock/service-ecommerce.jpg", width: 960, height: 540, alt: "A miniature shopping cart holding a parcel on a laptop" } },
    { id: "dashboard", title: "Dashboards & web apps", description: "Screens that show your numbers, or web tools your team uses every day.", timeline: "3–12 weeks", range: "৳25,000–2,00,000", image: { src: "/images/stock/service-dashboard.jpg", width: 960, height: 540, alt: "A laptop showing charts on a dashboard" } },
    { id: "mobile", title: "Mobile-first apps", description: "Apps designed for phones first, for your staff or your customers.", timeline: "6–12 weeks", range: "৳80,000–2,50,000", image: { src: "/images/stock/service-mobile.jpg", width: 960, height: 540, alt: "A hand holding a phone with a dark app open" } },
  ],
  steps: [
    {
      title: "Share the context",
      text: "Describe the business, users and current pain points.",
    },
    {
      title: "Map the constraints",
      text: "Agree on access, connectivity, budget and responsibilities.",
    },
    {
      title: "Define the first release",
      text: "Write down scope, acceptance criteria and a delivery plan.",
    },
    {
      title: "Build and review",
      text: "I direct AI agents to implement scoped changes, then review and test small releases with the people using them.",
    },
    {
      title: "Launch and hand over",
      text: "Test recovery, document ownership and agree on support.",
    },
  ],
  models: [
    {
      title: "Fixed-scope project",
      bestFor: "A defined problem with clear acceptance criteria.",
      price: "Fixed quote after a short call",
    },
    {
      title: "Monthly retainer",
      bestFor: "Ongoing improvements and care for an existing system.",
      price: "Monthly fee agreed after a short call",
    },
    {
      title: "Architecture review",
      bestFor: "An independent review before a major technical decision.",
      price: "Quoted after a short call",
    },
  ],
  faqs: [
    {
      question: "What should I send first?",
      answer:
        "A short description of your users, current process and main problem is enough.",
    },
    {
      question: "Can you work with an existing system?",
      answer:
        "Yes. We first review its constraints, ownership and deployment process.",
    },
    {
      question: "Do you work remotely?",
      answer:
        "Remote collaboration starts with written decisions and regular working demos.",
    },
    {
      question: "Can the app work offline?",
      answer:
        "We identify which workflows need local data and how conflicts should be resolved.",
    },
    {
      question: "How is pricing decided?",
      answer:
        "The ranges on this page are typical. After a short call about your project I send a fixed quote, and the scope is written down before work starts.",
    },
    {
      question: "Who owns the code?",
      answer:
        "Ownership and licensing are agreed in writing before work begins.",
    },
    {
      question: "What happens after launch?",
      answer:
        "Handover and any ongoing support responsibilities are agreed in the proposal.",
    },
    {
      question: "Can we start small?",
      answer:
        "A focused architecture review or first workflow is often a useful starting point.",
    },
  ],
});

export const serviceDetails = {
  whyTitle: "Why work with me",
  reasons: [
    { title: "Decisions with reasons", text: "I explain what each option buys, what it costs, and what would make me revisit the decision." },
    { title: "Small releases with AI", text: "I give agents defined tasks so you can review a working slice early." },
    { title: "Tested and reviewed", text: "I review changes and test realistic failure cases before release." },
    { title: "Offline-first experience", text: "I design for lost connections, retries, and reconciliation when work must keep moving." },
  ],
};

export const serviceHero = ["Your business", "Your system", "Your dashboard"] as const;
