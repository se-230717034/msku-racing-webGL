import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Wrench } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Hikâyemiz" title="Bir yarış aracından fazlası." description="MSKÜ Racing, iddialı fikirleri uygulanabilir mühendislik çözümlerine dönüştüren çok disiplinli bir öğrenci takımıdır." />
      <section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-2">
        <Reveal><SectionHeading eyebrow="Neden yarışıyoruz?" title="Eğitim, tam hız." /></Reveal>
        <Reveal delay={.1}><p className="text-xl leading-9 text-white/60">Formula Student, bir otomotiv şirketinin tüm süreçlerini öğrenci takımında buluşturur. Araştırır, tasarlar, üretir, test eder, kaynak yaratır ve geliştirdiğimiz aracı anlatırız. Her kararda birlikte öğreniriz.</p></Reveal>
      </div></section>
      <section className="border-y border-white/10 bg-white/[.02]"><div className="container-shell grid gap-4 py-20 md:grid-cols-3">
        {[
          [Lightbulb, "Cesur düşün", "Varsayımları sorgula ve her tasarım kararını ölçülebilir kıl."],
          [Wrench, "Hassas üret", "Simülasyon ve hesapları güvenilir fiziksel sistemlere dönüştür."],
          [Users, "Birlikte ilerle", "Bilgiyi açıkça paylaş ve sonucu tek takım olarak sahiplen."]
        ].map(([Icon, title, copy], i) => (
          <Reveal key={String(title)} delay={i * .08}><Card className="h-full"><CardContent className="p-8"><Icon className="text-accent" /><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{String(title)}</h3><p className="mt-4 leading-7 text-white/45">{String(copy)}</p></CardContent></Card></Reveal>
        ))}
      </div></section>
      <section className="section-space"><div className="container-shell"><Reveal><SectionHeading eyebrow="Bugüne kadar" title="Genç bir takım, uzun bir yol." /></Reveal>
        <div className="mt-14 border-l border-white/15 pl-7">
          {[["2023","MSKÜ Racing, bir grup mühendislik öğrencisinin girişimiyle kuruldu."],["2024","İlk araç konsepti ve takım organizasyonu şekillendi."],["2025","Üretim kabiliyetleri geliştirildi ve ilk yürüyen şasi tamamlandı."],["2026","MR-26, iddialı elektrikli mimarisiyle geliştirme sürecine girdi."]].map(([year, text]) => <Reveal key={year} className="relative mb-12 grid gap-3 md:grid-cols-[160px_1fr]"><span className="absolute -left-[33px] top-2 size-3 rounded-full border-2 border-accent bg-background" /><strong className="font-display text-3xl text-accent">{year}</strong><p className="max-w-2xl text-lg leading-8 text-white/55">{text}</p></Reveal>)}
        </div>
      </div></section>
    </>
  );
}
