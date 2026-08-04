"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  BrainCircuit,
  Code2,
  Globe,
  Smartphone,
  Zap,
  Sparkles,
  Layers,
  Handshake,
} from "lucide-react";
import { Button, XIcon, InstagramIcon } from "@/components";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "AI Solutions",
    description: "Custom AI products, LLM integrations, and intelligent automation that give your business a genuine edge.",
    icon: BrainCircuit,
  },
  {
    title: "Custom Software",
    description: "Bespoke software engineered around how your business actually operates — not the other way around.",
    icon: Code2,
  },
  {
    title: "Web Applications",
    description: "Fast, scalable, beautifully engineered web apps built on modern frameworks and best practices.",
    icon: Globe,
  },
  {
    title: "Mobile Applications",
    description: "Native-feel mobile experiences for iOS and Android from a single, maintainable codebase.",
    icon: Smartphone,
  },
];

const whyFoundhouse = [
  { title: "Fast Delivery", description: "Structured sprints and clear milestones mean your product ships on time.", icon: Zap },
  { title: "Modern Technology", description: "Battle-tested, current tools — no legacy stacks or outdated patterns.", icon: Sparkles },
  { title: "Scalable Solutions", description: "We build for where you're going, not just where you are today.", icon: Layers },
  { title: "Long-Term Partnership", description: "We stay involved after launch — as a partner, not a vendor.", icon: Handshake },
];

const projects = [
  {
    name: "Kept House",
    category: "Estate Transition Platform",
    description: "A digital platform that guides families through the estate transition process with clarity, structure, and care.",
    thumbnail: "/images/project-kept-house.png",
    href: "https://www.keptestate.com/",
  },
  {
    name: "AFMS",
    category: "Farm Workforce & Operations Management System",
    description: "An internal platform that tracks worker attendance and output, automates earnings, and gives managers real-time visibility across every farm.",
    thumbnail: "/images/project-afms.png",
    href: null,
  },
  {
    name: "Obai",
    category: "AI Vehicle Valuation & Claims Platform",
    description: "An AI toolbox for car owners, fleet operators, and appraisers to value vehicles, label photos, and close claims in minutes.",
    thumbnail: "/images/project-obai.png",
    href: "https://obai.app/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 px-6 py-5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-border-subtle bg-background/70 px-4 py-2.5 backdrop-blur-xl">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#fafaf8]">
              <Image src="/images/logo.png" alt="" width={32} height={32} className="h-full w-full object-contain" priority />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Foundhouse</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact">
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mx-6 mt-2 rounded-2xl border border-border-subtle bg-background p-4 shadow-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 border-t border-border-subtle pt-3">
              <Button href="#contact" onClick={() => setMenuOpen(false)} className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-18%] h-140 w-225 -translate-x-1/2 rounded-full bg-gold/25 blur-[150px]"
            animate={{ x: ["-50%", "-46%", "-54%", "-50%"], opacity: [0.7, 1, 0.85, 0.7] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 text-center lg:px-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Software &amp; AI Studio for Founders
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Building Digital
              <br />
              <span className="text-gradient-gold">Foundations.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-balance text-lg text-foreground-muted sm:text-xl"
            >
              We help founders turn ideas into world-class digital products.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <Button href="https://calendar.app.google/F8tUundvppiG79FaA" className="h-13 px-8 text-base">
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <Button href="#projects" variant="secondary" className="h-13 px-8 text-base">
                  View Our Work
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="text-sm text-foreground-faint"
            >
              Trusted by startups and growing businesses.
            </motion.p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <SectionHeading
              eyebrow="What We Do"
              title="End-to-end product engineering, under one roof."
              description="From first concept to production launch, we bring the full range of skills founders need to ship something exceptional."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-border-subtle bg-surface/60 p-7 transition-colors hover:border-gold-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-strong bg-background-elevated text-gold-bright">
                      <service.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display mt-4 text-xl font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{service.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
          <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  About Foundhouse
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  We help founders turn ideas into successful digital products.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg">
                  Foundhouse is a software and AI studio built for startups and growing businesses. We pair senior
                  engineering with thoughtful design to build products on a foundation that lasts.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="grid grid-cols-3 gap-4">
              {[
                { value: "2", label: "Products Shipped" },
                { value: "7", label: "Stage Process" },
                { value: "100%", label: "Senior Engineers" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-surface/60 p-6 text-center">
                  <span className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">{stat.value}</span>
                  <span className="text-xs text-foreground-faint">{stat.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Why Foundhouse */}
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-105 w-105 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <SectionHeading
              eyebrow="Why Foundhouse"
              title="A studio built on trust and craft."
              description="We treat every engagement like it's our own product — because your success is how we measure ours."
            />

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
              {whyFoundhouse.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface">
                    <item.icon className="h-6 w-6 text-gold-bright" strokeWidth={1.75} />
                    <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="relative scroll-mt-24 py-28 sm:py-36">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-10">
            <SectionHeading
              eyebrow="Featured Work"
              title="Products we've helped bring to life."
              description="A look at the platforms our team has designed, engineered, and shipped for founders and growing businesses."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => {
                const CardTag = project.href ? "a" : "div";
                return (
                  <Reveal key={project.name} delay={i * 0.1}>
                    <CardTag
                      {...(project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface/60 hover:border-gold-400"
                    >
                      <div className="relative h-48 overflow-hidden border-b border-border-subtle bg-background-elevated">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.name} product screenshot`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-7">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold-bright">{project.category}</span>
                          {project.href ? (
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-faint transition-colors group-hover:text-gold-bright" />
                          ) : (
                            <span className="shrink-0 rounded-full border border-border-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground-faint">
                              Internal Tool
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight">{project.name}</h3>
                        <p className="text-sm leading-relaxed text-foreground-muted">{project.description}</p>
                      </div>
                    </CardTag>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative scroll-mt-24 px-6 py-20 sm:py-28">
          <Reveal className="mx-auto w-full max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-background-elevated px-8 py-16 text-center sm:px-16 sm:py-24">
              <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-gold/25 blur-[140px]" />
              <div className="relative flex flex-col items-center gap-6">
                <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Ready to build your next product?
                </h2>
                <p className="max-w-lg text-lg text-foreground-muted">
                  Book a free consultation and let&apos;s turn your idea into a product worth building.
                </p>
                <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  <Button href="https://calendar.app.google/F8tUundvppiG79FaA" className="mt-2 h-13 px-8 text-base">
                    Book a Free Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-background-elevated">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-16 text-center lg:px-10 lg:py-20">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#fafaf8]">
              <Image src="/images/logo.png" alt="" width={32} height={32} className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Foundhouse</span>
          </div>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-foreground-muted hover:text-gold-bright">
                {link.label}
              </a>
            ))}
          </nav>

          <a href="mailto:teamfoundhouse@gmail.com" className="text-sm font-medium text-foreground-muted hover:text-gold-bright">
            teamfoundhouse@gmail.com
          </a>

          <div className="flex items-center gap-2">
            {[
              { label: "X", href: "https://x.com/foundhouseteam", icon: XIcon },
              { label: "Instagram", href: "https://instagram.com/teamfoundhouse", icon: InstagramIcon },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-foreground-muted hover:border-gold-400 hover:text-gold-bright"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-sm text-foreground-faint">&copy; {new Date().getFullYear()} Foundhouse. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto max-w-xl text-base text-foreground-muted sm:text-lg">{description}</p>
      </Reveal>
    </div>
  );
}

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
}
