import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";

const images = [
  ["https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=85","Vehicle testing","md:col-span-2 md:row-span-2"],
  ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=85","Workshop build",""],
  ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85","Precision engineering",""],
  ["https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85","Team collaboration",""],
  ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=85","Electronics development",""],
  ["https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=85","Track preparation","md:col-span-2"]
];

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Inside MSKU Racing" title="Built in moments." description="The late nights, first starts, fast laps, and quiet breakthroughs behind every season." />
      <section className="section-space"><div className="container-shell grid auto-rows-[240px] gap-4 md:grid-cols-3 md:auto-rows-[270px]">
        {images.map(([src,alt,span],i)=><Reveal key={src} delay={i*.04} className={`group relative overflow-hidden rounded-2xl border border-white/10 ${span}`}><Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover saturate-[.72] transition duration-700 group-hover:scale-105 group-hover:saturate-100" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /><p className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[.18em]">{alt}</p></Reveal>)}
      </div></section>
    </>
  );
}
