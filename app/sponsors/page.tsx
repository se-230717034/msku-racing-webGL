import Link from "next/link";
import { ArrowRight, Gem, Handshake, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const partners = ["ANA SPONSOR", "TEKNİK PARTNER", "ÜRETİM PARTNERİ", "YAZILIM PARTNERİ", "MALZEME PARTNERİ", "DESTEKÇİ"];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="İş ortaklarımız" title="İlerlemek bir takım işidir." description="Sponsorlarımız, öğrenci hedeflerini gerçek üretim, test ve yarışma deneyimine dönüştürmemize destek olur." />
      <section className="section-space"><div className="container-shell">
        <Reveal><p className="eyebrow text-center">Bize güç verenler</p></Reveal>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {partners.map((name,i)=><Reveal key={name} delay={i*.04} className="grid min-h-40 place-items-center bg-background"><span className="text-center font-display text-sm font-bold tracking-[.14em] text-white/30">{name}<small className="mt-2 block text-[9px] font-normal">LOGO ALANI</small></span></Reveal>)}
        </div>
      </div></section>
      <section className="border-y border-white/10 bg-white/[.02]"><div className="container-shell grid gap-4 py-20 md:grid-cols-3">
        {[[Rocket,"Mühendisliğe erişim","Geleceğin mühendisleri ve görünürlüğü yüksek bir teknoloji platformuyla buluşun."],[Gem,"Marka görünürlüğü","Araçta, takım kıyafetlerinde, etkinliklerde ve yarışma iletişiminde yer alın."],[Handshake,"Gerçek iş birliği","Malzeme, uzmanlık, yazılım veya üretim desteğiyle belirli sistemlere katkı sağlayın."]].map(([Icon,title,copy],i)=><Reveal key={String(title)} delay={i*.08}><Card className="h-full"><CardContent className="p-8"><Icon className="text-accent" /><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{String(title)}</h3><p className="mt-4 leading-7 text-white/45">{String(copy)}</p></CardContent></Card></Reveal>)}
      </div></section>
      <section className="section-space"><div className="container-shell text-center"><Reveal><h2 className="mx-auto max-w-4xl font-display text-5xl font-semibold uppercase leading-[.95] tracking-[-.05em] md:text-7xl">Gelecek neslin arkasında yer alın.</h2><p className="mx-auto mt-7 max-w-xl leading-8 text-white/50">Hedeflediğiniz etkiyi birlikte oluşturacak bir iş birliği tasarlayalım.</p><Button asChild size="lg" className="mt-8"><Link href="/contact">İş ortağımız olun <ArrowRight size={16}/></Link></Button></Reveal></div></section>
    </>
  );
}
