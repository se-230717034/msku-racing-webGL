"use client";

import Link from "next/link";
import { ArrowUpRight, Gem } from "lucide-react";
import { useLanguage } from "./language-provider";

const sponsorSlots = [
  { tr: "Elmas Sponsor 01", en: "Diamond Sponsor 01", tierTr: "Elmas", tierEn: "Diamond" },
  { tr: "Elmas Sponsor 02", en: "Diamond Sponsor 02", tierTr: "Elmas", tierEn: "Diamond" },
  { tr: "Altın Sponsor 01", en: "Gold Sponsor 01", tierTr: "Altın", tierEn: "Gold" },
  { tr: "Altın Sponsor 02", en: "Gold Sponsor 02", tierTr: "Altın", tierEn: "Gold" },
  { tr: "Gümüş Sponsor 01", en: "Silver Sponsor 01", tierTr: "Gümüş", tierEn: "Silver" },
  { tr: "Gümüş Sponsor 02", en: "Silver Sponsor 02", tierTr: "Gümüş", tierEn: "Silver" },
];

export function SponsorMarquee() {
  const { language, translate } = useLanguage();

  return (
    <div className="sponsor-grid" aria-label={translate("Sponsor alanları", "Sponsor spaces")}>
      {sponsorSlots.map((item) => (
        <Link href="/sponsors" key={item.tr} className="sponsor-marquee-card group">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-burgundy">
              <Gem size={13} />
              {language === "tr" ? item.tierTr : item.tierEn}
            </span>
            <ArrowUpRight size={14} className="text-white/25 transition group-hover:text-white" />
          </div>
          <p className="mt-8 font-display text-xl font-semibold uppercase tracking-[-.025em] text-white">
            {language === "tr" ? item.tr : item.en}
          </p>
          <span className="mt-3 block text-[9px] uppercase tracking-[.18em] text-white/25">
            {translate("Logo alanı", "Logo area")}
          </span>
        </Link>
      ))}
    </div>
  );
}
