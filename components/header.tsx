"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const nav = [
  ["Ana Sayfa", "/"], ["Hakkımızda", "/about"], ["Araç", "/car"], ["Takım", "/team"],
  ["Sponsorlar", "/sponsors"], ["Haberler", "/news"], ["Galeri", "/gallery"], ["İletişim", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[.09] bg-[#080D1A]/95 backdrop-blur-md">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={cn("relative px-3 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-white/55 transition hover:text-white", pathname === href && "text-white")}>
              {label}
              {pathname === href && <motion.span layoutId="nav" className="absolute inset-x-3 -bottom-[23px] h-0.5 bg-burgundy" />}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-white/10 xl:hidden" aria-label="Menüyü aç veya kapat">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-x-0 top-[76px] border-b border-white/10 bg-[#080D1A] p-5 xl:hidden">
            <div className="grid gap-1 sm:grid-cols-2">
              {nav.map(([label, href], i) => (
                <motion.div key={href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .035 }}>
                  <Link href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-display text-xl uppercase text-white/70 hover:bg-white/5 hover:text-white">{label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
