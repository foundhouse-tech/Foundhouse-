import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Thanks | Foundhouse",
  description: "We received your project details.",
};

const PERSON: Record<string, string> = { "1": "Greg", "2": "Grace", "3": "Kam" };

/** Fallback landing when a tier has no booking URL configured yet. */
export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ tier?: string }> }) {
  const { tier } = await searchParams;
  const who = PERSON[tier ?? ""] ?? "our team";
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]" />
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
