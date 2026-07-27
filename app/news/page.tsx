import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";

const stories = [
  ["Development","MR-26 concept freeze: the next chapter begins","After months of trade studies, simulations, and packaging reviews, our newest platform enters detailed design.","22 July 2026","https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85"],
  ["Team","Inside vehicle dynamics: grip starts with questions","Meet the group translating tire data and driver feedback into a responsive chassis.","04 July 2026","https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"],
  ["Workshop","Our first carbon-fiber layup","A new in-house process brings lighter, stiffer bodywork—and a lot of learning.","18 June 2026","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"],
  ["Partners","Manufacturing partnership expands for 2026","Better access to precision machining accelerates iteration throughout the build.","29 May 2026","https://images.unsplash.com/photo-1565439396-9e59f6d5dc1b?auto=format&fit=crop&w=1200&q=85"]
];

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News & build notes" title="From the garage." description="Progress reports, team stories, technical deep dives, and everything learned between the lines." />
      <section className="section-space"><div className="container-shell grid gap-x-6 gap-y-12 md:grid-cols-2">
        {stories.map(([tag,title,copy,date,image],i)=><Reveal key={title} delay={(i%2)*.07}>
          <article className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover saturate-[.7] transition duration-700 group-hover:scale-105 group-hover:saturate-100" /></div>
            <div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-white/35"><span className="text-accent">{tag}</span><span>{date}</span></div>
            <h2 className="mt-4 flex items-start justify-between gap-5 font-display text-3xl font-semibold uppercase leading-tight tracking-[-.035em]">{title}<ArrowUpRight className="mt-1 shrink-0 text-white/25 transition group-hover:text-accent" /></h2>
            <p className="mt-4 max-w-xl leading-7 text-white/45">{copy}</p>
          </article>
        </Reveal>)}
      </div></section>
    </>
  );
}
