import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { JoinForm } from "@/components/forms";
import { Check } from "lucide-react";

export default function JoinPage() {
  return (
    <>
      <PageHero eyebrow="MSKÜ Racing'e katıl" title="Yeteneğin için bir yer var." description="Motor sporları deneyimi şart değil. Merakını, disiplinini ve öğrenme isteğini yanında getir." />
      <section className="section-space"><div className="container-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <Reveal>
          <p className="eyebrow">Seni ne bekliyor?</p>
          <h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-[-.04em]">İlk günden gerçek sorumluluk.</h2>
          <div className="mt-8 space-y-4">
            {["Uygulamalı teknik ve yaratıcı çalışmalar","Deneyimli üyelerden mentorluk","Departmanlar arası proje deneyimi","Üreterek öğrenen bir takım"].map(x=><p key={x} className="flex items-center gap-3 text-sm text-white/55"><span className="grid size-6 place-items-center rounded-full bg-green/15 text-green"><Check size={13}/></span>{x}</p>)}
          </div>
          <p className="mt-9 border-l-2 border-burgundy pl-5 text-sm leading-7 text-white/40">Başvurular tüm bölümlerdeki aktif MSKÜ öğrencilerine açıktır. Pozisyonlar ve kontenjanlar sezon boyunca değişebilir.</p>
        </Reveal>
        <Reveal delay={.1} className="rounded-2xl border border-white/10 bg-white/[.025] p-6 md:p-9"><JoinForm /></Reveal>
      </div></section>
    </>
  );
}
