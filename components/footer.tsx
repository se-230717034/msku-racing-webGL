import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03060d]">
      <div className="container-shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/45">A student-built racing team from Muğla Sıtkı Koçman University, engineering the next generation on and off the track.</p>
          </div>
          <div>
            <p className="eyebrow mb-5">Explore</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/55">
              <Link href="/about">About</Link><Link href="/team">Team</Link>
              <Link href="/car">Car</Link><Link href="/sponsors">Sponsors</Link>
              <Link href="/news">News</Link><Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Follow the build</p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Mail].map((Icon, i) => <a key={i} href="#" className="grid size-10 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-accent hover:text-white"><Icon size={17} /></a>)}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[.14em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MSKU Racing. Built for the next lap.</p>
          <a href="https://www.mu.edu.tr" target="_blank" className="flex items-center gap-1 hover:text-white">Muğla Sıtkı Koçman University <ArrowUpRight size={12} /></a>
        </div>
      </div>
    </footer>
  );
}
