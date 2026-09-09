import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import { ArrowRight } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start your project — Foundhouse",
  description: "Tell us about your project and we'll match you with the right person on the Foundhouse team.",
};

/**
 * Phase 1 placeholder for the qualification form (Phase 2).
 * Every CTA on the site already points here, so swapping in the real form
 * is a change to this file only.
 */
export default function StartPage() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[720px] px-6 text-center">
          <Eyebrow>Start your project</Eyebrow>
          <h1 className="font-display mt-7 text-4xl font-semibold leading-[1.06] sm:text-6xl">
            Tell us what you&apos;re building.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[17px] text-muted">
            A short set of questions helps us match you with the right person on our team and get a call on the calendar.
          </p>

          {/* Form mounts here in Phase 2 */}
          <div id="qualification-form" className="mx-auto mt-10 rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface/60 p-10 text-[14px] text-faint">
            The project questionnaire is coming online shortly. In the meantime, email us and we&apos;ll get right back to you.
          </div>

          <a
            href={`mailto:${site.email}?subject=New%20project%20inquiry`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[14px] font-semibold text-[#1a1408] transition-colors hover:bg-gold-bright"
          >
            Email {site.email} <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-8 text-[13px] text-faint">
            <Link href="/" className="transition-colors hover:text-foreground">← Back to home</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
