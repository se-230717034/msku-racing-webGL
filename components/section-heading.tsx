export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5 font-display text-4xl font-semibold uppercase leading-[.95] tracking-[-.045em] sm:text-5xl lg:text-6xl">{title}</h2>
      {copy && <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">{copy}</p>}
    </div>
  );
}
