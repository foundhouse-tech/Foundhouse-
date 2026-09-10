"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { fundingOptions, intentions, packages, services, type PackageId } from "@/lib/form";

const field =
  "w-full rounded-lg border border-border-strong bg-background-elevated px-4 py-3 text-sm text-foreground placeholder:text-foreground-faint outline-none transition-colors focus:border-gold-400";
const label = "font-display text-base font-semibold tracking-tight";
const hint = "mt-1 text-sm text-foreground-muted";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-gold-400 bg-gold-100 text-gold-bright"
          : "border-border-strong bg-surface text-foreground-muted hover:border-gold-400 hover:text-foreground"
      }`}
    >
      {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </button>
  );
}

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export default function QualificationForm() {
  const [pkg, setPkg] = useState<PackageId | "">("");
  const [svc, setSvc] = useState<string[]>([]);
  const [intent, setIntent] = useState<string[]>([]);
  const [funding, setFunding] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [about, setAbout] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          package: pkg,
          services: svc,
          intentions: intent,
          funding,
          socialLinks,
          projectDescription,
          about,
          sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? ["Something went wrong. Please try again."]);
        setBusy(false);
        return;
      }
      window.location.assign(json.redirect);
    } catch {
      setErrors(["Something went wrong. Please try again."]);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-10 text-left" noValidate>
      {/* Package = tier */}
      <fieldset className="flex flex-col gap-4">
        <legend className={label}>What is your budget?</legend>
        <p className={hint}>Pick the package that fits. This decides who on our team you meet with.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {packages.map((p) => {
            const active = pkg === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPkg(p.id)}
                aria-pressed={active}
                className={`flex h-full flex-col gap-3 rounded-2xl border p-6 text-left transition-colors ${
                  active ? "border-gold-400 bg-gold-050" : "border-border-subtle bg-surface/60 hover:border-gold-400"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-xl font-semibold tracking-tight">{p.name}</span>
                  <span className="text-sm font-medium text-gold-bright">{p.price}</span>
                </div>
                <p className="text-sm text-foreground-muted">{p.tagline}</p>
                <ul className="mt-1 flex flex-col gap-1.5">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-bright" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Services */}
      <fieldset className="flex flex-col gap-4">
        <legend className={label}>Services</legend>
        <p className={hint}>Select everything you need.</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <Chip key={s} active={svc.includes(s)} onClick={() => setSvc(toggle(svc, s))}>
              {s}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Intention */}
      <fieldset className="flex flex-col gap-4">
        <legend className={label}>Project intention</legend>
        <p className={hint}>What is this project for?</p>
        <div className="flex flex-wrap gap-2">
          {intentions.map((s) => (
            <Chip key={s} active={intent.includes(s)} onClick={() => setIntent(toggle(intent, s))}>
              {s}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Can't pay? */}
      <fieldset className="flex flex-col gap-4">
        <legend className={label}>Can&apos;t pay?</legend>
        <p className={hint}>Optional. Tell us where you are and we&apos;ll find a way to work together.</p>
        <div className="flex flex-wrap gap-2">
          {fundingOptions.map((s) => (
            <Chip key={s} active={funding.includes(s)} onClick={() => setFunding(toggle(funding, s))}>
              {s}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Contact */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" autoComplete="name" className={field} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={label}>Company <span className="text-sm font-normal text-foreground-faint">(optional)</span></label>
          <input id="company" name="company" autoComplete="organization" className={field} value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="socialLinks" className={label}>Social media links</label>
        <p className={hint}>Website, Instagram, LinkedIn, X. One per line is fine.</p>
        <textarea id="socialLinks" name="socialLinks" rows={2} className={field} value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="projectDescription" className={label}>Project description</label>
        <p className={hint}>What are you building, and what does success look like?</p>
        <textarea id="projectDescription" name="projectDescription" rows={5} className={field} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="about" className={label}>About you</label>
        <p className={hint}>Your role, your team, and how you got here.</p>
        <textarea id="about" name="about" rows={4} className={field} value={about} onChange={(e) => setAbout(e.target.value)} />
      </div>

      {errors.length > 0 && (
        <ul role="alert" className="rounded-lg border border-[#e0665a66] bg-[#e0665a1a] px-4 py-3 text-sm text-[#f0a49c]">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-medium transition-all duration-300 active:scale-[0.98] bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)] disabled:opacity-60"
        >
          {busy ? "Sending..." : "Continue to booking"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-xs text-foreground-faint">Next step: pick a time on the calendar of the person who fits your package.</p>
      </div>
    </form>
  );
}
