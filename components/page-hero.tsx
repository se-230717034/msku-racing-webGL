import { ReactNode } from "react";
import { Reveal } from "./motion-reveal";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="page-hero relative overflow-hidden border-b border-white/10 pt-[72px] xl:pt-[76px]">
      <div className="absolute inset-0 bg-grid-dark bg-[size:64px_64px] opacity-55 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="track-line absolute -right-[8%] top-[-28%] size-[520px] rounded-full border border-white/10 md:size-[760px]" />
      <div className="track-line absolute -right-[2%] top-[-5%] size-[340px] rounded-full border border-burgundy/30 md:size-[520px]" />
      <span className="absolute bottom-0 left-0 h-1 w-1/3 bg-burgundy" />
      <div className="container-shell relative flex min-h-[520px] items-end py-16 md:min-h-[640px] md:py-24">
        <Reveal className="w-full">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-burgundy" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h1 className="display-title mt-8 max-w-6xl">{title}</h1>
          <div className="mt-9 flex flex-col justify-between gap-8 border-t border-white/10 pt-6 md:flex-row md:items-start">
            <p className="max-w-2xl text-base leading-8 text-white/55 md:text-lg">{description}</p>
            <span className="font-display text-[10px] font-bold uppercase tracking-[.22em] text-white/30">MSKU / FS 2027</span>
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
