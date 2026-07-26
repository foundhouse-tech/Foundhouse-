import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", className = "", onClick, children }: ButtonProps) {
  const base =
    "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-medium transition-all duration-300 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gold text-background hover:bg-gold-bright hover:shadow-[0_0_24px_4px_rgba(205,154,77,0.35)]"
      : "border border-border-strong bg-surface text-foreground hover:bg-surface-hover hover:border-gold-400";

  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

