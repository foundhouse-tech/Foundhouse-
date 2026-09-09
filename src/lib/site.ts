/**
 * Single source of truth for site content and the one link that changes
 * as the funnel evolves: START_URL. Today it points at the qualification
 * form entry point (/start). Phase 2 replaces the placeholder page with
 * the real form; nothing else on the site needs to change.
 */
export const START_URL = "/start";

export const site = {
  name: "Foundhouse",
  email: "teamfoundhouse@gmail.com",
  social: {
    x: "https://x.com/foundhouseteam",
    instagram: "https://instagram.com/teamfoundhouse",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export const services = [
  {
    icon: "ai",
    title: "AI Solutions",
    body: "Custom AI products, LLM integrations, and intelligent automation that give your business a genuine edge.",
  },
  {
    icon: "code",
    title: "Custom Software",
    body: "Bespoke software engineered around how your business actually operates — not the other way around.",
  },
  {
    icon: "globe",
    title: "Web Applications",
    body: "Fast, scalable, beautifully engineered web apps built on modern frameworks and best practices.",
  },
  {
    icon: "mobile",
    title: "Mobile Applications",
    body: "Native-feel mobile experiences for iOS and Android from a single, maintainable codebase.",
  },
] as const;

export const team = [
  {
    name: "Kameron Seabrook",
    role: "Founder",
    bio: "Founder of Obai and a serial entrepreneur, Kameron leads product vision and business strategy, turning early ideas into funded, fielded companies.",
    image: "/images/founder-kameron.png",
    linkedin: "https://www.linkedin.com/in/kameron-seabrook/",
  },
  {
    name: "Adeyemi Taiwo",
    role: "Lead Engineer",
    bio: "A full-stack engineer building production web and mobile systems, leading engineering across every Foundhouse build.",
    image: "/images/founder-adeyemi.png",
    linkedin: "https://www.linkedin.com/in/adeyemi-taiwo-5892082b0/",
  },
];

export const stats = [
  { value: "3", label: "Products Shipped" },
  { value: "100%", label: "Senior Engineers" },
];

export const reasons = [
  {
    icon: "bolt",
    title: "Fast Delivery",
    body: "Structured sprints and clear milestones mean your product ships on time.",
  },
  {
    icon: "layers",
    title: "Modern Technology",
    body: "Battle-tested, current tools — no legacy stacks or outdated patterns.",
  },
  {
    icon: "trend",
    title: "Scalable Solutions",
    body: "We build for where you're going, not just where you are today.",
  },
  {
    icon: "handshake",
    title: "Long-Term Partnership",
    body: "We stay involved after launch — as a partner, not a vendor.",
  },
] as const;

export const projects = [
  {
    tag: "Estate Transition Platform",
    name: "Kept House",
    body: "A digital platform that guides families through the estate transition process with clarity, structure, and care.",
    image: "/images/project-kept-house.png",
    href: "https://www.keptestate.com/",
  },
  {
    tag: "Farm Workforce & Operations Management System",
    badge: "Internal tool",
    name: "AFMS",
    body: "An internal platform that tracks worker attendance and output, automates earnings, and gives managers real-time visibility across every farm.",
    image: "/images/project-afms.png",
    href: null,
  },
  {
    tag: "AI Vehicle Valuation & Claims Platform",
    name: "Obai",
    body: "An AI toolbox for car owners, fleet operators, and appraisers to value vehicles, label photos, and close claims in minutes.",
    image: "/images/project-obai.png",
    href: "https://obai.app/",
  },
];
