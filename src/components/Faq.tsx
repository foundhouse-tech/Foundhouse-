import Link from "next/link";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion";
import { faqJsonLd, type FaqItem } from "@/lib/faq";

const linkClass = "text-gold-bright underline decoration-gold-400 underline-offset-2 transition-colors hover:text-foreground";

/** Links the first occurrence of each `links[].text` inside the answer. */
function Answer({ a, links = [] }: FaqItem) {
  const hits = links
    .map((l) => ({ ...l, at: a.indexOf(l.text) }))
    .filter((l) => l.at >= 0)
    .sort((x, y) => x.at - y.at);
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const l of hits) {
    if (l.at < cursor) continue;
    parts.push(a.slice(cursor, l.at));
    parts.push(
      l.href.startsWith("http") ? (
        <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {l.text}
        </a>
      ) : (
        <Link key={l.text} href={l.href} className={linkClass}>
          {l.text}
        </Link>
      ),
    );
    cursor = l.at + l.text.length;
  }
  parts.push(a.slice(cursor));
  return <p className="px-6 pb-6 text-sm leading-relaxed text-foreground-muted sm:pr-20 sm:text-base">{parts}</p>;
}

/**
 * Native <details> so every answer is in the server-rendered HTML even when
 * collapsed (crawlers see it); several can be open at once. Cards match the
 * service cards on the home page.
 */
export function FaqAccordion({ items, firstOpen = true }: { items: FaqItem[]; firstOpen?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={Math.min(i, 5) * 0.05}>
          <details
            open={firstOpen && i === 0}
            className="group rounded-xl border border-border-subtle bg-surface/60 transition-colors hover:border-gold-400 open:border-border-strong open:bg-surface"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-6 py-5 outline-none focus-visible:ring-2 focus-visible:ring-gold-400 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">{item.q}</h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-background-elevated text-gold-bright">
                <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </summary>
            <Answer {...item} />
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/** One FAQPage block per page. `<` is escaped so answer text can't close the script tag. */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)).replace(/</g, "\\u003c") }}
    />
  );
}
