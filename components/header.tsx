"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

const nav = [
  { tr: "Ana Sayfa", en: "Home", id: "home" },
  { tr: "Araç", en: "Car", id: "car" },
  { tr: "Takım", en: "Team", id: "team" },
  { tr: "Sponsorlar", en: "Sponsors", id: "sponsors" },
  { tr: "Haberler", en: "News", id: "news" },
  { tr: "Galeri", en: "Gallery", id: "gallery" },
  { tr: "İletişim", en: "Contact", id: "contact" },
];

function NavLink({ label, href, active, mobile = false, onNavigate, linkRef }: { label: string; href: string; active: boolean; mobile?: boolean; onNavigate?: () => void; linkRef?: (node: HTMLAnchorElement | null) => void }) {
  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative flex items-center font-bold uppercase text-white/55 transition hover:text-white",
        mobile ? "mobile-nav-link group justify-between border-b border-white/10 py-4 font-display text-[clamp(1.65rem,8vw,2.5rem)] tracking-[-.04em]" : "justify-center px-3 py-2 text-[11px] tracking-[.14em]",
        active && "text-white",
      )}
    >
      {label}
      {mobile && <span className="text-xs tracking-[.16em] text-burgundy transition-transform group-hover:translate-x-1">↗</span>}
      {mobile && active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-burgundy" />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navIndicator, setNavIndicator] = useState({ x: 0, width: 0, visible: false });
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const { language, translate } = useLanguage();
  const sectionHref = (id: string) => id === "contact" ? "/contact" : `${pathname === "/" ? "" : "/"}#${id}`;

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      const pageId = pathname.split("/").filter(Boolean)[0];
      setActiveSection(nav.some(({ id }) => id === pageId) ? pageId : "");
      return;
    }

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * .34;
      let current = "home";
      let currentTop = Number.NEGATIVE_INFINITY;

      nav.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker && section.offsetTop >= currentTop) {
          current = id;
          currentTop = section.offsetTop;
        }
      });

      setActiveSection(current);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const navElement = desktopNavRef.current;
      const activeLink = desktopLinkRefs.current[activeSection];
      if (!navElement || !activeLink) {
        setNavIndicator((current) => ({ ...current, visible: false }));
        return;
      }

      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setNavIndicator({ x: linkRect.left - navRect.left + 12, width: Math.max(0, linkRect.width - 24), visible: true });
    };

    const frame = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    document.fonts?.ready.then(updateIndicator);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, language, pathname]);

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
          <nav ref={desktopNavRef} className="relative hidden items-center gap-1 xl:flex" aria-label={translate("Ana navigasyon", "Main navigation")}>
            {nav.map(({ tr, en, id }) => (
              <NavLink key={id} label={language === "tr" ? tr : en} href={sectionHref(id)} active={id === activeSection} linkRef={(node) => { desktopLinkRefs.current[id] = node; }} />
            ))}
            <span
              className="nav-active-indicator"
              style={{ width: navIndicator.width, transform: `translateX(${navIndicator.x}px)`, opacity: navIndicator.visible ? 1 : 0 }}
              aria-hidden="true"
            />
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
          {nav.map(({ tr, en, id }) => (
            <NavLink key={id} label={language === "tr" ? tr : en} href={sectionHref(id)} active={id === activeSection} mobile onNavigate={() => setMenuOpen(false)} />
          ))}
          <Link href="/join" className="mt-7 flex items-center justify-between bg-burgundy px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-white">
            {translate("Takıma katıl", "Join the team")}
            <span>↗</span>
          </Link>
        </nav>
        <div className="mobile-menu-meta mx-auto mt-8 flex max-w-2xl items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.18em] text-white/35">
          <span>Muğla / Türkiye</span>
          <span>Formula Student</span>
        </div>
      </div>
    </header>
  );
}
