import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book a Consultation | Foundhouse",
  description: "Tell us about your project and we'll match you with the right person on the Foundhouse team.",
};

/**
 * Entry point for the qualification form (Phase 2). "Start Your Project" and
 * "Book a Free Consultation" on the home page both land here; swapping in the
 * real form is a change to this file only.
 */
export default function StartPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]" />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center lg:px-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Book a Free Consultation
            </div>
            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Tell us what you&apos;re building.
            </h1>
            <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
              A few quick questions help us match you with the right person on our team and get a call on the calendar.
            </p>

            {/* The qualification form mounts here in Phase 2 */}
            <div id="qualification-form" className="w-full rounded-2xl border border-dashed border-border-strong bg-surface/60 p-10 text-sm text-foreground-faint">
              The project questionnaire is coming online shortly. In the meantime, email us and we&apos;ll get right back to you.
            </div>

            <a
              className="group inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-medium transition-all duration-300 active:scale-[0.98] bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)]"
              href="mailto:teamfoundhouse@gmail.com?subject=New%20project%20inquiry"
            >
              Email teamfoundhouse@gmail.com
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/" className="text-sm text-foreground-faint hover:text-gold-bright">
              ← Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
