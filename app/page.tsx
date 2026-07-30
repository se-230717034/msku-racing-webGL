"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  Cpu,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion-reveal";
import { RaceCountdown } from "@/components/race-countdown";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { GamePreview } from "@/components/game-preview";

const departments = [
  { trTitle: "Mekanik Ekip", enTitle: "Mechanical Team", trCopy: "Şasi, süspansiyon, aktarma ve üretim süreçleri.", enCopy: "Chassis, suspension, drivetrain and manufacturing processes.", icon: Wrench },
  { trTitle: "Elektronik Ekip", enTitle: "Electronics Team", trCopy: "Araç elektroniği, kablolama ve kontrol sistemleri.", enCopy: "Vehicle electronics, wiring and control systems.", icon: Cpu },
  { trTitle: "Yazılım Ekibi", enTitle: "Software Team", trCopy: "Gömülü yazılım, telemetri ve veri analizi.", enCopy: "Embedded software, telemetry and data analysis.", icon: Code2 },
  { trTitle: "Organizasyon Ekibi", enTitle: "Organization Team", trCopy: "Etkinlik, iletişim, sponsorluk ve takım yönetimi.", enCopy: "Events, communications, sponsorship and team management.", icon: CalendarDays },
];

const targets = [
  {
    number: "01",
    trTitle: "Tasarımı doğrulamak",
    enTitle: "Validate the design",
    trCopy: "Araç mimarisini, alt sistem tasarımlarını ve kritik mühendislik hesaplarını üretim öncesinde tamamlamak ve doğrulamak.",
    enCopy: "Complete and validate the vehicle architecture, subsystem designs and critical engineering calculations before manufacturing.",
    trSubtitle: "Tasarım • Simülasyon • Teknik Doğrulama",
    enSubtitle: "Design • Simulation • Technical Validation",
  },
  {
    number: "02",
    trTitle: "Üretim sürecini tamamlamak",
    enTitle: "Complete manufacturing",
    trCopy: "Şasi, süspansiyon, direksiyon, fren, elektronik ve diğer araç bileşenlerini teknik gereksinimlere uygun şekilde üretmek.",
    enCopy: "Manufacture the chassis, suspension, steering, brakes, electronics and other vehicle components in line with technical requirements.",
    trSubtitle: "Üretim • Kalite Kontrol • Tedarik",
    enSubtitle: "Manufacturing • Quality Control • Supply",
  },
  {
    number: "03",
    trTitle: "Sistem entegrasyonunu sağlamak",
    enTitle: "Integrate the systems",
    trCopy: "Mekanik, elektronik ve yazılım sistemlerini araç üzerinde bir araya getirerek güvenli ve uyumlu şekilde çalışmasını sağlamak.",
    enCopy: "Bring the mechanical, electronic and software systems together on the vehicle so they operate safely and in harmony.",
    trSubtitle: "Montaj • Entegrasyon • Devreye Alma",
    enSubtitle: "Assembly • Integration • Commissioning",
  },
  {
    number: "04",
    trTitle: "Test ve doğrulama yapmak",
    enTitle: "Test and validate",
    trCopy: "Aracı statik, dinamik ve dayanıklılık testlerinden geçirerek güvenlik ve performans hedeflerini doğrulamak.",
    enCopy: "Validate safety and performance targets through static, dynamic and endurance testing.",
    trSubtitle: "Güvenlik • Dayanıklılık • Performans",
    enSubtitle: "Safety • Durability • Performance",
  },
  {
    number: "05",
    trTitle: "Veriyle geliştirmek",
    enTitle: "Develop with data",
    trCopy: "Testlerden elde edilen verileri analiz ederek araç ayarlarını, sistem verimliliğini ve sürüş karakterini geliştirmek.",
    enCopy: "Analyze test data to improve vehicle setup, system efficiency and driving characteristics.",
    trSubtitle: "Veri Toplama • Analiz • Optimizasyon",
    enSubtitle: "Data Collection • Analysis • Optimization",
  },
  {
    number: "06",
    trTitle: "Yarışa hazırlanmak",
    enTitle: "Prepare for competition",
    trCopy: "Teknik kontroller, statik etkinlikler ve dinamik yarışlar için aracı, sürücüyü ve takım operasyonlarını eksiksiz hazırlamak.",
    enCopy: "Prepare the vehicle, driver and team operations thoroughly for technical inspection, static events and dynamic competition.",
    trSubtitle: "Teknik Kontrol • Strateji • Yarış Operasyonu",
    enSubtitle: "Technical Inspection • Strategy • Race Operations",
  },
];

