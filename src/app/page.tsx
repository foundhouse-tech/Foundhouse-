import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CodeXml,
  Globe,
  Handshake,
  Layers,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroGlow, HeroItem, Reveal, Tap } from "@/components/motion";
import { START_URL } from "@/lib/site";

const btnPrimary =
  "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-medium transition-all duration-300 active:scale-[0.98] bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)]";
const btnSecondary =
  "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-medium transition-all duration-300 active:scale-[0.98] border border-border-strong bg-surface text-foreground hover:bg-surface-hover hover:border-gold-400";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </div>
  );
}

const services = [
  { Icon: BrainCircuit, title: "AI Solutions", body: "Custom AI products, LLM integrations, and intelligent automation that give your business a genuine edge." },
  { Icon: CodeXml, title: "Custom Software", body: "Bespoke software engineered around how your business actually operates — not the other way around." },
  { Icon: Globe, title: "Web Applications", body: "Fast, scalable, beautifully engineered web apps built on modern frameworks and best practices." },
  { Icon: Smartphone, title: "Mobile Applications", body: "Native-feel mobile experiences for iOS and Android from a single, maintainable codebase." },
];

const team = [
  {
    name: "Kameron Seabrook",
    role: "Founder",
    bio: "Founder of Obai and a serial entrepreneur, Kameron leads product vision and business strategy, turning early ideas into funded, fielded companies.",
    image: "/images/founder-kameron.png",
    linkedin: "https://www.linkedin.com/in/kameron-seabrook/",
  },
  {
    name: "Adeyemi Taiwo",
    role: "Lead Engineer",
    bio: "A full-stack engineer building production web and mobile systems, leading engineering across every Foundhouse build.",
    image: "/images/founder-adeyemi.jpeg",
    linkedin: "https://www.linkedin.com/in/adeyemi-taiwo-5892082b0/",
  },
];

const reasons = [
  { Icon: Zap, title: "Fast Delivery", body: "Structured sprints and clear milestones mean your product ships on time." },
  { Icon: Sparkles, title: "Modern Technology", body: "Battle-tested, current tools — no legacy stacks or outdated patterns." },
  { Icon: Layers, title: "Scalable Solutions", body: "We build for where you're going, not just where you are today." },
  { Icon: Handshake, title: "Long-Term Partnership", body: "We stay involved after launch — as a partner, not a vendor." },
];

