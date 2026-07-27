import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";

const specs = [["Power unit","Electric, rear-wheel drive"],["Peak power","80 kW"],["Target mass","215 kg"],["Battery","High-voltage Li-ion"],["Chassis","Steel spaceframe"],["Bodywork","Carbon-fiber composite"],["Acceleration","0–100 km/h in 3.8 s"],["Control","Custom ECU + telemetry"]];

export default function CarPage() {
  return (
    <>
      <PageHero eyebrow="MR-26" title="Engineered around the driver." description="Compact, electric, and developed one subsystem at a time. Meet our most ambitious prototype." />
      <section className="relative min-h-[600px] overflow-hidden border-b border-white/10">
        <Image src="/images/msku-racing-hero.png" alt="MSKU Racing MR-26 prototype" fill sizes="100vw" className="object-cover object-[68%_center] opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
        <div className="container-shell relative flex min-h-[600px] items-center"><Reveal><p className="max-w-2xl font-display text-4xl font-medium uppercase leading-tight tracking-[-.04em] md:text-6xl">Less mass.<br /><span className="text-accent">More feedback.</span><br />Zero excuses.</p></Reveal></div>
      </section>
      <section className="section-space"><div className="container-shell">
        <Reveal><SectionHeading eyebrow="Technical overview" title="The machine, measured." copy="Current development targets for the MR-26 platform. Final figures will evolve through validation." /></Reveal>
        <div className="mt-12 grid border-t border-white/10 md:grid-cols-2">
          {specs.map(([label, value], i) => <Reveal key={label} delay={(i % 2) * .04} className="flex items-center justify-between gap-5 border-b border-white/10 py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/35">{label}</span><strong className="text-right font-display text-lg font-medium">{value}</strong></Reveal>)}
        </div>
      </div></section>
      <section className="border-y border-white/10 bg-navy/30"><div className="container-shell grid gap-14 py-20 lg:grid-cols-3">
        {[["01","Simulate","Model every critical behavior before committing material."],["02","Manufacture","Build in-house to own the process and the learning."],["03","Validate","Test, measure, iterate—until intuition matches data."]].map(([num,title,copy],i)=><Reveal key={num} delay={i*.08}><span className="font-display text-5xl text-accent">{num}</span><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{title}</h3><p className="mt-4 leading-7 text-white/45">{copy}</p></Reveal>)}
      </div></section>
    </>
  );
}
