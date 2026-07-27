"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  ["Ana Sayfa", "/"],
  ["Araç", "/car"],
  ["Takım", "/team"],
  ["Sponsorlar", "/sponsors"],
  ["Haberler", "/news"],
  ["Galeri", "/gallery"],
  ["İletişim", "/contact"],
];

function NavLink({ label, href, active, mobile = false }: { label: string; href: string; active: boolean; mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-center font-bold uppercase text-white/55 transition hover:text-white",
        mobile ? "min-h-9 px-1 text-[9px] tracking-[.1em]" : "px-3 py-2 text-[11px] tracking-[.14em]",
        active && "text-white",
      )}
    >
      {label}
      {active && <span className={cn("absolute inset-x-2 bottom-0 h-0.5 bg-burgundy", !mobile && "-bottom-[23px] inset-x-3")} />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-white/[.09] bg-[#080D1A]/95 backdrop-blur-md">
      <div className="container-shell flex h-[68px] items-center justify-between xl:h-[76px]">
        <Logo />
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Ana navigasyon">
            {nav.map(([label, href]) => (
              <NavLink key={href} label={label} href={href} active={pathname === href} />
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>

      <nav className="border-t border-white/[.07] xl:hidden" aria-label="Mobil navigasyon">
        <div className="container-shell grid h-[72px] grid-cols-4 items-stretch px-3 sm:px-8">
          {nav.map(([label, href]) => (
            <NavLink key={href} label={label} href={href} active={pathname === href} mobile />
          ))}
        </div>
      </nav>
    </header>
  );
}
