import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailUpdates from "@/components/EmailUpdates";

export const metadata: Metadata = {
  title: "Thanks | Foundhouse",
  description: "We received your project details.",
  robots: { index: false },
};

const PERSON: Record<string, string> = { "1": "Greg", "2": "Grace", "3": "Kam" };

const Bg = () => (
  <>
    <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]" />
  </>
);

/**
 * Tier 3 (tinyHouse) lands here: no booking page, just the webinar notice and
 * an email-updates opt-in. Other tiers only reach this page if their booking
 * URL is missing.
 */
export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ tier?: string; email?: string }> }) {
  const { tier, email } = await searchParams;

  if (tier === "3") {
    return (
      <>
        <Header />
        <main>
          <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
            <Bg />
            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center lg:px-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                tinyHouse
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                We&apos;ll be posting webinars soon!
              </h1>
              <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
                Free webinars and in person classes are on the way. Leave your email and you&apos;ll be the first to know when the schedule is up.
              </p>
              <EmailUpdates initialEmail={email ?? ""} />
              <Link href="/" className="text-sm text-foreground-faint hover:text-gold-bright">
                Back to home
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const who = PERSON[tier ?? ""] ?? "our team";
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
          <Bg />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center lg:px-10">
            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Got it. {who} will reach out to set up a time.
            </h1>
            <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
              Your project details are with the team. Expect an email within one business day.
            </p>
            <Link href="/" className="text-sm text-foreground-faint hover:text-gold-bright">
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
