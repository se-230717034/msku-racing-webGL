"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./language-provider";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { translate } = useLanguage();

  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={translate("MSKU RACING ana sayfa", "MSKU RACING home")}>
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#EDE2BD] transition group-hover:border-burgundy sm:size-12">
        <Image
          src="/images/team-logo.png"
          alt={translate("MSKU RACING takım logosu", "MSKU RACING team logo")}
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
          alt={translate("Muğla Sıtkı Koçman Üniversitesi logosu", "Muğla Sıtkı Koçman University logo")}
          fill
          sizes="32px"
          className="object-contain"
          priority
        />
      </span>
      {!compact && (
        <span className="hidden font-display text-sm font-bold uppercase leading-none tracking-[.1em] sm:block">
          MSKU <span className="text-burgundy">RACING</span>
          <small className="mt-1 block text-[8px] font-medium tracking-[.2em] text-white/45">{translate("Formula Student Takımı", "Formula Student Team")}</small>
        </span>
      )}
    </Link>
  );
}
