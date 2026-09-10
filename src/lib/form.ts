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
    tagline: "Everything, under one roof.",
    includes: ["All services", "End to end product development", "Go to market and social strategy", "Automation and analytics"],
    value: 10000,
  },
  {
    id: "halfHouse",
    tier: 2,
    name: "halfHouse",
    price: "$5,000/mo",
    tagline: "A native platform, built end to end.",
    includes: ["End to end platform development", "Replaces current maintenance fees and subscriptions with a native platform"],
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

export const services = [
  "End to end product development",
  "Maintenance",
  "Go to market strategy",
  "Social media launch strategy",
  "Social media automation",
  "Analytics capturing and analysis",
] as const;

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
  const svc = arr("services", services);
  if (svc.length === 0) errors.push("Pick at least one service.");
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
      services: svc,
      intentions: intent,
      funding: arr("funding", fundingOptions),
      socialLinks: str("socialLinks") || undefined,
      projectDescription: projectDescription.slice(0, 2000),
      about: str("about").slice(0, 2000) || undefined,
      sourcePage: str("sourcePage") || undefined,
    },
  };
}
