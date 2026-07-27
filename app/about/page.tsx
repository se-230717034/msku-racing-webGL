import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Wrench } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="More than a race car." description="MSKU Racing is a multidisciplinary student team where ambitious ideas become engineered reality." />
      <section className="section-space"><div className="container-shell grid gap-12 lg:grid-cols-2">
        <Reveal><SectionHeading eyebrow="Why we race" title="Education at full speed." /></Reveal>
        <Reveal delay={.1}><p className="text-xl leading-9 text-white/60">Formula Student compresses an entire automotive company into one student team. We research, design, manufacture, test, fund, and communicate one complete vehicle—learning through every decision.</p></Reveal>
      </div></section>
      <section className="border-y border-white/10 bg-white/[.02]"><div className="container-shell grid gap-4 py-20 md:grid-cols-3">
        {[
          [Lightbulb, "Think boldly", "Question assumptions and make every design decision measurable."],
          [Wrench, "Build precisely", "Turn simulation and calculation into reliable physical systems."],
          [Users, "Win together", "Share knowledge openly and own outcomes as one team."]
        ].map(([Icon, title, copy], i) => (
          <Reveal key={String(title)} delay={i * .08}><Card className="h-full"><CardContent className="p-8"><Icon className="text-accent" /><h3 className="mt-8 font-display text-2xl font-semibold uppercase">{String(title)}</h3><p className="mt-4 leading-7 text-white/45">{String(copy)}</p></CardContent></Card></Reveal>
        ))}
      </div></section>
      <section className="section-space"><div className="container-shell"><Reveal><SectionHeading eyebrow="The road so far" title="A young team with a long horizon." /></Reveal>
        <div className="mt-14 border-l border-white/15 pl-7">
          {[["2023","MSKU Racing is founded by a small group of engineering students."],["2024","The first vehicle concept and team structure take shape."],["2025","Manufacturing capabilities expand and the first rolling chassis is completed."],["2026","MR-26 enters development with an ambitious electric architecture."]].map(([year, text]) => <Reveal key={year} className="relative mb-12 grid gap-3 md:grid-cols-[160px_1fr]"><span className="absolute -left-[33px] top-2 size-3 rounded-full border-2 border-accent bg-background" /><strong className="font-display text-3xl text-accent">{year}</strong><p className="max-w-2xl text-lg leading-8 text-white/55">{text}</p></Reveal>)}
        </div>
      </div></section>
    </>
  );
}
