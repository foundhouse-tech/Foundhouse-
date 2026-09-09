"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { ArrowUpRight } from "./Icons";
import { START_URL, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-[1050px] items-center justify-between rounded-2xl border border-border-subtle bg-elevated/80 px-3 py-2 pl-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Logo href="#" />
        <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-muted md:flex" aria-label="Primary">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={START_URL}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13.5px] font-semibold text-[#1a1408] transition-colors hover:bg-gold-bright"
          >
            Get Started <ArrowUpRight />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="mx-auto mt-2 max-w-[1050px] rounded-2xl border border-border-subtle bg-elevated/95 p-2 backdrop-blur-xl md:hidden" aria-label="Mobile">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-muted hover:bg-surface hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