const projects = [
  {
    tag: "Estate Transition Platform",
    name: "Kept House",
    body: "A digital platform that guides families through the estate transition process with clarity, structure, and care.",
    image: "/images/project-kept-house.png",
    href: "https://www.keptestate.com/",
  },
  {
    tag: "Farm Workforce & Operations Management System",
    badge: "Internal Tool",
    name: "AFMS",
    body: "An internal platform that tracks worker attendance and output, automates earnings, and gives managers real-time visibility across every farm.",
    image: "/images/project-afms.png",
    href: null,
  },
  {
    tag: "AI Vehicle Valuation & Claims Platform",
    name: "Obai",
    body: "An AI toolbox for car owners, fleet operators, and appraisers to value vehicles, label photos, and close claims in minutes.",
    image: "/images/project-obai.png",
    href: "https://obai.app/",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
          <HeroGlow />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 text-center lg:px-10">
            <HeroItem>
              <Eyebrow>Software &amp; AI Studio for Founders</Eyebrow>
            </HeroItem>
            <HeroItem delay={0.1}>
              <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Building Digital
                <br />
                <span className="text-gradient-gold">Foundations.</span>
              </h1>
            </HeroItem>
            <HeroItem delay={0.2}>
              <p className="max-w-2xl text-balance text-lg text-foreground-muted sm:text-xl">
                We help founders turn ideas into world-class digital products.
              </p>
            </HeroItem>
            <HeroItem delay={0.3} className="flex flex-col items-center gap-4 sm:flex-row">
              <Tap>
                <Link className={`${btnPrimary} h-13 px-8 text-base`} href={START_URL}>
                  Start Your Project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Tap>
              <Tap>
                <a className={`${btnSecondary} h-13 px-8 text-base`} href="#projects">
                  View Our Work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Tap>
            </HeroItem>
            <HeroItem delay={0.4}>
              <p className="text-sm text-foreground-faint">Trusted by startups and growing businesses.</p>
            </HeroItem>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <Reveal>
                <Eyebrow>What We Do</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  End-to-end product engineering, under one roof.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mx-auto max-w-xl text-base text-foreground-muted sm:text-lg">
                  From first concept to production launch, we bring the full range of skills founders need to ship something exceptional.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-border-subtle bg-surface/60 p-7 transition-colors hover:border-gold-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-strong bg-background-elevated text-gold-bright">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="font-display mt-4 text-xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>About Foundhouse</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  We help founders turn ideas into successful digital products.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
                  Foundhouse is a software and AI studio built for startups and growing businesses. We pair senior engineering with thoughtful design to build products on a foundation that lasts.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-surface/60 p-6 text-center">
                <span className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">3</span>
                <span className="text-xs text-foreground-faint">Products Shipped</span>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-surface/60 p-6 text-center">
                <span className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">100%</span>
                <span className="text-xs text-foreground-faint">Senior Engineers</span>
              </div>
            </Reveal>
          </div>
          <div className="relative mx-auto mt-20 w-full max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.1}>
                  <div className="flex h-full items-center gap-5 rounded-2xl border border-border-subtle bg-surface/60 p-6">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border-strong">
                      <Image alt={m.name} fill sizes="100vw" className="object-cover" src={m.image} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg font-semibold tracking-tight">{m.name}</h3>
                      <p className="text-sm text-gold-bright">{m.role}</p>
                      <p className="text-sm leading-relaxed text-foreground-muted">{m.bio}</p>
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-foreground-faint hover:text-gold-bright"
                      >
                        LinkedIn
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Foundhouse */}
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-105 w-105 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <Reveal>
                <Eyebrow>Why Foundhouse</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  A studio built on trust and craft.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mx-auto max-w-xl text-base text-foreground-muted sm:text-lg">
                  We treat every engagement like it&apos;s our own product — because your success is how we measure ours.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface">
                    <Icon className="h-6 w-6 text-gold-bright" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section id="projects" className="relative scroll-mt-24 py-28 sm:py-36">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <Reveal>
                <Eyebrow>Featured Work</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Products we&apos;ve helped bring to life.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mx-auto max-w-xl text-base text-foreground-muted sm:text-lg">
                  A look at the platforms our team has designed, engineered, and shipped for founders and growing businesses.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => {
                const cardClass = "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface/60 hover:border-gold-400";
                const inner = (
                  <>
                    <div className="relative h-48 overflow-hidden border-b border-border-subtle bg-background-elevated">
                      <Image
                        alt={`${p.name} product screenshot`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        src={p.image}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-7">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold-bright">{p.tag}</span>
                        {"badge" in p && p.badge ? (
                          <span className="shrink-0 rounded-full border border-border-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground-faint">
                            {p.badge}
                          </span>
                        ) : (
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-faint transition-colors group-hover:text-gold-bright" aria-hidden="true" />
                        )}
                      </div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                      <p className="text-sm leading-relaxed text-foreground-muted">{p.body}</p>
                    </div>
                  </>
                );
                return (
                  <Reveal key={p.name} delay={i * 0.1}>
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</a>
                    ) : (
                      <div className={cardClass}>{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="relative scroll-mt-24 px-6 py-20 sm:py-28">
          <Reveal className="mx-auto w-full max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-background-elevated px-8 py-16 text-center sm:px-16 sm:py-24">
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-gold/25 blur-[140px]" />
              <div className="relative flex flex-col items-center gap-6">
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Ready to build your next product?
                </h2>
                <p className="max-w-lg text-lg text-foreground-muted">
                  Book a free consultation and let&apos;s turn your idea into a product worth building.
                </p>
                <Tap>
                  <Link className={`${btnPrimary} mt-2 h-13 px-8 text-base`} href={START_URL}>
                    Book a Free Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Tap>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
