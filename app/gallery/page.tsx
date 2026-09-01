"use client";

import Image from "next/image";
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
        title={translate("Birlikte üretiyoruz", "We build together")}
        description={translate("Takım ruhunu, birlikte geçirdiğimiz anları ve Akyaka'ya uzanan yolculuğumuzu burada paylaşıyoruz.", "We share our team spirit, the moments we spend together and our journey toward Akyaka here.")}
      />
      <section className="section-space">
        <div className="container-shell">
          <div className="team-gallery-grid">
            <Reveal className="team-gallery-card team-gallery-portrait">
              <Image
                src="/images/team-night-terrace.jpeg"
                alt={translate("MSKU RACING ekibinin terasta çekilmiş grup fotoğrafı", "MSKU RACING team group photo taken on a terrace")}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-center"
                priority
              />
              <div className="gallery-shade" />
              <div className="gallery-caption"><Images size={20} className="text-burgundy" /><p>{translate("Takım gecesi", "Team night")}</p></div>
            </Reveal>
            <Reveal delay={.08} className="team-gallery-card team-gallery-landscape">
              <Image
                src="/images/team-night-court.jpeg"
                alt={translate("MSKU RACING ekibinin açık alanda çekilmiş grup fotoğrafı", "MSKU RACING team group photo taken outdoors")}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover object-center"
                priority
              />
              <div className="gallery-shade" />
              <div className="gallery-caption"><p>{translate("Birlikte daha ileri", "Further together")}</p></div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
