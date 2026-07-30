"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

const nav = [
  { tr: "Ana Sayfa", en: "Home", href: "/" },
  { tr: "Araç", en: "Car", href: "/car" },
  { tr: "Takım", en: "Team", href: "/team" },
  { tr: "Sponsorlar", en: "Sponsors", href: "/sponsors" },
  { tr: "Haberler", en: "News", href: "/news" },
  { tr: "Galeri", en: "Gallery", href: "/gallery" },
  { tr: "İletişim", en: "Contact", href: "/contact" },
];

function NavLink({ label, href, active, mobile = false }: { label: string; href: string; active: boolean; mobile?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center font-bold uppercase text-white/55 transition hover:text-white",
        mobile ? "group justify-between border-b border-white/10 py-4 font-display text-[clamp(1.65rem,8vw,2.5rem)] tracking-[-.04em]" : "justify-center px-3 py-2 text-[11px] tracking-[.14em]",
        active && "text-white",
      )}
    >
      {label}
      {mobile && <span className="text-xs tracking-[.16em] text-burgundy transition-transform group-hover:translate-x-1">↗</span>}
      {active && <span className={cn("absolute bottom-0 h-0.5 bg-burgundy", mobile ? "inset-x-0" : "-bottom-[23px] inset-x-3")} />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, translate } = useLanguage();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={cn("site-header fixed inset-x-0 top-0 z-40 border-b border-white/[.09] bg-[#080D1A]/88 backdrop-blur-xl", menuOpen && "mobile-menu-open")}>
      <div className="container-shell flex h-[72px] items-center justify-between xl:h-[76px]">
        <Logo />
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 xl:flex" aria-label={translate("Ana navigasyon", "Main navigation")}>
            {nav.map(({ tr, en, href }) => (
              <NavLink key={href} label={language === "tr" ? tr : en} href={href} active={pathname === href} />
            ))}
          </nav>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? translate("Menüyü kapat", "Close menu") : translate("Menüyü aç", "Open menu")}
            className="grid size-10 place-items-center border border-white/15 text-white transition hover:border-burgundy xl:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "mobile-menu-panel fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 px-5 pb-8 pt-4 transition duration-300 xl:hidden",
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav className="mx-auto max-w-2xl" aria-label={translate("Mobil navigasyon", "Mobile navigation")}>
          {nav.map(({ tr, en, href }) => (
            <NavLink key={href} label={language === "tr" ? tr : en} href={href} active={pathname === href} mobile />
          ))}
          <Link href="/join" className="mt-7 flex items-center justify-between bg-burgundy px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-white">
            {translate("Takıma katıl", "Join the team")}
            <span>↗</span>
          </Link>
        </nav>
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.18em] text-white/35">
          <span>Muğla / Türkiye</span>
          <span>Formula Student</span>
        </div>
      </div>
    </header>
  );
}
