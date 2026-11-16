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
  heroCutout: {
    src: "/images/alif-cutout.png",
    width: 818,
    height: 1140,
    alt: "Abdullah Alif in a cream patterned shirt, hands in pockets",
  },
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
