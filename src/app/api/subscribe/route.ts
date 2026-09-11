import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LEADS_DATA_SOURCE_ID = "e08f7822-e96f-4102-95c2-835a6986572c";
const NOTION_VERSION = "2025-09-03";

async function notion(method: string, url: string, body: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * Email-updates opt-in from the tinyHouse thanks page. Ticks "Email updates"
 * on the visitor's existing lead (matched by email), or creates a Newsletter
 * lead if none exists.
 */
export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    /* fall through to validation */
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, errors: ["A valid email is required."] }, { status: 422 });
  }

  if (!process.env.NOTION_TOKEN) return NextResponse.json({ ok: true, notion: { skipped: "NOTION_TOKEN not set" } });

  try {
    const q = (await notion("POST", `https://api.notion.com/v1/data_sources/${LEADS_DATA_SOURCE_ID}/query`, {
      filter: { property: "Email", email: { equals: email } },
      page_size: 1,
    })) as { results: { id: string }[] };

    if (q.results.length) {
      await notion("PATCH", `https://api.notion.com/v1/pages/${q.results[0].id}`, {
        properties: { "Email updates": { checkbox: true } },
      });
      return NextResponse.json({ ok: true, notion: { updated: q.results[0].id } });
    }

    const created = (await notion("POST", "https://api.notion.com/v1/pages", {
      parent: { type: "data_source_id", data_source_id: LEADS_DATA_SOURCE_ID },
      properties: {
        Name: { title: [{ text: { content: email } }] },
        Email: { email },
        Form: { select: { name: "Newsletter" } },
        Source: { select: { name: "Website form" } },
        Stage: { status: { name: "Not started" } },
        Package: { select: { name: "tinyHouse" } },
        Tier: { select: { name: "Tier 3 - Kam" } },
        "Email updates": { checkbox: true },
      },
    })) as { id: string };
    return NextResponse.json({ ok: true, notion: { created: created.id } });
  } catch (e) {
    console.error("[subscribe] Notion write failed:", e);
    // Don't surface CRM problems to the visitor.
    return NextResponse.json({ ok: true, notion: { error: String(e) } });
  }
}
