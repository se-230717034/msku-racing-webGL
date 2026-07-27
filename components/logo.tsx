import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="MSKU Racing home">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-lg border border-white/15 bg-navy">
        <span className="absolute -right-3 top-0 h-full w-7 -skew-x-12 bg-burgundy transition-transform group-hover:-translate-x-1" />
        <span className="relative font-display text-sm font-bold italic tracking-tighter">MR</span>
      </span>
      {!compact && (
        <span className="font-display text-sm font-bold uppercase leading-none tracking-[.12em]">
          MSKU <span className="text-accent">Racing</span>
          <small className="mt-1 block text-[8px] font-medium tracking-[.23em] text-white/45">Formula Student</small>
        </span>
      )}
    </Link>
  );
}
