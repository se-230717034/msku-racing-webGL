import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";

const groups = [
  ["Araç Dinamiği", "Süspansiyon, direksiyon, lastikler ve mekanik yol tutuş.", "AD"],
  ["Güç Aktarma", "Elektrikli tahrik, soğutma, kontrol ve enerji sistemleri.", "GA"],
  ["Aerodinamik", "Her newtonu verimli kullanan CFD odaklı gövde tasarımı.", "AERO"],
  ["Şasi ve Kompozit", "Rijitlik, güvenlik ve servis kolaylığı için hafif yapılar.", "ŞK"],
  ["Elektronik", "Araç kontrolü, telemetri, gömülü sistemler ve kablolama.", "EL"],
  ["İş Geliştirme ve Medya", "İş birlikleri, finans, marka, etkinlik ve takım iletişimi.", "İM"]
];

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Takımımız" title="Farklı disiplinler. Ortak hedef." description="Araç bizim ortak dilimiz. Altı uzman departman, aynı hedef için birlikte çalışıyor." />
      <section className="section-space"><div className="container-shell grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, copy, mark], i) => <Reveal key={title} delay={i * .05}><Card className="group h-full overflow-hidden transition hover:border-accent/40"><CardContent className="relative min-h-72 p-8"><span className="absolute right-5 top-3 font-display text-6xl font-bold text-white/[.035] transition group-hover:text-accent/[.09]">{mark}</span><span className="text-xs font-bold uppercase tracking-[.2em] text-accent">0{i + 1}</span><h2 className="mt-20 font-display text-3xl font-semibold uppercase tracking-[-.03em]">{title}</h2><p className="mt-4 leading-7 text-white/45">{copy}</p></CardContent></Card></Reveal>)}
      </div></section>
      <section className="border-y border-white/10 bg-university/10"><div className="container-shell py-20 text-center"><Reveal><p className="eyebrow">Her sezon büyüyen ekip</p><p className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold uppercase leading-tight tracking-[-.04em] md:text-6xl">Merak, başlangıç için yeterli.</p><a href="/join" className="mt-8 inline-flex rounded-sm bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-[.18em]">Takıma katıl</a></Reveal></div></section>
    </>
  );
}
