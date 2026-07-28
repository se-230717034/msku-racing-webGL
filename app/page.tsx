import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Code2,
  Cpu,
  Radio,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";

const departments = [
  { title: "Mekanik Ekip", copy: "Şasi, süspansiyon, aktarma ve üretim süreçleri.", icon: Wrench },
  { title: "Elektronik Ekip", copy: "Araç elektroniği, kablolama ve kontrol sistemleri.", icon: Cpu },
  { title: "Yazılım Ekibi", copy: "Gömülü yazılım, telemetri ve veri analizi.", icon: Code2 },
  { title: "Organizasyon Ekibi", copy: "Etkinlik, iletişim, sponsorluk ve takım yönetimi.", icon: CalendarDays },
];

const targets = [
  ["01", "Aracı tamamlamak", "Amper'i üretimden dinamik testlere taşımak."],
  ["02", "Veriyle geliştirmek", "Her test turunu ölçülebilir mühendislik kazanımına dönüştürmek."],
  ["03", "Yarışmaya hazırlanmak", "Teknik kontrollerden dayanıklılık etabına kadar eksiksiz hazırlanmak."],
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[780px] overflow-hidden border-b border-white/10 pt-[140px] xl:min-h-screen xl:pt-[76px]">
        <div className="absolute inset-0 bg-grid-dark bg-[size:64px_64px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
        <div className="absolute left-0 top-[22%] h-px w-[42%] bg-university/70" />
        <div className="absolute left-[38%] top-[22%] h-px w-16 bg-burgundy" />
        <div className="absolute bottom-[18%] right-0 h-px w-[28%] bg-green/70" />

        <div className="container-shell relative grid min-h-[calc(100vh-140px)] items-center gap-14 py-16 lg:grid-cols-[.9fr_1.1fr] xl:min-h-[calc(100vh-76px)] xl:py-20">
          <Reveal className="relative z-10">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2 w-2 bg-green" />
              <p className="text-[11px] font-bold uppercase tracking-[.24em] text-white/55">Muğla Sıtkı Koçman Üniversitesi</p>
            </div>
            <h1 className="font-display text-[clamp(4rem,9vw,8.75rem)] font-semibold uppercase leading-[.82] tracking-[-.075em]">
              MSKU
              <span className="block text-burgundy">RACING</span>
            </h1>
            <p className="mt-8 font-display text-2xl font-medium tracking-[-.025em] text-[#F5F4EF] md:text-3xl">
              Geleceğin Arabasını Tasarlıyoruz.
            </p>
            <p className="mt-4 max-w-xl leading-7 text-white/55">
              Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/car">Aracı Keşfet <ArrowRight size={16} /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link href="/sponsors">Sponsorumuz Ol</Link></Button>
            </div>
          </Reveal>

          <Reveal delay={.08} className="relative">
            <div className="absolute -left-5 top-10 h-[72%] w-1 bg-university" />
            <div className="absolute -left-5 top-[82%] h-10 w-1 bg-burgundy" />
            <div className="theme-fixed-dark carbon-subtle relative min-h-[390px] overflow-hidden border border-white/15 bg-[#0B1222] md:min-h-[540px]">
              <div className="absolute inset-5 border border-university/35" />
              <div className="absolute right-5 top-5 h-px w-1/3 bg-burgundy" />
              <div className="absolute bottom-5 left-5 h-px w-1/4 bg-green/70" />
              <div className="relative z-10 flex min-h-[390px] flex-col p-9 md:min-h-[540px] md:p-12">
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <Activity size={18} className="text-burgundy" />
                      <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/45">Canlı Telemetri Sistemi</p>
                    </div>
                    <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.03em]">Amper Araç Verileri</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 border border-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/35">
                    <span className="size-1.5 bg-burgundy" />
                    Bağlantı bekleniyor
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                  {["Araç Hızı", "Batarya", "Motor Sıcaklığı", "Tur Zamanı"].map((label) => (
                    <div key={label} className="min-h-24 bg-[#09101E] p-4 md:min-h-28 md:p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-white/35">{label}</p>
                      <div className="mt-7 h-px w-12 bg-university/55" aria-label={`${label} verisi bekleniyor`} />
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 flex-1 overflow-hidden border border-white/10 bg-[#09101E]">
                  <div className="absolute inset-0 bg-grid-dark bg-[size:32px_32px] opacity-40" />
                  <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
                  <div className="absolute inset-y-5 left-1/3 w-px bg-white/10" />
                  <div className="absolute inset-y-5 left-2/3 w-px bg-white/10" />
                  <div className="relative flex h-full min-h-24 items-center justify-center">
                    <Radio size={18} className="text-green/60" />
                    <p className="ml-3 text-[9px] font-bold uppercase tracking-[.22em] text-white/25">Telemetri akışı bekleniyor</p>
                  </div>
                </div>
              </div>
              <span className="pointer-events-none absolute bottom-8 right-8 font-display text-7xl font-semibold uppercase text-white/[.025]">Amper</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space border-y border-white/10">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Takım Yapısı" title="Dört ekip. Tek hedef." copy="Mekanik, elektronik, yazılım ve organizasyon ekipleri Amper için birlikte çalışır." /></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {departments.map(({ title, copy, icon: Icon }, i) => (
              <Reveal key={title} delay={i * .05} className="h-full">
                <div className="group relative h-full min-h-72 bg-[#0B1222] p-7 transition hover:bg-university/15">
                  <span className="absolute inset-x-0 top-0 h-1 bg-university transition group-hover:bg-burgundy" />
                  <div className="flex items-center justify-between"><Icon className="text-white/55" size={24} /><span className="text-[10px] font-bold tracking-[.2em] text-green">0{i + 1}</span></div>
                  <h3 className="mt-20 font-display text-2xl font-semibold uppercase">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-end"><Link href="/team" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-burgundy">Tüm ekibi gör <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section-space bg-[#0D1425]">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Sezon Hedefleri" title="Her hedef ölçülebilir." /></Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {targets.map(([number, title, copy], i) => (
              <Reveal key={number} delay={i * .07} className="border-t border-white/15 pt-7">
                <div className="flex items-start justify-between"><span className="font-display text-5xl font-semibold text-university">{number}</span><span className="mt-2 h-2 w-2 bg-green" /></div>
                <h3 className="mt-8 font-display text-2xl font-semibold uppercase">{title}</h3>
                <p className="mt-4 max-w-sm leading-7 text-white/45">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#F5F4EF] text-[#080D1A]">
        <div className="container-shell">
          <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.24em] text-burgundy">Sponsorlarımız</p><h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-[-.04em] sm:text-5xl">Mühendisliğe güç verenler.</h2></div>
            <Link href="/sponsors" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-university">İş birliği seçenekleri <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px border border-[#080D1A]/15 bg-[#080D1A]/15 md:grid-cols-3">
            {["Elmas Sponsor 01", "Elmas Sponsor 02", "Altın Sponsor 01", "Altın Sponsor 02", "Gümüş Sponsor 01", "Gümüş Sponsor 02"].map((label) => (
              <div key={label} className="grid min-h-36 place-items-center bg-[#F5F4EF] p-5 text-center"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#080D1A]/30">{label}<small className="mt-2 block font-normal tracking-[.1em]">Logo alanı</small></span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Son Gelişmeler" title="Garajdan haberler." /></Reveal>
          <Reveal className="mt-12 border-y border-white/15 py-10">
            <Link href="/news" className="group flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">Hazırlanıyor</p>
                <h3 className="mt-3 font-display text-3xl font-semibold uppercase">Haberler çok yakında.</h3>
                <p className="mt-3 text-sm leading-7 text-white/45">Takımımızın gerçek gelişmelerini yakında paylaşacağız.</p>
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
            <div className="flex items-center gap-3"><CalendarDays size={16} className="text-green" /><p className="text-xs font-bold uppercase tracking-[.22em] text-white/65">Birlikte daha ileri</p></div>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[-.04em] md:text-5xl">MSKU RACING ile iletişime geçin.</h2>
          </div>
          <Button asChild className="shrink-0 bg-burgundy hover:bg-[#B51237]"><Link href="/contact">Bize Ulaşın <ArrowRight size={16} /></Link></Button>
        </div>
      </section>
    </>
  );
}
