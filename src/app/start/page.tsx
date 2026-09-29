import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QualificationForm from "@/components/QualificationForm";
import { FaqAccordion, FaqJsonLd } from "@/components/Faq";
import { allFaqs } from "@/lib/faq";

const startFaqs = allFaqs.filter((f) => f.start);

export const metadata: Metadata = {
  title: "Book a Consultation | Foundhouse",
  description: "Tell us about your project and we'll match you with the right person on the Foundhouse team.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
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
                Book a Free Consultation
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Tell us what you&apos;re building.
              </h1>
              <p className="max-w-xl text-balance text-lg text-foreground-muted sm:text-xl">
                A few questions match you with the right person on our team, then you pick a time on their calendar.
              </p>
            </div>
            <div className="w-full rounded-[2rem] border border-border-strong bg-background-elevated px-6 py-10 sm:px-12 sm:py-14">
              <QualificationForm />
            </div>
            <div className="mt-8 flex w-full max-w-3xl flex-col gap-6">
              <h2 className="text-center text-xs font-medium uppercase tracking-[0.15em] text-gold-bright">Questions about the packages</h2>
              <FaqAccordion items={startFaqs} firstOpen={false} />
            </div>
          </div>
        </section>
        <FaqJsonLd items={startFaqs} />
      </main>
      <Footer />
    </>
  );
}
