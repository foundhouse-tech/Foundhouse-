import Image from "next/image";
import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="Foundhouse home">
      <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white">
        <Image src="/images/logo.png" alt="" width={32} height={32} className="h-full w-full object-contain" priority />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">Foundhouse</span>
    </Link>
  );
}
