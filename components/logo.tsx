import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="MSKÜ Racing ana sayfa">
      <span className="grid h-11 w-14 place-items-center border border-dashed border-white/25 bg-white/[.025]">
        <span className="text-[8px] font-bold uppercase tracking-[.16em] text-white/40">Logo</span>
      </span>
      {!compact && (
        <span className="font-display text-sm font-bold uppercase leading-none tracking-[.1em]">
          MSKÜ <span className="text-burgundy">Racing</span>
          <small className="mt-1 block text-[8px] font-medium tracking-[.2em] text-white/45">Formula Student Takımı</small>
        </span>
      )}
    </Link>
  );
}
