"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem, Handshake, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

const sponsorTiers = [
  {
    trName: "Elmas Sponsorlar",
    enName: "Diamond Sponsors",
    trDescription: "Takımımızın ana stratejik destekçileri.",
    enDescription: "The primary strategic supporters of our team.",
    trMarker: "ELMAS",
    enMarker: "DIAMOND",
    slots: 2,
    icon: Gem,
  },
  {
    trName: "Altın Sponsorlar",
    enName: "Gold Sponsors",
    trDescription: "Araç geliştirme sürecimizin güçlü iş ortakları.",
    enDescription: "Strong partners in our vehicle development process.",
    trMarker: "ALTIN",
    enMarker: "GOLD",
    slots: 2,
    icon: Gem,
  },
  {
    trName: "Gümüş Sponsorlar",
    enName: "Silver Sponsors",
    trDescription: "Üretim ve organizasyon süreçlerimize katkı sağlayan destekçiler.",
    enDescription: "Supporters contributing to our manufacturing and organization processes.",
    trMarker: "GÜMÜŞ",
    enMarker: "SILVER",
    slots: 2,
    icon: Gem,
  },
  {
    trName: "Destekçiler",
    enName: "Supporters",
    trDescription: "Takımımızın gelişimine ürün, hizmet ve uzmanlıklarıyla katkı sağlayan destekçiler.",
    enDescription: "Supporters contributing products, services and expertise to our team's development.",
    trMarker: "DESTEKÇİ",
    enMarker: "SUPPORTER",
    slots: 4,
    icon: Handshake,
  },
];

export default function SponsorsPage() {
  const { language, translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("İş ortaklarımız", "Our Partners")}
        title={translate("İlerlemek bir takım işidir", "Progress is a team effort")}
        description={translate("Sponsorlarımız, öğrenci hedeflerini gerçek üretim, test ve yarışma deneyimine dönüştürmemize destek olur.", "Our sponsors help transform student ambition into real manufacturing, testing and competition experience.")}
      />

      <section className="section-space">
        <div className="container-shell space-y-16">
          {sponsorTiers.map((tier, tierIndex) => {
            const TierIcon = tier.icon;
            const isSupporterTier = tier.trMarker === "DESTEKÇİ";
            return (
            <Reveal key={tier.trName} delay={tierIndex * .06}>
              <div className="grid gap-7 lg:grid-cols-[.45fr_1.55fr] lg:items-start">
                <div className="border-l-2 border-burgundy pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">{translate("Seviye", "Tier")} 0{tierIndex + 1}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold uppercase">{language === "tr" ? tier.trName : tier.enName}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">{language === "tr" ? tier.trDescription : tier.enDescription}</p>
                </div>
                <div className={`grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 ${isSupporterTier ? "lg:grid-cols-4" : ""}`}>
                  {Array.from({ length: tier.slots }, (_, index) => index + 1).map((slot) => {
                    const isCodexoSoft = isSupporterTier && slot === 1;

                    if (isCodexoSoft) {
                      return (
                        <a
                          key="codexosoft"
                          href="https://codexosoft.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={translate("CodexoSoft web sitesini ziyaret et", "Visit the CodexoSoft website")}
                          className="premium-card group relative aspect-[3/2] min-h-24 overflow-hidden bg-[#0D1425] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-inset"
                        >
                          <Image
                            src="/images/sponsors/codexosoft.png"
                            alt="CodexoSoft Software Solutions"
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                          />
                        </a>
                      );
                    }

                    return (
                      <div key={slot} className={`premium-card group grid place-items-center bg-[#0D1425] text-center ${isSupporterTier ? "min-h-24 p-3" : "min-h-48 p-6"}`}>
                        <div>
                          <TierIcon className="mx-auto text-university transition group-hover:text-burgundy" size={isSupporterTier ? 18 : 23} />
                          <p className={`${isSupporterTier ? "mt-2 text-[9px]" : "mt-5 text-[11px]"} font-bold uppercase tracking-[.2em] text-white/35`}>
                            {language === "tr" ? tier.trMarker : tier.enMarker} {isSupporterTier ? "" : "SPONSOR "}{String(slot).padStart(2, "0")}
                          </p>
                          <p className={`${isSupporterTier ? "mt-1 text-[8px]" : "mt-2 text-[9px]"} uppercase tracking-[.18em] text-white/20`}>{translate("Logo alanı", "Logo area")}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )})}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.02]">
        <div className="container-shell grid gap-4 py-20 md:grid-cols-3">
          {[
            [Rocket, translate("Mühendisliğe erişim", "Access to engineering"), translate("Geleceğin mühendisleri ve görünürlüğü yüksek bir teknoloji platformuyla buluşun.", "Connect with future engineers and a highly visible technology platform.")],
            [Gem, translate("Marka görünürlüğü", "Brand visibility"), translate("Araçta, takım kıyafetlerinde, etkinliklerde ve yarışma iletişiminde yer alın.", "Feature on the car, team apparel, events and competition communications.")],
            [Handshake, translate("Gerçek iş birliği", "Real collaboration"), translate("Malzeme, uzmanlık, yazılım veya üretim desteğiyle belirli sistemlere katkı sağlayın.", "Contribute to specific systems through materials, expertise, software or manufacturing support.")],
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
              {translate("Gelecek neslin arkasında yer alın", "Stand behind the next generation")}
            </h2>
            <p className="mx-auto mt-7 max-w-xl leading-8 text-white/50">{translate("Hedeflediğiniz etkiyi birlikte oluşturacak bir iş birliği tasarlayalım.", "Let's design a partnership that creates the impact you are aiming for.")}</p>
            <Button asChild size="lg" className="mt-8"><Link href="/contact">{translate("İş ortağımız olun", "Become our partner")} <ArrowRight size={16} /></Link></Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
