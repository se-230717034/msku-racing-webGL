import Link from "next/link";
import { ArrowRight, Gem, Handshake, Rocket } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const partners = ["MSKU", "TEKNOFAB", "VECTOR", "MOTION LAB", "CARBON+","ANADOLU CNC"];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="Our partners" title="Progress is a team sport." description="Our partners turn student ambition into real manufacturing, testing, and competition experience." />
      <section className="section-space"><div className="container-shell">
        <Reveal><p className="eyebrow text-center">Powered by</p></Reveal>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {partners.map((name,i)=><Reveal key={name} delay={i*.04} className="grid min-h-40 place-items-center bg-background"><span className="font-display text-lg font-bold tracking-[.14em] text-white/38">{name}</span></Reveal>)}
        </div>
      </div></section>
      <section className="border-y border-white/10 bg-white/[.02]"><div className="container-shell grid gap-4 py-20 md:grid-cols-3">
        {[[Rocket,"Engineering access","Connect with emerging engineers and a highly visible technology platform."],[Gem,"Brand presence","Appear across the vehicle, team apparel, events, media, and competition assets."],[Handshake,"Real collaboration","Support specific systems through materials, expertise, software, or manufacturing."]].map(([Icon,title,copy],i)=><Reveal key={String(title)} delay={i*.08}><Card className="h-full"><CardContent className="p-8"><Icon className="text-accent" /><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{String(title)}</h3><p className="mt-4 leading-7 text-white/45">{String(copy)}</p></CardContent></Card></Reveal>)}
      </div></section>
      <section className="section-space"><div className="container-shell text-center"><Reveal><h2 className="mx-auto max-w-4xl font-display text-5xl font-semibold uppercase leading-[.95] tracking-[-.05em] md:text-7xl">Put your name behind the next generation.</h2><p className="mx-auto mt-7 max-w-xl leading-8 text-white/50">Let’s design a partnership around the impact you want to make.</p><Button asChild size="lg" className="mt-8"><Link href="/contact">Become a partner <ArrowRight size={16}/></Link></Button></Reveal></div></section>
    </>
  );
}
