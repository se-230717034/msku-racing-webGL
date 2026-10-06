"use client";

import { Camera } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";

export default function GalleryPage() {
  const { translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("Galeri", "Gallery")}
        title={translate("Çok yakında", "Coming soon")}
        description={translate("Üretim, test ve takım çalışmalarından yeni kareleri paylaşmak için galeri alanımızı hazırlıyoruz.", "We are preparing our gallery to share new moments from manufacturing, testing and team work.")}
      />
      <section className="section-space">
        <div className="container-shell">
          <Reveal className="gallery-page-coming-soon">
            <span className="gallery-coming-soon-icon"><Camera size={27} /></span>
            <p>{translate("Hazırlanıyor", "In progress")}</p>
            <h2>{translate("Yeni kareler çok yakında", "New moments coming soon")}</h2>
            <span>{translate("Takımımızın atölye, üretim ve pist çalışmalarından özenle seçilmiş fotoğraflar yakında burada yer alacak.", "Selected photos from our workshop, manufacturing and track work will be available here soon.")}</span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
