import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight, iconMap } from "@/components/Icons";
import { START_URL, projects, reasons, services, stats, team } from "@/lib/site";

const container = "mx-auto max-w-[1050px] px-6";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="glow absolute inset-0" aria-hidden />
          <div className={`${container} relative w-full text-center`}>
            <Reveal>
              <Eyebrow>Software &amp; AI Studio for Founders</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mx-auto mt-7 max-w-4xl text-[52px] font-semibold leading-[1.02] sm:text-[72px] md:text-[84px]">
                Building Digital
                <br />
                <span className="text-gold">Foundations.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-xl text-lg text-muted">
                We help founders turn ideas into world-class digital products.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={START_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[14px] font-semibold text-[#1a1408] transition-colors hover:bg-gold-bright"
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-7 py-3.5 text-[14px] font-semibold text-foreground transition-colors hover:bg-surface-hover"
                >
                  View Our Work <ArrowUpRight />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-9 text-[13px] text-faint">Trusted by startups and growing businesses.</p>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 py-24">
          <div className={container}>
            <Reveal className="text-center">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
                End-to-end product engineering, under one roof.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">
                From first concept to production launch, we bring the full range of skills founders need to ship something exceptional.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => {
                const Icon = iconMap[s.icon];
                return (
                  <Reveal key={s.title} delay={i * 80} className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-gold-050 text-gold">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="font-display mt-7 text-[17px] font-semibold">{s.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-24">
          <div className={container}>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <Reveal>
                <Eyebrow>About Foundhouse</Eyebrow>
                <h2 className="font-display mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl">
                  We help founders turn ideas into successful digital products.
                </h2>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
                  Foundhouse is a software and AI studio built for startups and growing businesses. We pair senior engineering with thoughtful design to build products on a foundation that lasts.
                </p>
              </Reveal>
              <Reveal delay={120} className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-7 text-center">
                    <div className="font-display text-5xl font-semibold text-gold">{s.value}</div>
                    <div className="mt-2 text-[13px] text-muted">{s.label}</div>
                  </div>
                ))}
              </Reveal>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 100} className="flex gap-6 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-6">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border-strong">
                    <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover" />
                  </span>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold">{m.name}</h3>
                    <p className="mt-0.5 text-[13px] text-gold">{m.role}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{m.bio}</p>
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-[12px] text-faint transition-colors hover:text-foreground">
                      LinkedIn <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Foundhouse */}
        <section className="py-24">
          <div className={container}>
            <Reveal className="text-center">
              <Eyebrow>Why Foundhouse</Eyebrow>
              <h2 className="font-display mx-auto mt-6 max-w-xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
                A studio built on trust and craft.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">
                We treat every engagement like it&apos;s our own product — because your success is how we measure ours.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-14 grid overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r) => {
                const Icon = iconMap[r.icon];
                return (
                  <div key={r.title} className="border-border-subtle p-7 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-t-0 lg:[&:not(:first-child)]:border-l">
                    <Icon className="h-5 w-5 text-gold" />
                    <h3 className="font-display mt-6 text-[16px] font-semibold">{r.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{r.body}</p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* Featured work */}
        <section id="projects" className="scroll-mt-24 py-24">
          <div className={container}>
            <Reveal className="text-center">
              <Eyebrow>Featured work</Eyebrow>
              <h2 className="font-display mx-auto mt-6 max-w-xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
                Products we&apos;ve helped bring to life.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] text-muted">
                A look at the platforms our team has designed, engineered, and shipped for founders and growing businesses.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {projects.map((p, i) => {
                const card = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border-subtle bg-elevated">
                      <Image src={p.image} alt={`${p.name} product screenshot`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-gold">
                        <span>{p.tag}</span>
                        {"badge" in p && p.badge && (
                          <span className="rounded-full border border-border-subtle px-2 py-0.5 text-faint">{p.badge}</span>
                        )}
                      </div>
                      <h3 className="font-display mt-3 text-[22px] font-semibold">{p.name}</h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </>
                );
                const cls = "group block overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface transition-colors hover:border-border-strong";
                return (
                  <Reveal key={p.name} delay={i * 100}>
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noreferrer" className={cls}>{card}</a>
                    ) : (
                      <div className={cls}>{card}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16">
          <div className={container}>
            <Reveal className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border-subtle bg-surface px-6 py-24 text-center">
              <div className="grid-bg absolute inset-0" aria-hidden />
              <div className="glow absolute inset-0" aria-hidden />
              <div className="relative">
                <h2 className="font-display mx-auto max-w-lg text-4xl font-semibold leading-[1.08] sm:text-5xl">
                  Ready to build your next product?
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[17px] text-muted">
                  Tell us about your idea and we&apos;ll match you with the right person on our team.
                </p>
                <Link
                  href={START_URL}
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[14px] font-semibold text-[#1a1408] transition-colors hover:bg-gold-bright"
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
