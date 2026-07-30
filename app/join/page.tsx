"use client";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { JoinForm } from "@/components/forms";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function JoinPage() {
  const { translate } = useLanguage();
  const benefits = [
    translate("Uygulamalı teknik ve yaratıcı çalışmalar", "Hands-on technical and creative work"),
    translate("Deneyimli üyelerden mentorluk", "Mentorship from experienced members"),
    translate("Departmanlar arası proje deneyimi", "Cross-department project experience"),
    translate("Üreterek öğrenen bir takım", "A team that learns by building"),
  ];

  return (
    <>
      <PageHero eyebrow={translate("MSKU RACING'e katıl", "Join MSKU RACING")} title={translate("Yeteneğin için bir yer var.", "There is a place for your talent.")} description={translate("Motor sporları deneyimi şart değil. Merakını, disiplinini ve öğrenme isteğini yanında getir.", "Motorsport experience is not required. Bring your curiosity, discipline and willingness to learn.")} />
      <section className="section-space"><div className="container-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <Reveal>
          <p className="eyebrow">{translate("Seni ne bekliyor?", "What awaits you?")}</p>
          <h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-[-.04em]">{translate("İlk günden gerçek sorumluluk.", "Real responsibility from day one.")}</h2>
          <div className="mt-8 space-y-4">
            {benefits.map(x=><p key={x} className="flex items-center gap-3 text-sm text-white/55"><span className="grid size-6 place-items-center rounded-full bg-green/15 text-green"><Check size={13}/></span>{x}</p>)}
          </div>
          <p className="mt-9 border-l-2 border-burgundy pl-5 text-sm leading-7 text-white/40">{translate("Başvurular tüm bölümlerdeki aktif MSKÜ öğrencilerine açıktır. Pozisyonlar ve kontenjanlar sezon boyunca değişebilir.", "Applications are open to active MSKU students from all departments. Positions and availability may change throughout the season.")}</p>
        </Reveal>
        <Reveal delay={.1} className="premium-card border border-white/10 bg-white/[.025] p-6 md:p-9"><JoinForm /></Reveal>
      </div></section>
    </>
  );
}
