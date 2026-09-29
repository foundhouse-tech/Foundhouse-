"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { brainstormPrompts, offerings, timelines, type BrainstormKey } from "@/lib/form";

const field =
  "w-full rounded-lg border border-border-strong bg-background-elevated px-4 py-3 text-sm text-foreground placeholder:text-foreground-faint outline-none transition-colors focus:border-gold-400";
const label = "font-display text-base font-semibold tracking-tight";
const hint = "mt-1 text-sm text-foreground-muted";
const btnPrimary =
  "group inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-medium transition-all duration-300 active:scale-[0.98] bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)] disabled:opacity-60";
const btnSecondary =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border-strong bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-gold-400 hover:bg-surface-hover";

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

function StepDot({ n, state, children }: { n: number; state: "done" | "current" | "todo"; children: React.ReactNode }) {
  return (
    <li className={`flex items-center gap-2 text-sm ${state === "todo" ? "text-foreground-faint" : "text-foreground"}`}>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
          state === "todo" ? "border-border-strong" : "border-gold-400 bg-gold-100 text-gold-bright"
        }`}
      >
        {state === "done" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : n}
      </span>
      {children}
    </li>
  );
}

type Props = { person: string; bookingUrl: string; embedUrl: string | null; email: string; lead?: string };

export default function BrainstormFlow({ person, bookingUrl, embedUrl, email, lead }: Props) {
  const [step, setStep] = useState<"book" | "brainstorm" | "done">("book");
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [answers, setAnswers] = useState<Partial<Record<BrainstormKey, string>>>({});
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function go(next: typeof step) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setBusy(true);
    try {
      const res = await fetch("/api/brainstorm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lead, offerings: picked, timeline, answers }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? ["Something went wrong. Please try again."]);
        return;
      }
      go("done");
    } catch {
      setErrors(["Something went wrong. Please try again."]);
    } finally {
      setBusy(false);
    }
  }

  const withEmail = `${bookingUrl}${bookingUrl.includes("?") ? "&" : "?"}email=${encodeURIComponent(email)}`;

  return (
    <div className="flex w-full flex-col gap-10">
      <ol className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <StepDot n={1} state={step === "book" ? "current" : "done"}>Book your call</StepDot>
        <StepDot n={2} state={step === "brainstorm" ? "current" : step === "done" ? "done" : "todo"}>Brainstorm</StepDot>
      </ol>

      {step === "book" && (
        <div className="flex flex-col items-center gap-6">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`Book a call with ${person}`}
              className="h-[720px] w-full rounded-2xl border border-border-subtle bg-white"
              loading="lazy"
            />
          ) : (
            <a href={withEmail} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Open {person}&apos;s calendar
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <div className="flex flex-col items-center gap-3 text-center">
            <button type="button" onClick={() => go("brainstorm")} className={btnPrimary}>
              I&apos;ve booked my call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-xs text-foreground-faint">
              Next: brainstorm your idea so {person} comes to the call prepared.
              {embedUrl && (
                <>
                  {" "}Calendar not loading?{" "}
                  <a href={withEmail} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-bright">
                    Open it in a new tab
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {step === "brainstorm" && (
        <form onSubmit={submit} className="flex w-full flex-col gap-10 text-left" noValidate>
          <fieldset className="flex flex-col gap-6">
            <legend className={label}>Which offerings interest you?</legend>
            <p className={hint}>Pick everything that sounds useful. It helps us shape the conversation.</p>
            {offerings.map((o) => (
              <div key={o.group} className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold-bright">{o.group}</span>
                <div className="flex flex-wrap gap-2">
                  {o.items.map((item) => (
                    <Chip
                      key={item}
                      active={picked.includes(item)}
                      onClick={() => setPicked(picked.includes(item) ? picked.filter((x) => x !== item) : [...picked, item])}
                    >
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className={label}>Ideal timeline</legend>
            <div className="flex flex-wrap gap-2">
              {timelines.map((t) => (
                <Chip key={t} active={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </fieldset>

          {brainstormPrompts.map(({ key, label: l, hint: h }) => (
            <div key={key} className="flex flex-col gap-2">
              <label htmlFor={key} className={label}>{l}</label>
              <p className={hint}>{h}</p>
              <textarea
                id={key}
                name={key}
                rows={3}
                className={field}
                value={answers[key] ?? ""}
                onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })}
              />
            </div>
          ))}

          {errors.length > 0 && (
            <ul role="alert" className="rounded-lg border border-[#e0665a66] bg-[#e0665a1a] px-4 py-3 text-sm text-[#f0a49c]">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center gap-3">
            <button type="submit" disabled={busy} className={btnPrimary}>
              {busy ? "Sending..." : `Send to ${person}`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go("book")} className="text-xs text-foreground-faint hover:text-gold-bright">
              Back to the calendar
            </button>
          </div>
        </form>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">You&apos;re all set.</h2>
          <p className="max-w-lg text-foreground-muted">
            {person} has your ideas and will come to the call ready to dig in. Check your inbox for the calendar invite.
          </p>
          <Link href="/" className={btnSecondary}>
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
