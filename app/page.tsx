"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Code2, Cpu, Images, Mail, MapPin, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion-reveal";
import { RaceCountdown } from "@/components/race-countdown";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { SponsorMarquee } from "@/components/sponsor-marquee";
import { ContactForm } from "@/components/forms";
import { RaceIntro } from "@/components/race-intro";
import { getMemberProfile, teamGroups } from "@/lib/team-data";

const departments = [
  { trTitle: "Yönetim", enTitle: "Management", trCopy: "Genel koordinasyon, karar süreçleri ve departmanlar arası yönetim.", enCopy: "Overall coordination, decision-making and cross-department management.", icon: BriefcaseBusiness, groupIndex: 0 },
  { trTitle: "Mekanik Ekip", enTitle: "Mechanical Team", trCopy: "Şasi, süspansiyon, aktarma ve üretim süreçleri.", enCopy: "Chassis, suspension, drivetrain and manufacturing processes.", icon: Wrench, groupIndex: 3 },
  { trTitle: "Elektronik Ekip", enTitle: "Electronics Team", trCopy: "Araç elektroniği, kablolama ve kontrol sistemleri.", enCopy: "Vehicle electronics, wiring and control systems.", icon: Cpu, groupIndex: 1 },
  { trTitle: "Yazılım Ekibi", enTitle: "Software Team", trCopy: "Gömülü yazılım, telemetri ve veri analizi.", enCopy: "Embedded software, telemetry and data analysis.", icon: Code2, groupIndex: 2 },
  { trTitle: "Organizasyon Ekibi", enTitle: "Organization Team", trCopy: "Etkinlik, iletişim, sponsorluk ve takım yönetimi.", enCopy: "Events, communications, sponsorship and team management.", icon: CalendarDays, groupIndex: 4 },
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
  const [openTeamIndex, setOpenTeamIndex] = useState<number | null>(null);

  return (
    <>
      <RaceIntro />

      <section id="home" className="home-hero cinematic-hero theme-fixed-dark relative min-h-[100svh] scroll-mt-20 overflow-hidden bg-[#03060d] pt-[72px] xl:pt-[76px]">
        <Image
          src="/images/msku-racing-hero.png"
          alt={translate("Gece pit alanında MSKU RACING Formula Student aracı", "MSKU RACING Formula Student car in a night-time pit lane")}
          fill
          sizes="100vw"
          className="hero-media object-cover object-[67%_center]"
          priority
        />
        <div className="hero-image-wash absolute inset-0" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:72px_72px] opacity-20 [mask-image:linear-gradient(to_right,black,transparent_82%)]" />
        <div className="hero-speed-lines absolute inset-0" aria-hidden="true" />
        <div className="hero-orbit absolute -left-28 top-[18%] size-[360px] rounded-full border border-burgundy/30 md:size-[620px]" />
        <div className="hero-focus-frame" aria-hidden="true" />
        <div className="hero-track-code" aria-hidden="true"><span>48</span><i /></div>

        <div className="container-shell relative min-h-[calc(100svh-72px)] xl:min-h-[calc(100svh-76px)]">
          <div className="hero-kicker absolute left-5 top-10 z-20 flex items-center gap-3 sm:left-8 lg:left-12 lg:top-14">
            <span className="h-px w-12 bg-burgundy" />
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-white/65">{translate("Muğla Sıtkı Koçman Üniversitesi", "Muğla Sıtkı Koçman University")}</p>
          </div>

          <div className="hero-telemetry absolute right-5 top-9 z-20 hidden gap-8 text-right sm:right-8 md:flex lg:right-12 lg:top-14">
            <div><span>01</span><small>{translate("Araç", "Car")}</small><strong>AKYAKA</strong></div>
            <div><span>02</span><small>{translate("Program", "Programme")}</small><strong>FS 2027</strong></div>
            <div><span>03</span><small>{translate("Merkez", "Base")}</small><strong>MUĞLA</strong></div>
          </div>

          <div className="hero-title-stage absolute inset-x-0 bottom-[23%] z-10 lg:bottom-[17%]">
            <h1 className="hero-title font-display text-[clamp(5rem,15.6vw,14rem)] font-semibold uppercase leading-[.68] tracking-[-.095em]">
              <span className="hero-line block overflow-hidden"><span className="block">MSKU</span></span>
              <span className="hero-line hero-line-racing block overflow-hidden text-burgundy"><span className="block">RACING</span></span>
            </h1>
          </div>

          <div className="hero-actions absolute bottom-8 left-5 z-20 max-w-xl border-l border-burgundy pl-5 sm:left-8 lg:bottom-10 lg:left-12">
            <p className="font-display text-xl font-medium uppercase tracking-[-.02em] md:text-2xl">
              {translate("Geleceğin Arabasını Tasarlıyoruz", "Designing the Car of the Future")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="#car">{translate("Aracı Keşfet", "Explore the Car")} <ArrowRight size={16} /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link href="#sponsors">{translate("Sponsorumuz Ol", "Become a Sponsor")}</Link></Button>
            </div>
          </div>

          <div className="hero-scroll-cue absolute bottom-10 right-5 z-20 hidden items-center gap-4 text-[9px] font-bold uppercase tracking-[.22em] text-white/45 lg:flex lg:right-12">
            <span>{translate("Kaydır", "Scroll")}</span><span className="h-px w-20 bg-white/25" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-[42%] bg-university" />
        <div className="absolute bottom-0 left-[42%] h-1 w-[12%] bg-burgundy" />
      </section>

      <RaceCountdown />

      <section id="car" className="vehicle-lab theme-fixed-dark relative scroll-mt-20 overflow-visible bg-[#03060d]">
        <div className="container-shell py-20 md:py-28">
          <div className="mb-14 flex items-center gap-4"><span className="section-index">01</span><span className="h-px flex-1 bg-white/10" /><span className="text-[9px] font-bold uppercase tracking-[.24em] text-white/35">AKYAKA / DEVELOPMENT</span></div>
          <div className="vehicle-lab-grid">
            <div className="vehicle-sticky">
              <span className="vehicle-watermark" aria-hidden="true">AKYAKA</span>
              <div className="vehicle-visual">
                <Image src="/images/msku-racing-car-covered.png" alt={translate("Örtü altındaki MSKU RACING Akyaka Formula Student aracı", "MSKU RACING Akyaka Formula Student car under cover")} fill sizes="(min-width: 1024px) 58vw, 100vw" className="vehicle-media object-cover object-[68%_center]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-[#03060d]/25" />
                <div className="vehicle-scan" />
                <p className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[.22em] text-white/45">{translate("Araç geliştirme programı", "Vehicle development programme")}</p>
              </div>
              <h2 className="vehicle-title font-display text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[.78] tracking-[-.075em]">
                {translate("Fikirden", "From idea")}<span>{translate("piste", "to track")}</span>
              </h2>
            </div>

            <div className="vehicle-stages">
              {targets.slice(0, 4).map(({ number, trTitle, enTitle, trCopy, enCopy, trSubtitle, enSubtitle }) => (
                <article key={number} className="vehicle-stage">
                  <span className="vehicle-stage-number">{number}</span>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-burgundy">{language === "tr" ? trSubtitle : enSubtitle}</p>
                  <h3 className="mt-5 font-display text-4xl font-semibold uppercase leading-[.9] tracking-[-.04em] md:text-5xl">{language === "tr" ? trTitle : enTitle}</h3>
                  <p className="mt-6 max-w-lg text-base leading-8 text-white/50">{language === "tr" ? trCopy : enCopy}</p>
                </article>
              ))}
              <div className="pb-20">
                <Button asChild variant="outline"><Link href="/car">{translate("Akyaka'yı ayrıntılı incele", "Explore Akyaka in detail")} <ArrowRight size={16} /></Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="kinetic-strip theme-fixed-dark" aria-hidden="true">
        <div className="kinetic-track">
          {[0, 1].map((copy) => (
            <div className="kinetic-word" key={copy}>
              {translate("TASARIM", "DESIGN")} <span>•</span> {translate("ÜRETİM", "MANUFACTURING")} <span>•</span> {translate("ENTEGRASYON", "INTEGRATION")} <span>•</span> {translate("TEST", "TESTING")} <span>•</span>
            </div>
          ))}
        </div>
      </div>

      <section id="team" className="team-scene theme-fixed-dark section-space scroll-mt-20 overflow-hidden border-y border-white/10">
        <div className="container-shell">
          <div className="mb-9 flex items-center gap-4"><span className="section-index">02</span><span className="h-px flex-1 bg-white/10" /></div>
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow={translate("Takım Yapısı", "Team Structure")} title={translate("Dört ekip. Tek hedef", "Four teams. One goal")} copy={translate("Mekanik, elektronik, yazılım ve organizasyon ekipleri Akyaka için birlikte çalışır.", "Mechanical, electronics, software and organization teams work together for Akyaka.")} />
              <Link href="/team" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-burgundy">{translate("Tüm ekibi gör", "Meet the full team")} <ArrowRight size={15} /></Link>
            </Reveal>
            <div className="team-disciplines">
              {departments.map(({ trTitle, enTitle, trCopy, enCopy, icon: Icon, groupIndex }, index) => {
                const group = teamGroups[groupIndex];
                return (
                  <Reveal key={trTitle} delay={index * .04} className="team-discipline-motion">
                    <div className={`team-discipline${openTeamIndex === index ? " is-open" : ""}`}>
                      <button
                        type="button"
                        className="team-discipline-summary"
                        aria-expanded={openTeamIndex === index}
                        aria-controls={`team-members-${index}`}
                        onClick={() => setOpenTeamIndex((current) => current === index ? null : index)}
                      >
                        <span className="team-discipline-index">0{index + 1}</span>
                        <Icon className="team-discipline-icon" size={28} />
                        <div>
                          <h3 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold uppercase leading-none tracking-[-.05em]">{language === "tr" ? trTitle : enTitle}</h3>
                          <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">{language === "tr" ? trCopy : enCopy}</p>
                        </div>
                        <div className="team-discipline-meta">
                          <span>{group.members.length.toString().padStart(2, "0")} {translate("üye", "members")}</span>
                          <ArrowRight className="team-discipline-arrow" size={24} />
                        </div>
                      </button>
                      <div id={`team-members-${index}`} className="team-member-panel" aria-hidden={openTeamIndex !== index}>
                        <div>
                          <ul>
                            {group.members.map((member, memberIndex) => {
                              const profileUrl = getMemberProfile(member);
                              const content = (
                                <>
                                  <span>{member}</span>
                                  <small>{String(memberIndex + 1).padStart(2, "0")}</small>
                                  {profileUrl && <ArrowUpRight size={14} />}
                                </>
                              );
                              return <li key={`${group.trName}-${member}`} data-team-member style={{ "--member-order": memberIndex } as CSSProperties}>{profileUrl ? <a href={profileUrl} target="_blank" rel="noreferrer">{content}</a> : <div>{content}</div>}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="goals" className="timeline-scene section-space bg-[#0D1425]">
        <div className="container-shell">
          <div className="mb-9 flex items-center gap-4"><span className="section-index">03</span><span className="h-px flex-1 bg-white/10" /></div>
          <div className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow={translate("Sezon Hedefleri", "Season Goals")} title={translate("Her hedef ölçülebilir", "Every goal is measurable")} /></Reveal>
            <div className="season-timeline">
              <div className="timeline-progress" aria-hidden="true" />
              {targets.map(({ number, trTitle, enTitle, trCopy, enCopy, trSubtitle, enSubtitle }) => (
                <article key={number} className="timeline-step">
                  <span className="timeline-dot" />
                  <span className="timeline-number">{number}</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-green">{language === "tr" ? trSubtitle : enSubtitle}</p>
                    <h3 className="mt-4 font-display text-3xl font-semibold uppercase leading-[.95] tracking-[-.035em] md:text-4xl">{language === "tr" ? trTitle : enTitle}</h3>
                    <p className="mt-5 max-w-xl leading-7 text-white/45">{language === "tr" ? trCopy : enCopy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sponsors" className="sponsor-scene theme-fixed-dark section-space scroll-mt-20 overflow-hidden bg-[#080D1A] text-[#F5F4EF]">
        <div className="container-shell">
          <div className="mb-12 flex items-center gap-4"><span className="section-index">04</span><span className="h-px flex-1 bg-white/10" /></div>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-burgundy">{translate("Sponsorlarımız", "Our Sponsors")}</p>
            <h2 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] font-semibold uppercase leading-[.82] tracking-[-.065em]">{translate("Mühendisliğe", "Powering")}<span className="block text-university">{translate("güç verenler", "engineering")}</span></h2>
            <p className="mx-auto mt-7 max-w-2xl leading-8 text-white/55">{translate("MSKU RACING'in mühendislik yolculuğuna güç veren iş birlikleri için ayrılmış alan.", "A space for partnerships that power the MSKU RACING engineering journey.")}</p>
            <Link href="/sponsors" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-burgundy">{translate("İş birliği seçenekleri", "Partnership options")} <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="relative left-1/2 mt-16 w-screen -translate-x-1/2"><SponsorMarquee /></div>
        </div>
      </section>

      <section id="news" className="news-scene section-space scroll-mt-20">
        <div className="container-shell">
          <div className="mb-9 flex items-center gap-4"><span className="section-index">05</span><span className="h-px flex-1 bg-white/10" /></div>
          <Reveal><SectionHeading eyebrow={translate("Son Gelişmeler", "Latest Updates")} title={translate("Garajdan haberler", "News from the garage")} /></Reveal>
          <Reveal className="mt-12">
            <Link href="/news" className="news-editorial group">
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-green">{translate("Hazırlanıyor", "In progress")}</span>
              <h3 className="font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold uppercase leading-[.84] tracking-[-.055em]">{translate("Haberler çok yakında.", "News coming soon.")}</h3>
              <p className="max-w-lg text-sm leading-7 text-white/45">{translate("Takımımızın gerçek gelişmelerini yakında paylaşacağız.", "We will soon share real updates from our team.")}</p>
              <ArrowRight className="text-burgundy transition group-hover:translate-x-3" size={28} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="gallery-scene theme-fixed-dark section-space scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#0D1425]">
        <div className="container-shell">
          <div className="mb-9 flex items-center gap-4"><span className="section-index">06</span><span className="h-px flex-1 bg-white/10" /></div>
          <Reveal><SectionHeading eyebrow={translate("Galeri", "Gallery")} title={translate("Atölyeden piste", "From workshop to track")} copy={translate("Gerçek takım ve araç fotoğraflarımız eklendikçe bu akışta yayınlanacak.", "Real team and vehicle photos will appear in this flow as they are added.")} /></Reveal>
          <div className="editorial-gallery mt-14">
            <Reveal className="gallery-panel gallery-panel-main">
              <Image src="/images/msku-racing-hero.png" alt={translate("MSKU RACING Formula Student aracı", "MSKU RACING Formula Student car")} fill sizes="(min-width: 1024px) 68vw, 100vw" className="gallery-media object-cover" />
              <div className="gallery-shade" />
              <div className="gallery-caption"><Images size={20} className="text-burgundy" /><p>{translate("Araç geliştirme", "Vehicle development")}</p></div>
            </Reveal>
            <Reveal delay={.08} className="gallery-panel gallery-panel-side">
              <Image src="/images/msku-racing-car-covered.png" alt={translate("Örtü altındaki Akyaka aracı", "Akyaka car under cover")} fill sizes="(min-width: 1024px) 32vw, 100vw" className="gallery-media object-cover" />
              <div className="gallery-shade" />
              <div className="gallery-caption"><p>AKYAKA / 48</p></div>
            </Reveal>
            <Reveal delay={.12} className="gallery-editorial-copy">
              <span>MSKU RACING</span>
              <strong>{translate("Her parça bir karar. Her tur yeni bir veri", "Every part is a decision. Every lap brings new data")}</strong>
              <Link href="/gallery">{translate("Galeriyi görüntüle", "View gallery")} <ArrowRight size={15} /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="section-space theme-fixed-dark scroll-mt-20 border-t border-white/10 bg-[#050913]">
        <div className="container-shell">
          <div className="mb-9 flex items-center gap-4"><span className="section-index">07</span><span className="h-px flex-1 bg-white/10" /></div>
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">{translate("İletişim", "Contact")}</p>
              <h2 className="mt-5 font-display text-4xl font-semibold uppercase leading-[.92] tracking-[-.04em] sm:text-5xl">{translate("Bir konuşma başlatalım", "Let's start a conversation")}</h2>
              <div className="mt-9 space-y-7">
                <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-burgundy" size={20} /><p className="text-sm leading-7 text-white/55">Muğla Sıtkı Koçman Üniversitesi<br />{translate("Mühendislik Fakültesi, Kötekli Yerleşkesi", "Faculty of Engineering, Kötekli Campus")}</p></div>
                <div className="flex gap-4"><Mail className="mt-1 shrink-0 text-burgundy" size={20} /><div className="space-y-2 text-sm"><a className="block text-white/55 hover:text-white" href="mailto:mskuracing@gmail.com">mskuracing@gmail.com</a><a className="block text-white/55 hover:text-white" href="mailto:mskuracingtopluluk@gmail.com">mskuracingtopluluk@gmail.com</a></div></div>
              </div>
            </Reveal>
            <Reveal delay={.08} className="contact-form-stage border-l border-white/10 pl-0 lg:pl-10"><ContactForm /></Reveal>
          </div>
        </div>
      </section>

      <section className="theme-fixed-dark relative overflow-hidden border-t border-white/10 bg-university">
        <div className="absolute bottom-0 right-[14%] h-full w-px rotate-[18deg] bg-white/15" />
        <div className="absolute bottom-0 right-[9%] h-1/2 w-px rotate-[18deg] bg-burgundy" />
        <div className="container-shell relative flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3"><CalendarDays size={16} className="text-green" /><p className="text-xs font-bold uppercase tracking-[.22em] text-white/65">{translate("Birlikte daha ileri", "Further together")}</p></div>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[-.04em] md:text-5xl">{translate("MSKU RACING ile iletişime geçin", "Get in touch with MSKU RACING")}</h2>
          </div>
          <Button asChild className="shrink-0 bg-burgundy hover:bg-[#B51237]"><Link href="#contact">{translate("Bize Ulaşın", "Contact Us")} <ArrowRight size={16} /></Link></Button>
        </div>
      </section>
    </>
  );
}
