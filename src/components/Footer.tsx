import Link from "next/link";
import Logo from "./Logo";
import { InstagramLogo, XLogo } from "./Icons";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border-subtle bg-elevated">
      <div className="mx-auto flex max-w-[1050px] flex-col items-center gap-7 px-6 py-16 text-center">
        <Logo href="#" />
        <nav className="flex gap-6 text-[13.5px] text-muted" aria-label="Footer">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={`mailto:${site.email}`} className="text-[13.5px] font-medium text-foreground/90 transition-colors hover:text-gold">
          {site.email}
        </a>
        <div className="flex gap-3">
          <a href={site.social.x} target="_blank" rel="noreferrer" aria-label="Foundhouse on X" className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-muted transition-colors hover:text-foreground">
            <XLogo />
          </a>
          <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Foundhouse on Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-muted transition-colors hover:text-foreground">
            <InstagramLogo />
          </a>
        </div>
        <p className="text-xs text-faint">© {new Date().getFullYear()} Foundhouse. All rights reserved.</p>
      </div>
    </footer>
  );
}
