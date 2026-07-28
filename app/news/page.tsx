"use client";

import { CalendarClock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";

export default function NewsPage() {
  const { translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("Haberler", "News")}
        title={translate("Çok yakında.", "Coming soon.")}
        description={translate("MSKU RACING'den gelişmeler, üretim notları ve takım duyuruları yakında burada yayınlanacak.", "Updates, manufacturing notes and team announcements from MSKU RACING will be published here soon.")}
      />
      <section className="section-space">
        <div className="container-shell">
          <Reveal className="grid min-h-[360px] place-items-center border border-white/10 bg-[#0D1425] text-center">
            <div className="max-w-xl px-6">
              <span className="mx-auto grid size-14 place-items-center border border-university/50 bg-university/10 text-white/70">
                <CalendarClock size={24} />
              </span>
              <p className="mt-7 text-[10px] font-bold uppercase tracking-[.24em] text-green">{translate("Hazırlanıyor", "In progress")}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[-.04em]">{translate("Yeni içerikler çok yakında.", "New content is coming soon.")}</h2>
              <p className="mt-4 leading-7 text-white/45">{translate("Takımımızın gerçek gelişmelerini ve duyurularını paylaşmak için bu alanı hazırlıyoruz.", "We are preparing this space to share real updates and announcements from our team.")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
