"use client";

import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { VehicleTelemetry } from "@/components/vehicle-telemetry";

const specs = [
  ["Güç ünitesi", "Powertrain", "Elektrikli, arkadan itiş", "Electric, rear-wheel drive"],
  ["Tepe güç", "Peak power", "80 kW", "80 kW"],
  ["Hedef kütle", "Target mass", "215 kg", "215 kg"],
  ["Batarya", "Battery", "Yüksek gerilim Li-ion", "High-voltage Li-ion"],
  ["Şasi", "Chassis", "Çelik uzay kafes", "Steel space frame"],
  ["Gövde", "Bodywork", "Karbon fiber kompozit", "Carbon-fiber composite"],
  ["Hızlanma", "Acceleration", "0–100 km/sa: 3,8 sn", "0–100 km/h: 3.8 s"],
  ["Kontrol", "Control", "Özel ECU ve telemetri", "Custom ECU and telemetry"],
];

export default function CarPage() {
  const { language, translate } = useLanguage();

  return (
    <>
      <PageHero eyebrow="Akyaka" title={translate("Sürücü etrafında tasarlandı", "Designed around the driver")} description={translate("Kompakt, elektrikli ve her alt sistemi dikkatle geliştirilen Formula Student aracımız.", "Our compact electric Formula Student car, with every subsystem carefully developed.")} />
      <section className="theme-fixed-dark relative min-h-[600px] overflow-hidden border-b border-white/10">
        <Image src="/images/msku-racing-car-covered.png" alt={translate("Kırık beyaz örtüyle kapatılmış MSKU RACING Akyaka prototipi", "MSKU RACING Akyaka prototype covered with an ivory cloth")} fill sizes="100vw" className="parallax-media scale-110 object-cover object-[68%_center] opacity-80 saturate-[.85]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
        <div className="container-shell relative flex min-h-[600px] items-center"><Reveal><p className="max-w-2xl font-display text-4xl font-medium uppercase leading-tight tracking-[-.04em] md:text-6xl">{translate("Daha az kütle", "Less mass")}<br /><span className="text-burgundy">{translate("Daha fazla geri bildirim", "More feedback")}</span><br />{translate("Net sonuçlar", "Clear results")}</p></Reveal></div>
      </section>
      <section className="section-space border-b border-white/10">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow={translate("Canlı sistemler", "Live Systems")}
              title={translate("Akyaka'yı verilerle izle", "Follow Akyaka through data")}
              copy={translate("Araç telemetrisi devreye alındığında hız, batarya, sıcaklık ve tur verileri bu alanda görüntülenecek.", "When vehicle telemetry goes live, speed, battery, temperature and lap data will appear here.")}
            />
          </Reveal>
          <Reveal delay={.08} className="mt-12">
            <VehicleTelemetry />
          </Reveal>
        </div>
      </section>
      <section className="section-space"><div className="container-shell">
        <Reveal><SectionHeading eyebrow={translate("Teknik genel bakış", "Technical Overview")} title={translate("Ölçülebilir mühendislik", "Measurable engineering")} copy={translate("Akyaka'nın güncel geliştirme hedefleri. Nihai değerler doğrulama çalışmalarıyla gelişecektir.", "Akyaka's current development targets. Final values will evolve through validation work.")} /></Reveal>
        <div className="mt-12 grid border-t border-white/10 md:grid-cols-2">
          {specs.map(([trLabel, enLabel, trValue, enValue], i) => <Reveal key={trLabel} delay={(i % 2) * .04} className="group flex items-center justify-between gap-5 border-b border-white/10 px-3 py-6 transition hover:bg-white/[.025] md:odd:pr-8 md:even:border-l md:even:pl-8"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/35 transition group-hover:text-burgundy">{language === "tr" ? trLabel : enLabel}</span><strong className="text-right font-display text-lg font-medium">{language === "tr" ? trValue : enValue}</strong></Reveal>)}
        </div>
      </div></section>
      <section className="border-y border-white/10 bg-navy/30"><div className="container-shell grid gap-14 py-20 lg:grid-cols-3">
        {[
          ["01", translate("Tasarım ve Simülasyon", "Design and Simulation"), translate("Araç geometrisini, yapısal dayanımı ve sistem performansını üretim öncesinde mühendislik hesapları ve simülasyonlarla doğruluyoruz.", "We validate vehicle geometry, structural strength and system performance through engineering calculations and simulations before manufacturing.")],
          ["02", translate("Üretim ve Entegrasyon", "Manufacturing and Integration"), translate("Tasarlanan mekanik ve elektronik bileşenleri üretiyor, tüm alt sistemleri araç üzerinde güvenli ve uyumlu biçimde bir araya getiriyoruz.", "We manufacture the designed mechanical and electronic components and integrate every subsystem safely and coherently on the vehicle.")],
          ["03", translate("Test ve Doğrulama", "Testing and Validation"), translate("Aracı statik ve dinamik testlerden geçiriyor, elde edilen verilerle güvenilirliği ve performansı sürekli geliştiriyoruz.", "We conduct static and dynamic tests, continuously improving reliability and performance with the data collected.")],
        ].map(([num,title,copy],i)=><Reveal key={num} delay={i*.08}><span className="font-display text-5xl text-accent">{num}</span><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{title}</h3><p className="mt-4 leading-7 text-white/45">{copy}</p></Reveal>)}
      </div></section>
    </>
  );
}
