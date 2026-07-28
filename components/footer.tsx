import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "#", icon: Instagram },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/msku-racing/posts/?feedView=all",
      icon: Linkedin,
    },
    { label: "E-posta", href: "mailto:mskuracing@gmail.com", icon: Mail },
  ];

  return (
    <footer className="site-footer border-t border-white/10 bg-[#03060d]">
      <div className="container-shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/45">Muğla Sıtkı Koçman Üniversitesi öğrencileri tarafından kurulan, araç tasarımını ve üretimini üstlenen Formula Student takımı.</p>
          </div>
          <div>
            <p className="eyebrow mb-5">Keşfet</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/55">
              <Link href="/">Ana Sayfa</Link><Link href="/team">Takım</Link>
              <Link href="/car">Araç</Link><Link href="/sponsors">Sponsorlar</Link>
              <Link href="/news">Haberler</Link><Link href="/contact">İletişim</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Bizi takip et</p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-white/50 transition hover:border-accent hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[.14em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MSKU RACING. Tüm hakları saklıdır.</p>
          <a href="https://www.mu.edu.tr" target="_blank" className="flex items-center gap-1 hover:text-white">Muğla Sıtkı Koçman Üniversitesi <ArrowUpRight size={12} /></a>
        </div>
      </div>
    </footer>
  );
}
