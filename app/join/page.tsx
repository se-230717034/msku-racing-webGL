import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { JoinForm } from "@/components/forms";
import { Check } from "lucide-react";

export default function JoinPage() {
  return (
    <>
      <PageHero eyebrow="Join MSKU Racing" title="There is a seat for your skill." description="You do not need motorsport experience. Bring curiosity, consistency, and the courage to learn in public." />
      <section className="section-space"><div className="container-shell grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <Reveal>
          <p className="eyebrow">What to expect</p>
          <h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-[-.04em]">Real responsibility from day one.</h2>
          <div className="mt-8 space-y-4">
            {["Hands-on technical and creative work","Mentorship from experienced members","Cross-functional project experience","A team that learns by building"].map(x=><p key={x} className="flex items-center gap-3 text-sm text-white/55"><span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent"><Check size={13}/></span>{x}</p>)}
          </div>
          <p className="mt-9 border-l-2 border-accent pl-5 text-sm leading-7 text-white/40">Applications are open to active MSKU students from every department. Roles and onboarding capacity vary through the season.</p>
        </Reveal>
        <Reveal delay={.1} className="rounded-2xl border border-white/10 bg-white/[.025] p-6 md:p-9"><JoinForm /></Reveal>
      </div></section>
    </>
  );
}