export default function Home() {
  const { language, translate } = useLanguage();

  return (
    <>
      <section className="home-hero theme-fixed-dark relative min-h-[100svh] overflow-hidden border-b border-white/10 bg-[#050913] pt-[72px] xl:pt-[76px]">
        <Image
          src="/images/msku-racing-hero.png"
          alt={translate("Gece pit alanında MSKU RACING Formula Student aracı", "MSKU RACING Formula Student car in a night-time pit lane")}
          fill
          sizes="100vw"
          className="hero-media object-cover object-[68%_center]"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,13,.98)_0%,rgba(3,6,13,.86)_34%,rgba(3,6,13,.22)_72%,rgba(3,6,13,.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,6,13,.96)_0%,transparent_42%)]" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:72px_72px] opacity-25 [mask-image:linear-gradient(to_right,black,transparent_72%)]" />
        <div className="absolute -left-28 top-[12%] size-[440px] rounded-full border border-white/10 md:size-[620px]" />
        <div className="absolute -left-10 top-[22%] size-[280px] rounded-full border border-burgundy/35 md:size-[420px]" />

        <div className="container-shell relative grid min-h-[calc(100svh-72px)] items-end gap-10 pb-9 pt-16 lg:grid-cols-[1fr_390px] lg:pb-10 xl:min-h-[calc(100svh-76px)]">
          <div className="relative z-10 pb-5 lg:pb-10">
            <div className="hero-kicker mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-burgundy" />
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-white/60">{translate("Muğla Sıtkı Koçman Üniversitesi", "Muğla Sıtkı Koçman University")}</p>
            </div>
            <h1 className="hero-title max-w-[900px] font-display text-[clamp(4.4rem,10.8vw,10.5rem)] font-semibold uppercase leading-[.76] tracking-[-.085em]">
              MSKU
              <span className="block text-burgundy">RACING</span>
            </h1>
            <div className="hero-actions mt-9 max-w-2xl border-l border-burgundy pl-5 md:pl-7">
              <p className="font-display text-xl font-medium uppercase tracking-[-.02em] text-white md:text-3xl">
                {translate("Geleceğin Arabasını Tasarlıyoruz.", "Designing the Car of the Future.")}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/55 md:text-base">
                {translate("Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı", "Muğla Sıtkı Koçman University Formula Student Team")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/car">{translate("Aracı Keşfet", "Explore the Car")} <ArrowRight size={16} /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/sponsors">{translate("Sponsorumuz Ol", "Become a Sponsor")}</Link></Button>
              </div>
            </div>
          </div>

          <Reveal delay={.32} className="hero-preview relative z-10">
            <GamePreview />
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-[42%] bg-university" />
        <div className="absolute bottom-0 left-[42%] h-1 w-[12%] bg-burgundy" />
      </section>

      <RaceCountdown />

      <section className="section-space border-y border-white/10">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow={translate("Takım Yapısı", "Team Structure")} title={translate("Dört ekip. Tek hedef.", "Four teams. One goal.")} copy={translate("Mekanik, elektronik, yazılım ve organizasyon ekipleri Amper için birlikte çalışır.", "Mechanical, electronics, software and organization teams work together for Amper.")} /></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {departments.map(({ trTitle, enTitle, trCopy, enCopy, icon: Icon }, i) => (
              <Reveal key={trTitle} delay={i * .05} className="h-full">
                <div className="premium-card group relative h-full min-h-72 bg-[#0B1222] p-7 transition hover:bg-university/15">
                  <span className="absolute inset-x-0 top-0 h-1 bg-university transition group-hover:bg-burgundy" />
                  <div className="flex items-center justify-between"><Icon className="text-white/55" size={24} /><span className="text-[10px] font-bold tracking-[.2em] text-green">0{i + 1}</span></div>
                  <h3 className="mt-20 font-display text-2xl font-semibold uppercase">{language === "tr" ? trTitle : enTitle}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">{language === "tr" ? trCopy : enCopy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-end"><Link href="/team" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-burgundy">{translate("Tüm ekibi gör", "Meet the full team")} <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section-space bg-[#0D1425]">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow={translate("Sezon Hedefleri", "Season Goals")} title={translate("Her hedef ölçülebilir.", "Every goal is measurable.")} /></Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {targets.map(({ number, trTitle, enTitle, trCopy, enCopy, trSubtitle, enSubtitle }, i) => (
              <Reveal key={number} delay={(i % 3) * .07} className="premium-card flex h-full flex-col border border-white/10 bg-[#0A1020]/55 p-7">
                <div className="flex items-start justify-between"><span className="font-display text-5xl font-semibold text-university">{number}</span><span className="mt-2 h-2 w-2 bg-green" /></div>
                <h3 className="mt-8 font-display text-2xl font-semibold uppercase">{language === "tr" ? trTitle : enTitle}</h3>
                <p className="mt-4 max-w-sm leading-7 text-white/45">{language === "tr" ? trCopy : enCopy}</p>
                <p className="mt-7 border-l-2 border-burgundy pl-4 text-[11px] font-bold uppercase leading-5 tracking-[.14em] text-white/60">{language === "tr" ? trSubtitle : enSubtitle}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#F5F4EF] text-[#080D1A]">
        <div className="container-shell">
          <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.24em] text-burgundy">{translate("Sponsorlarımız", "Our Sponsors")}</p><h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-[-.04em] sm:text-5xl">{translate("Mühendisliğe güç verenler.", "Powering engineering.")}</h2></div>
            <Link href="/sponsors" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-university">{translate("İş birliği seçenekleri", "Partnership options")} <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px border border-[#080D1A]/15 bg-[#080D1A]/15 md:grid-cols-3">
            {[
              translate("Elmas Sponsor 01", "Diamond Sponsor 01"),
              translate("Elmas Sponsor 02", "Diamond Sponsor 02"),
              translate("Altın Sponsor 01", "Gold Sponsor 01"),
              translate("Altın Sponsor 02", "Gold Sponsor 02"),
              translate("Gümüş Sponsor 01", "Silver Sponsor 01"),
              translate("Gümüş Sponsor 02", "Silver Sponsor 02"),
            ].map((label) => (
              <div key={label} className="group grid min-h-36 place-items-center bg-[#F5F4EF] p-5 text-center transition hover:bg-white"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#080D1A]/30 transition group-hover:text-burgundy">{label}<small className="mt-2 block font-normal tracking-[.1em]">{translate("Logo alanı", "Logo area")}</small></span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow={translate("Son Gelişmeler", "Latest Updates")} title={translate("Garajdan haberler.", "News from the garage.")} /></Reveal>
          <Reveal className="mt-12 border-y border-white/15 py-10">
            <Link href="/news" className="group flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">{translate("Hazırlanıyor", "In progress")}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold uppercase">{translate("Haberler çok yakında.", "News coming soon.")}</h3>
                <p className="mt-3 text-sm leading-7 text-white/45">{translate("Takımımızın gerçek gelişmelerini yakında paylaşacağız.", "We will soon share real updates from our team.")}</p>
              </div>
              <ArrowRight className="shrink-0 text-burgundy transition group-hover:translate-x-2" size={22} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="theme-fixed-dark relative overflow-hidden border-t border-white/10 bg-university">
        <div className="absolute bottom-0 right-[14%] h-full w-px rotate-[18deg] bg-white/15" />
        <div className="absolute bottom-0 right-[9%] h-1/2 w-px rotate-[18deg] bg-burgundy" />
        <div className="container-shell relative flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3"><CalendarDays size={16} className="text-green" /><p className="text-xs font-bold uppercase tracking-[.22em] text-white/65">{translate("Birlikte daha ileri", "Further together")}</p></div>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[-.04em] md:text-5xl">{translate("MSKU RACING ile iletişime geçin.", "Get in touch with MSKU RACING.")}</h2>
          </div>
          <Button asChild className="shrink-0 bg-burgundy hover:bg-[#B51237]"><Link href="/contact">{translate("Bize Ulaşın", "Contact Us")} <ArrowRight size={16} /></Link></Button>
        </div>
      </section>
    </>
  );
}
