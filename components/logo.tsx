import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="MSKU RACING ana sayfa">
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#EDE2BD] transition group-hover:border-burgundy sm:size-12">
        <Image
          src="/images/team-logo.png"
          alt="MSKU RACING takım logosu"
          fill
          sizes="48px"
          className="object-cover"
          priority
        />
      </span>
      <span className="h-8 w-px shrink-0 bg-white/15" aria-hidden="true" />
      <span className="relative h-11 w-8 shrink-0 overflow-hidden bg-white">
        <Image
          src="/images/msku-logo.png"
          alt="Muğla Sıtkı Koçman Üniversitesi logosu"
          fill
          sizes="32px"
          className="object-contain"
          priority
        />
      </span>
      {!compact && (
        <span className="hidden font-display text-sm font-bold uppercase leading-none tracking-[.1em] sm:block">
          MSKU <span className="text-burgundy">RACING</span>
          <small className="mt-1 block text-[8px] font-medium tracking-[.2em] text-white/45">Formula Student Takımı</small>
        </span>
      )}
    </Link>
  );
}
