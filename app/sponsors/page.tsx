import Link from "next/link";
import { ArrowRight, Gem, Handshake, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sponsorTiers = [
  {
    name: "Elmas Sponsorlar",
    description: "Takımımızın ana stratejik destekçileri.",
    marker: "ELMAS",
  },
  {
    name: "Altın Sponsorlar",
    description: "Araç geliştirme sürecimizin güçlü iş ortakları.",
    marker: "ALTIN",
  },
  {
    name: "Gümüş Sponsorlar",
    description: "Üretim ve organizasyon süreçlerimize katkı sağlayan destekçiler.",
    marker: "GÜMÜŞ",
  },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="İş ortaklarımız"
        title="İlerlemek bir takım işidir."
        description="Sponsorlarımız, öğrenci hedeflerini gerçek üretim, test ve yarışma deneyimine dönüştürmemize destek olur."
      />

      <section className="section-space">
        <div className="container-shell space-y-16">
          {sponsorTiers.map((tier, tierIndex) => (
            <Reveal key={tier.name} delay={tierIndex * .06}>
              <div className="grid gap-7 lg:grid-cols-[.45fr_1.55fr] lg:items-start">
                <div className="border-l-2 border-burgundy pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">Seviye 0{tierIndex + 1}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold uppercase">{tier.name}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">{tier.description}</p>
                </div>
                <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                  {[1, 2].map((slot) => (
                    <div key={slot} className="grid min-h-48 place-items-center bg-[#0D1425] p-6 text-center">
                      <div>
                        <Gem className="mx-auto text-university" size={23} />
                        <p className="mt-5 text-[11px] font-bold uppercase tracking-[.2em] text-white/35">
                          {tier.marker} SPONSOR {String(slot).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-[9px] uppercase tracking-[.18em] text-white/20">Logo alanı</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.02]">
        <div className="container-shell grid gap-4 py-20 md:grid-cols-3">
          {[
            [Rocket, "Mühendisliğe erişim", "Geleceğin mühendisleri ve görünürlüğü yüksek bir teknoloji platformuyla buluşun."],
            [Gem, "Marka görünürlüğü", "Araçta, takım kıyafetlerinde, etkinliklerde ve yarışma iletişiminde yer alın."],
            [Handshake, "Gerçek iş birliği", "Malzeme, uzmanlık, yazılım veya üretim desteğiyle belirli sistemlere katkı sağlayın."],
          ].map(([Icon, title, copy], i) => (
            <Reveal key={String(title)} delay={i * .08}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <Icon className="text-burgundy" />
                  <h3 className="mt-8 font-display text-2xl font-semibold uppercase">{String(title)}</h3>
                  <p className="mt-4 leading-7 text-white/45">{String(copy)}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell text-center">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-display text-5xl font-semibold uppercase leading-[.95] tracking-[-.05em] md:text-7xl">
              Gelecek neslin arkasında yer alın.
            </h2>
            <p className="mx-auto mt-7 max-w-xl leading-8 text-white/50">Hedeflediğiniz etkiyi birlikte oluşturacak bir iş birliği tasarlayalım.</p>
            <Button asChild size="lg" className="mt-8"><Link href="/contact">İş ortağımız olun <ArrowRight size={16} /></Link></Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
