import { NextResponse } from "next/server";
import { packages, tierFor, validateLead, type LeadPayload } from "@/lib/form";

export const runtime = "nodejs";

const LEADS_DATA_SOURCE_ID = "e08f7822-e96f-4102-95c2-835a6986572c";
const NOTION_VERSION = "2025-09-03";

const PERSON: Record<1 | 2 | 3, string> = { 1: "Greg", 2: "Grace", 3: "Kam" };
const TIER_NAME: Record<1 | 2 | 3, string> = { 1: "Tier 1 - Greg", 2: "Tier 2 - Grace", 3: "Tier 3 - Kam" };

function bookingUrlFor(tier: 1 | 2 | 3): string | null {
  const url = { 1: process.env.BOOKING_URL_TIER1, 2: process.env.BOOKING_URL_TIER2, 3: process.env.BOOKING_URL_TIER3 }[tier];
  return url && /^https?:\/\//.test(url) ? url : null;
}

const rt = (s?: string) => ({ rich_text: s ? [{ text: { content: s.slice(0, 2000) } }] : [] });
const ms = (v: string[]) => ({ multi_select: v.map((name) => ({ name })) });

async function createNotionLead(lead: LeadPayload, tier: 1 | 2 | 3) {
  const token = process.env.NOTION_TOKEN;
  if (!token) return { skipped: "NOTION_TOKEN not set" as const };
  const pkg = packages.find((p) => p.id === lead.package)!;

  const properties = {
    Name: { title: [{ text: { content: lead.name } }] },
    Email: { email: lead.email },
    Company: rt(lead.company),
    Form: { select: { name: "Quote request" } },
    Source: { select: { name: "Website form" } },
    Stage: { status: { name: "Not started" } },
    Tier: { select: { name: TIER_NAME[tier] } },
    "Booked with": { select: { name: PERSON[tier] } },
    Package: { select: { name: pkg.id } },
    "Est. value": { number: pkg.value },
    Services: ms(lead.services),
    "Project intention": ms(lead.intentions),
    "Funding situation": ms(lead.funding),
    "Social media links": rt(lead.socialLinks),
    "Project description": rt(lead.projectDescription),
    "About you": rt(lead.about),
    Message: rt(lead.projectDescription),
    "Source page": { url: lead.sourcePage ?? null },
    "Tier answers": rt(JSON.stringify({ package: lead.package, services: lead.services, intentions: lead.intentions, funding: lead.funding })),
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parent: { type: "data_source_id", data_source_id: LEADS_DATA_SOURCE_ID }, properties }),
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { id: string; url?: string };
  return { id: json.id, url: json.url };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  const v = validateLead(body);
  if (!v.ok) return NextResponse.json({ ok: false, errors: v.errors }, { status: 422 });

  const tier = tierFor(v.data.package);
  let notion: Awaited<ReturnType<typeof createNotionLead>> | { error: string } = { error: "" };
  try {
    notion = await createNotionLead(v.data, tier);
  } catch (e) {
    // Never block the visitor on a CRM hiccup; log it and still send them to book.
    console.error("[lead] Notion write failed:", e);
    notion = { error: String(e) };
  }

  const booking = bookingUrlFor(tier);
  const redirect = booking
    ? `${booking}${booking.includes("?") ? "&" : "?"}email=${encodeURIComponent(v.data.email)}`
    : `/start/thanks?tier=${tier}`;

  return NextResponse.json({ ok: true, tier, person: PERSON[tier], redirect, notion });
}
