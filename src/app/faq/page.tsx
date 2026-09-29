import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaqAccordion, FaqJsonLd } from "@/components/Faq";
import { Reveal, Tap } from "@/components/motion";
import { allFaqs, faq } from "@/lib/faq";
import { START_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ: Pricing, Process & App Development for Founders | Foundhouse",
  description:
    "How much it costs to build with Foundhouse, what fullHouse and halfHouse include, how long an MVP takes, and how to get started.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ: Pricing, Process & App Development for Founders | Foundhouse",
    description: "Straight answers on pricing, process, and what we build.",
    url: "/faq",
    type: "website",
  },
};

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pt-36 pb-24 sm:pt-40">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]" />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 lg:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                FAQ
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Questions founders ask before they build.
              </h1>
              <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
                Straight answers on pricing, process, and what we build.
              </p>
              <nav aria-label="FAQ topics" className="mt-2 flex flex-wrap justify-center gap-2">
                {faq.map((g) => (
                  <a
                    key={g.group}
                    href={`#${slug(g.group)}`}
                    className="rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:border-gold-400 hover:text-foreground"
                  >
                    {g.group}
                  </a>
                ))}
              </nav>
            </div>

            {faq.map((g, gi) => (
              <div key={g.group} id={slug(g.group)} className="flex scroll-mt-28 flex-col gap-6">
                <Reveal>
                  <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gold-bright">{g.group}</h2>
                </Reveal>
                <FaqAccordion items={g.items} firstOpen={gi === 0} />
              </div>
            ))}
          </div>
        </section>

        {/* CTA, same treatment as the home page */}
        <section className="relative px-6 pb-20 sm:pb-28">
          <Reveal className="mx-auto w-full max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-background-elevated px-8 py-16 text-center sm:px-16 sm:py-24">
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-gold/25 blur-[140px]" />
              <div className="relative flex flex-col items-center gap-6">
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Still have a question?
                </h2>
                <p className="max-w-lg text-lg text-foreground-muted">
                  Tell us what you&apos;re building. The first consultation is free.
                </p>
                <Tap>
                  <Link
                    className="group mt-2 inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-8 text-base font-medium text-background transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)] active:scale-[0.98]"
                    href={START_URL}
                  >
                    Book a Free Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Tap>
              </div>
            </div>
          </Reveal>
        </section>
        <FaqJsonLd items={allFaqs} />
      </main>
      <Footer />
    </>
  );
}
