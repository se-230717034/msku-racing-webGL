"use client";

import { Images } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";

export default function GalleryPage() {
  const { translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("Galeri", "Gallery")}
        title={translate("Çok yakında.", "Coming soon.")}
        description={translate("Atölye, takım ve araç çalışmalarımızdan gerçek fotoğraflar yakında bu sayfada yer alacak.", "Real photos from our workshop, team and vehicle development will be featured here soon.")}
      />
      <section className="section-space">
        <div className="container-shell">
          <Reveal className="carbon-subtle grid min-h-[420px] place-items-center border border-white/10 bg-[#0D1425] text-center">
            <div className="max-w-xl px-6">
              <span className="mx-auto grid size-14 place-items-center border border-university/50 bg-university/10 text-white/70">
                <Images size={24} />
              </span>
              <p className="mt-7 text-[10px] font-bold uppercase tracking-[.24em] text-green">{translate("Galeri hazırlanıyor", "Gallery in progress")}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[-.04em]">{translate("Fotoğraflar çok yakında.", "Photos coming soon.")}</h2>
              <p className="mt-4 leading-7 text-white/45">{translate("Gerçek takım ve araç görselleri eklendiğinde galeri burada yayınlanacak.", "The gallery will be published here once real team and vehicle images are added.")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
