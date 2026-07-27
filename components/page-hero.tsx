import { ReactNode } from "react";
import { Reveal } from "./motion-reveal";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-[76px]">
      <div className="absolute inset-0 bg-grid-dark bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-burgundy/15 blur-[110px]" />
      <div className="container-shell relative py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-6 max-w-5xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 md:text-lg">{description}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
