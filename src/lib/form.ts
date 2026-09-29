/**
 * Qualification form definition. Packages double as tiers; the tier decides
 * whose booking page the visitor is sent to after submitting.
 * Shared by the form UI (client) and the /api/lead route (server).
 */

export type PackageId = "fullHouse" | "halfHouse" | "tinyHouse";

export const packages: {
  id: PackageId;
  tier: 1 | 2 | 3;
  name: string;
  price: string;
  tagline: string;
  includes: string[];
  value: number;
}[] = [
  {
    id: "fullHouse",
    tier: 1,
    name: "fullHouse",
    price: "$10,000/mo",
    tagline: "All services, under one roof.",
    includes: [
      "End to end product development",
      "Maintenance",
      "Go to market strategy",
      "Social media launch strategy",
      "Social media automation",
      "Analytics capturing and analysis",
    ],
    value: 10000,
  },
  {
    id: "halfHouse",
    tier: 2,
    name: "halfHouse",
    price: "$5,000/mo",
    tagline: "A native platform that replaces your maintenance fees and subscriptions.",
    includes: ["End to end product development", "Maintenance"],
    value: 5000,
  },
  {
    id: "tinyHouse",
    tier: 3,
    name: "tinyHouse",
    price: "Free",
    tagline: "Learn with us before you build.",
    includes: ["Free webinars", "In person classes"],
    value: 0,
  },
];

/** Services are implied by the package; the tinyHouse package carries none. */
export function servicesFor(pkg: PackageId): string[] {
  return pkg === "tinyHouse" ? [] : packages.find((p) => p.id === pkg)?.includes ?? [];
}

export const intentions = [
  "Grow revenue of my business",
  "Start my business",
  "Continue and sustain an existing initiative",
] as const;

export const fundingOptions = [
  "Currently fundraising",
  "Large social media presence or network",
  "Just starting my business",
] as const;

export type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  package: PackageId;
  services: string[];
  intentions: string[];
  funding: string[];
  socialLinks?: string;
  projectDescription: string;
  about?: string;
  sourcePage?: string;
};

export function tierFor(pkg: PackageId): 1 | 2 | 3 {
  return packages.find((p) => p.id === pkg)?.tier ?? 3;
}

/** Simple server-side validation; returns a list of problems (empty = ok). */
export function validateLead(input: unknown): { ok: true; data: LeadPayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const b = (input ?? {}) as Record<string, unknown>;
  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const arr = (k: string, allowed: readonly string[]) =>
    Array.isArray(b[k]) ? (b[k] as unknown[]).filter((v): v is string => typeof v === "string" && allowed.includes(v)) : [];

  const name = str("name");
  const email = str("email");
  const pkg = str("package") as PackageId;
  const projectDescription = str("projectDescription");

  if (!name) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (!packages.some((p) => p.id === pkg)) errors.push("Choose a package.");
  const intent = arr("intentions", intentions);
  if (intent.length === 0) errors.push("Tell us what the project is for.");
  if (!projectDescription) errors.push("Describe the project.");

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name,
      email,
      company: str("company") || undefined,
      package: pkg,
      services: servicesFor(pkg),
      intentions: intent,
      funding: arr("funding", fundingOptions),
      socialLinks: str("socialLinks") || undefined,
      projectDescription: projectDescription.slice(0, 2000),
      about: str("about").slice(0, 2000) || undefined,
      sourcePage: str("sourcePage") || undefined,
    },
  };
}

/**
 * Post-booking brainstorm: specific offerings grouped by the services on the
 * home page. Item names must be unique across groups (they are stored flat).
 */
export const offerings = [
  { group: "Consultation", items: ["Idea validation", "MVP scoping and roadmap", "Technical architecture review", "Fundraising and pitch readiness"] },
  {
    group: "Mobile and Web App Development",
    items: ["iOS app", "Android app", "Web app", "Admin dashboard or internal tool", "AI features", "Integrations and APIs", "Ongoing maintenance"],
  },
  { group: "Go to Market Strategy", items: ["Positioning and messaging", "Pricing strategy", "Launch plan", "Sales playbook"] },
  { group: "Social Media Automation", items: ["Social launch strategy", "Content pipeline", "Scheduling and posting automation"] },
  { group: "Analytics Capturing and Analysis", items: ["Event tracking setup", "Dashboards and reporting", "User behavior analysis"] },
] as const;

export const timelines = ["Under 1 month", "1 to 3 months", "3 to 6 months", "Flexible"] as const;

/** Free-text brainstorm prompts, in display order. */
export const brainstormPrompts = [
  { key: "problem", label: "The problem", hint: "What pain are you solving, and for whom?" },
  { key: "users", label: "Who it's for", hint: "Describe your first users or customers." },
  { key: "features", label: "Must-have features", hint: "What does version one absolutely need to do?" },
  { key: "inspiration", label: "Inspiration", hint: "Apps, sites, or brands you'd like this to feel like. Links welcome." },
  { key: "notes", label: "Anything else", hint: "Ideas, constraints, questions for the call." },
] as const;

export type BrainstormKey = (typeof brainstormPrompts)[number]["key"];

export type BrainstormPayload = {
  email: string;
  lead?: string;
  offerings: string[];
  timeline?: string;
  answers: Partial<Record<BrainstormKey, string>>;
};

export function validateBrainstorm(input: unknown): { ok: true; data: BrainstormPayload } | { ok: false; errors: string[] } {
  const b = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const allowed: readonly string[] = offerings.flatMap((o) => o.items);

  const email = str(b.email, 320);
  const lead = str(b.lead, 64);
  const picked = Array.isArray(b.offerings) ? b.offerings.filter((v): v is string => typeof v === "string" && allowed.includes(v)) : [];
  const timeline = (timelines as readonly string[]).includes(str(b.timeline)) ? str(b.timeline) : undefined;
  const rawAnswers = (b.answers ?? {}) as Record<string, unknown>;
  const answers: BrainstormPayload["answers"] = {};
  for (const { key } of brainstormPrompts) {
    const v = str(rawAnswers[key]);
    if (v) answers[key] = v;
  }

  const errors: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("We lost track of your email. Please start again from the consultation form.");
  if (!picked.length && !Object.keys(answers).length) errors.push("Pick at least one offering or share a few thoughts.");
  if (lead && !/^[0-9a-f-]{32,36}$/i.test(lead)) errors.push("Invalid lead reference.");
  if (errors.length) return { ok: false, errors };

  return { ok: true, data: { email, lead: lead || undefined, offerings: [...new Set(picked)], timeline, answers } };
}
