import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrainstormFlow from "@/components/BrainstormFlow";
import { bookingUrlFor, embedUrlFor } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book Your Call | Foundhouse",
  description: "Pick a time with the Foundhouse team, then brainstorm your idea before the call.",
  robots: { index: false },
};

const PERSON: Record<1 | 2, string> = { 1: "Greg", 2: "Grace" };

/**
 * Where tier 1 and 2 leads land after the qualification form: the booking
 * calendar embedded on-site, then a brainstorm form that writes onto the same
 * Notion lead. Tier 3 or a missing booking URL goes to /start/thanks.
 */
export default async function BrainstormPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; email?: string; lead?: string }>;
}) {
  const { tier: t, email = "", lead } = await searchParams;
  const tier = t === "1" ? 1 : t === "2" ? 2 : null;
  const bookingUrl = tier ? bookingUrlFor(tier) : null;
  if (!tier || !bookingUrl) redirect(`/start/thanks?${new URLSearchParams({ tier: t ?? "", email })}`);

  const person = PERSON[tier];
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pt-36 pb-24 sm:pt-40">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]" />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 lg:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                You&apos;re matched with {person}
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Book your call, then let&apos;s brainstorm.
              </h1>
              <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
                Pick a time on {person}&apos;s calendar. Then tell us more about your idea and choose the offerings you want to explore.
              </p>
            </div>
            <div className="w-full rounded-[2rem] border border-border-strong bg-background-elevated px-4 py-8 sm:px-12 sm:py-14">
              <BrainstormFlow person={person} bookingUrl={bookingUrl} embedUrl={embedUrlFor(bookingUrl)} email={email} lead={lead} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
