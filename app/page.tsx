import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Gauge, MoveUpRight, Timer, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";

const stats = [
  { value: "0–100", unit: "3.8 s", label: "Acceleration", icon: Timer },
  { value: "215", unit: "kg", label: "Target weight", icon: Weight },
  { value: "80", unit: "kW", label: "Peak power", icon: Gauge }
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden pt-[76px] lg:min-h-screen">
        <Image src="/images/msku-racing-hero.png" alt="MSKU Racing Formula Student car in the pit lane" fill priority sizes="100vw" className="object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050914_5%,rgba(5,9,20,.85)_42%,rgba(5,9,20,.22)_75%),linear-gradient(0deg,#050914_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:64px_64px] opacity-20" />
        <div className="container-shell relative z-10 flex min-h-[calc(100vh-76px)] items-center py-20">
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-accent" /> Muğla Sıtkı Koçman University</p>
              <h1 className="mt-7 font-display text-6xl font-semibold uppercase leading-[.82] tracking-[-.07em] sm:text-7xl lg:text-[clamp(6rem,10vw,10rem)]">
                Driven by <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.68)]">curiosity.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/60 md:text-lg">We design, manufacture, and race a Formula Student car—turning classroom theory into track-proven engineering.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link href="/car">Meet the car <ArrowRight size={16} /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/join">Join the team</Link></Button>
              </div>
            </Reveal>
          </div>
        </div>
        <a href="#intro" className="absolute bottom-7 right-6 z-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/40 sm:flex lg:right-12">Discover <span className="grid size-10 place-items-center rounded-full border border-white/15"><ArrowDown size={14} /></span></a>
      </section>

      <section id="intro" className="section-space border-y border-white/10 bg-[#070c18]">
        <div className="container-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <Reveal><SectionHeading eyebrow="Built at MSKU" title="One team. Every discipline." /></Reveal>
          <Reveal delay={.1}>
            <p className="max-w-2xl text-xl leading-9 text-white/65 md:text-2xl">From the first sketch to the final corner, our team brings together engineers, designers, strategists, and storytellers around one ambitious machine.</p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-accent">Our story <MoveUpRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="MR-26 Prototype" title="Numbers that move us." copy="Every gram, millimeter, and line of code is challenged. The MR-26 is being engineered as our most focused car yet." /></Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((item, i) => (
              <Reveal key={item.label} delay={i * .08}>
                <Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-accent/40">
                  <CardContent className="relative p-7 md:p-9">
                    <item.icon className="absolute right-7 top-7 text-white/15 transition group-hover:text-accent/50" size={30} />
                    <p className="font-display text-5xl font-semibold tracking-[-.05em]">{item.value}<span className="ml-2 text-xl text-accent">{item.unit}</span></p>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-white/40">{item.label}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-navy/30">
        <div className="container-shell grid min-h-[620px] gap-10 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative z-10">
            <p className="eyebrow">Meet the people</p>
            <h2 className="mt-5 font-display text-5xl font-semibold uppercase leading-[.9] tracking-[-.05em] sm:text-6xl">Many minds.<br />One lap time.</h2>
            <p className="mt-7 max-w-lg leading-8 text-white/50">Our sub-teams own every system, but the finish line belongs to everyone.</p>
            <Button asChild variant="outline" className="mt-8"><Link href="/team">Explore our team <ArrowRight size={16} /></Link></Button>
          </Reveal>
          <Reveal delay={.1} className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10">
            <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85" alt="Engineering students collaborating" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover saturate-[.75]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/70 to-transparent" />
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow="Latest from the garage" title="Build notes & race stories." /></Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              ["Development", "MR-26 concept freeze: the next chapter begins", "22.07.2026"],
              ["Team", "Meet the people behind our vehicle dynamics group", "04.07.2026"],
              ["Workshop", "From digital model to first carbon-fiber layup", "18.06.2026"]
            ].map(([tag, title, date], i) => (
              <Reveal key={title} delay={i * .08}>
                <Link href="/news" className="group block border-t border-white/15 py-6 transition hover:border-accent">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-white/35"><span>{tag}</span><span>{date}</span></div>
                  <h3 className="mt-6 font-display text-2xl font-medium leading-tight transition group-hover:text-accent">{title}</h3>
                  <ArrowRight className="mt-8 text-white/30 transition group-hover:translate-x-2 group-hover:text-accent" size={20} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-burgundy">
        <div className="container-shell flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-white/60">Your next challenge starts here</p><h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[-.04em]">Build something that moves.</h2></div>
          <Button asChild variant="outline" className="border-white/30 bg-white text-burgundy hover:bg-white/90 hover:text-burgundy"><Link href="/join">Join MSKU Racing <ArrowRight size={16} /></Link></Button>
        </div>
      </section>
    </>
  );
}
