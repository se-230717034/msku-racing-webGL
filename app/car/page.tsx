import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";

const specs = [["Güç ünitesi","Elektrikli, arkadan itiş"],["Tepe güç","80 kW"],["Hedef kütle","215 kg"],["Batarya","Yüksek gerilim Li-ion"],["Şasi","Çelik uzay kafes"],["Gövde","Karbon fiber kompozit"],["Hızlanma","0–100 km/sa: 3,8 sn"],["Kontrol","Özel ECU ve telemetri"]];

export default function CarPage() {
  return (
    <>
      <PageHero eyebrow="Amper" title="Sürücü etrafında tasarlandı." description="Kompakt, elektrikli ve her alt sistemi dikkatle geliştirilen Formula Student aracımız." />
      <section className="relative min-h-[600px] overflow-hidden border-b border-white/10">
        <Image src="/images/msku-racing-hero.png" alt="MSKÜ Racing Amper prototipi" fill sizes="100vw" className="object-cover object-[68%_center] opacity-45 saturate-[.7]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
        <div className="container-shell relative flex min-h-[600px] items-center"><Reveal><p className="max-w-2xl font-display text-4xl font-medium uppercase leading-tight tracking-[-.04em] md:text-6xl">Daha az kütle.<br /><span className="text-burgundy">Daha fazla geri bildirim.</span><br />Net sonuçlar.</p></Reveal></div>
      </section>
      <section className="section-space"><div className="container-shell">
        <Reveal><SectionHeading eyebrow="Teknik genel bakış" title="Ölçülebilir mühendislik." copy="Amper'in güncel geliştirme hedefleri. Nihai değerler doğrulama çalışmalarıyla gelişecektir." /></Reveal>
        <div className="mt-12 grid border-t border-white/10 md:grid-cols-2">
          {specs.map(([label, value], i) => <Reveal key={label} delay={(i % 2) * .04} className="flex items-center justify-between gap-5 border-b border-white/10 py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/35">{label}</span><strong className="text-right font-display text-lg font-medium">{value}</strong></Reveal>)}
        </div>
      </div></section>
      <section className="border-y border-white/10 bg-navy/30"><div className="container-shell grid gap-14 py-20 lg:grid-cols-3">
        {[["01","Simülasyon","Malzemeye geçmeden önce tüm kritik davranışları modelle."],["02","Üretim","Süreci ve öğrenmeyi sahiplenmek için mümkün olduğunca takım içinde üret."],["03","Doğrulama","Sezgi ile veri örtüşene kadar test et, ölç ve geliştir."]].map(([num,title,copy],i)=><Reveal key={num} delay={i*.08}><span className="font-display text-5xl text-accent">{num}</span><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{title}</h3><p className="mt-4 leading-7 text-white/45">{copy}</p></Reveal>)}
      </div></section>
    </>
  );
}
