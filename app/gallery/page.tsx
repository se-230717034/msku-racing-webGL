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
          <Reveal className="gallery-status-board gallery-page-status">
            <div className="gallery-status-number" aria-hidden="true">00</div>
            <div className="gallery-status-copy">
              <p>MSKU RACING / MEDIA</p>
              <h2>{translate("Arşiv hazırlanıyor", "Archive in progress")}</h2>
              <span>{translate("Takımımızın atölye, üretim ve pist çalışmalarından özenle seçilmiş fotoğraflar yakında burada yer alacak.", "Selected photos from our workshop, manufacturing and track work will be available here soon.")}</span>
            </div>
            <div className="gallery-status-side">
              <span className="gallery-status-icon"><Camera size={22} /></span>
              <div><small>{translate("Yayın", "Release")}</small><strong>{translate("Çok yakında", "Coming soon")}</strong></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
