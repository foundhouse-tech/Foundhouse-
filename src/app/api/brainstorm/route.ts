import { NextResponse } from "next/server";
import { brainstormPrompts, offerings, validateBrainstorm, type BrainstormPayload } from "@/lib/form";

export const runtime = "nodejs";

const LEADS_DATA_SOURCE_ID = "e08f7822-e96f-4102-95c2-835a6986572c";
const NOTION_VERSION = "2025-09-03";

async function notion(method: string, url: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

type LeadPage = { id: string; parent?: { data_source_id?: string }; properties?: { Email?: { email?: string | null } } };

const sameEmail = (a?: string | null, b?: string) => !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();

/**
 * The lead id arrives in the URL, so only trust it if the page really is a
 * row in the Leads database with the same email. Otherwise fall back to the
 * newest lead with that email.
 */
async function findLead({ lead, email }: BrainstormPayload): Promise<string | null> {
  if (lead) {
    try {
      const page = (await notion("GET", `https://api.notion.com/v1/pages/${lead}`)) as LeadPage;
      if (page.parent?.data_source_id?.replace(/-/g, "") === LEADS_DATA_SOURCE_ID.replace(/-/g, "") && sameEmail(page.properties?.Email?.email, email)) {
        return page.id;
      }
    } catch (e) {
      console.warn("[brainstorm] lead lookup by id failed, falling back to email:", e);
    }
  }
  const q = (await notion("POST", `https://api.notion.com/v1/data_sources/${LEADS_DATA_SOURCE_ID}/query`, {
    filter: { property: "Email", email: { equals: email } },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
    page_size: 1,
  })) as { results: { id: string }[] };
  return q.results[0]?.id ?? null;
}

const text = (content: string) => [{ type: "text", text: { content } }];
const h2 = (s: string) => ({ object: "block", type: "heading_2", heading_2: { rich_text: text(s) } });
const h3 = (s: string) => ({ object: "block", type: "heading_3", heading_3: { rich_text: text(s) } });
const p = (s: string) => ({ object: "block", type: "paragraph", paragraph: { rich_text: text(s) } });
const li = (s: string) => ({ object: "block", type: "bulleted_list_item", bulleted_list_item: { rich_text: text(s) } });

function brainstormBlocks(b: BrainstormPayload) {
  const date = new Date().toISOString().slice(0, 10);
  const blocks: object[] = [{ object: "block", type: "divider", divider: {} }, h2(`Brainstorm (${date})`)];

  const grouped = offerings
    .map((o) => ({ group: o.group, items: o.items.filter((i) => b.offerings.includes(i)) }))
    .filter((g) => g.items.length);
  if (grouped.length) {
    blocks.push(h3("Offerings of interest"), ...grouped.map((g) => li(`${g.group}: ${g.items.join(", ")}`)));
  }
  if (b.timeline) blocks.push(h3("Timeline"), p(b.timeline));
  for (const { key, label } of brainstormPrompts) {
    const v = b.answers[key];
    if (v) blocks.push(h3(label), p(v));
  }
  return blocks;
}

/**
 * Brainstorm step after booking. Appends the visitor's picks and notes to the
 * body of their existing lead page in Notion (creates a lead if none exists).
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request."] }, { status: 400 });
  }

  const v = validateBrainstorm(body);
  if (!v.ok) return NextResponse.json({ ok: false, errors: v.errors }, { status: 422 });

  if (!process.env.NOTION_TOKEN) return NextResponse.json({ ok: true, notion: { skipped: "NOTION_TOKEN not set" } });

  try {
    let pageId = await findLead(v.data);
    if (!pageId) {
      const created = (await notion("POST", "https://api.notion.com/v1/pages", {
        parent: { type: "data_source_id", data_source_id: LEADS_DATA_SOURCE_ID },
        properties: {
          Name: { title: text(v.data.email) },
          Email: { email: v.data.email },
          Form: { select: { name: "Brainstorm" } },
          Source: { select: { name: "Website form" } },
          Stage: { status: { name: "Not started" } },
        },
      })) as { id: string };
      pageId = created.id;
    }
    await notion("PATCH", `https://api.notion.com/v1/blocks/${pageId}/children`, { children: brainstormBlocks(v.data) });
    return NextResponse.json({ ok: true, notion: { updated: pageId } });
  } catch (e) {
    console.error("[brainstorm] Notion write failed:", e);
    return NextResponse.json({ ok: false, errors: ["We couldn't save that just now. Please try again in a moment."] }, { status: 502 });
  }
}
