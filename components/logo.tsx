"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./language-provider";

export function Logo() {
  const { translate } = useLanguage();

  return (
    <Link href="/" className="group flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label={translate("MSKU RACING ana sayfa", "MSKU RACING home")}>
      <span className="relative h-7 w-[81px] shrink-0 sm:h-9 sm:w-[104px]">
        <Image
          src="/images/msku-racing-logo-v2.png"
          alt={translate("MSKU RACING takım logosu", "MSKU RACING team logo")}
          fill
          sizes="(min-width: 640px) 104px, 81px"
          className="object-contain drop-shadow-[0_1px_5px_rgba(245,244,239,.18)] transition-transform duration-300 group-hover:scale-[1.025]"
          priority
        />
      </span>
      <span className="h-7 w-px shrink-0 bg-white/15 sm:h-8" aria-hidden="true" />
      <span className="relative h-7 w-[17px] shrink-0 sm:h-9 sm:w-[22px]">
        <Image
          src="/images/msku-university-logo-v2.png"
          alt={translate("Muğla Sıtkı Koçman Üniversitesi logosu", "Muğla Sıtkı Koçman University logo")}
          fill
          sizes="(min-width: 640px) 22px, 17px"
          className="object-contain drop-shadow-[0_1px_5px_rgba(245,244,239,.14)]"
          priority
        />
      </span>
    </Link>
  );
}
