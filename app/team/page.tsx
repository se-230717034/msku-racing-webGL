import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { Card, CardContent } from "@/components/ui/card";

const groups = [
  ["Vehicle Dynamics", "Suspension, steering, tires and the pursuit of mechanical grip.", "VD"],
  ["Powertrain", "Electric propulsion, cooling, controls and energy systems.", "PT"],
  ["Aerodynamics", "CFD-led bodywork that makes every newton work harder.", "AERO"],
  ["Chassis & Composites", "Lightweight structures built for stiffness, safety and serviceability.", "CH"],
  ["Electronics", "Vehicle intelligence, telemetry, embedded systems and wiring.", "EL"],
  ["Business & Media", "Partnerships, finance, brand, events and the story around the car.", "BM"]
];

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Meet the team" title="Different disciplines. Shared ambition." description="The car is our common language. Six focused sub-teams bring it to life." />
      <section className="section-space"><div className="container-shell grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, copy, mark], i) => <Reveal key={title} delay={i * .05}><Card className="group h-full overflow-hidden transition hover:border-accent/40"><CardContent className="relative min-h-72 p-8"><span className="absolute right-5 top-3 font-display text-6xl font-bold text-white/[.035] transition group-hover:text-accent/[.09]">{mark}</span><span className="text-xs font-bold uppercase tracking-[.2em] text-accent">0{i + 1}</span><h2 className="mt-20 font-display text-3xl font-semibold uppercase tracking-[-.03em]">{title}</h2><p className="mt-4 leading-7 text-white/45">{copy}</p></CardContent></Card></Reveal>)}
      </div></section>
      <section className="border-y border-white/10 bg-burgundy/10"><div className="container-shell py-20 text-center"><Reveal><p className="eyebrow">The crew grows every season</p><p className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold uppercase leading-tight tracking-[-.04em] md:text-6xl">Curiosity is the only prerequisite.</p><a href="/join" className="mt-8 inline-flex rounded-full bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[.18em]">Find your place</a></Reveal></div></section>
    </>
  );
}
