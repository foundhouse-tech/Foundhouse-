"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function EmailUpdates({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      setState(res.ok && json.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="inline-flex items-center gap-2 rounded-full border border-gold-400 bg-gold-100 px-5 py-3 text-sm font-medium text-gold-bright">
        <Check className="h-4 w-4" aria-hidden="true" />
        You&apos;re on the list. We&apos;ll email you when the first webinar is scheduled.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="updates-email" className="sr-only">Email</label>
      <input
        id="updates-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="h-13 flex-1 rounded-full border border-border-strong bg-background-elevated px-5 text-sm text-foreground placeholder:text-foreground-faint outline-none transition-colors focus:border-gold-400"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="group inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-medium transition-all duration-300 active:scale-[0.98] bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)] disabled:opacity-60"
      >
        {state === "busy" ? "Saving..." : "Get email updates"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {state === "error" && (
        <p className="text-sm text-[#f0a49c] sm:basis-full">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
