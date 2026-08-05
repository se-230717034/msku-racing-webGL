"use client";

import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";

const galleryItems = [
  {
    src: "/images/gallery/takim-masa-foto.jpeg",
    width: 1600,
    height: 1200,
    tr: "MSKU Racing takım buluşması",
    en: "MSKU Racing team gathering",
    categoryTr: "Takım ruhu",
    categoryEn: "Team spirit",
  },
  {
    src: "/images/gallery/takim-ayakta-foto.jpeg",
    width: 1536,
    height: 2048,
    tr: "MSKU Racing ekip fotoğrafı",
    en: "MSKU Racing team photo",
    categoryTr: "MSKU Racing ekibi",
    categoryEn: "MSKU Racing team",
  },
];

export default function GalleryPage() {
  const { translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("Galeri", "Gallery")}
        title={translate("Takımın hikâyesi", "The story of the team")}
        description={translate(
          "MSKU Racing yolculuğundan takım ruhunu yansıtan kareler.",
          "Moments that reflect the team spirit throughout the MSKU Racing journey."
        )}
      />

      <section className="theme-fixed-dark section-space border-t border-white/10 bg-[#080D1A]">
        <div className="container-shell">
          <div className="mb-10 flex items-center justify-between gap-6 border-b border-white/10 pb-5">
            <p className="eyebrow">{translate("MSKU Racing arşivi", "MSKU Racing archive")}</p>
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">
              {galleryItems.length} {translate("fotoğraf", "photos")}
            </span>
          </div>

          <div className="mx-auto columns-1 gap-4 md:columns-2">
            {galleryItems.map((item, index) => (
              <Reveal
                key={item.src}
                delay={index * 0.08}
                className="mb-4 break-inside-avoid"
              >
                <figure className="group relative overflow-hidden border border-white/10 bg-[#0D1425]">
                  <Image
                    src={item.src}
                    alt={translate(item.tr, item.en)}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03060d]/90 via-transparent to-transparent opacity-80" />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[9px] font-bold uppercase tracking-[.2em] text-burgundy">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-white">
                      {translate(item.categoryTr, item.categoryEn)}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
