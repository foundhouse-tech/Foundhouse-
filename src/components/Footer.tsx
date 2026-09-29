import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background-elevated">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-16 text-center lg:px-10 lg:py-20">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#fafaf8]">
            <Image alt="" width={32} height={32} className="h-full w-full object-contain" src="/images/logo.png" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Foundhouse</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/#services" className="text-sm text-foreground-muted hover:text-gold-bright">Services</Link>
          <Link href="/#about" className="text-sm text-foreground-muted hover:text-gold-bright">About</Link>
          <Link href="/faq" className="text-sm text-foreground-muted hover:text-gold-bright">FAQ</Link>
          <Link href="/#contact" className="text-sm text-foreground-muted hover:text-gold-bright">Contact</Link>
        </nav>
        <a href="mailto:teamfoundhouse@gmail.com" className="text-sm font-medium text-foreground-muted hover:text-gold-bright">
          teamfoundhouse@gmail.com
        </a>
        <div className="flex items-center gap-2">
          <a
            href="https://x.com/foundhouseteam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-foreground-muted hover:border-gold-400 hover:text-gold-bright"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/teamfoundhouse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-foreground-muted hover:border-gold-400 hover:text-gold-bright"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-foreground-faint">© {new Date().getFullYear()} Foundhouse. All rights reserved.</p>
      </div>
    </footer>
  );
}
