"use client";

import { Clock3, Flag, Gauge, Wrench } from "lucide-react";
import { useLanguage } from "./language-provider";

export function GamePreview() {
  const { translate } = useLanguage();

  return (
    <div className="carbon-subtle game-preview game-preview-panel relative min-h-[360px] overflow-hidden border backdrop-blur-md md:min-h-[420px]">
      <div className="game-preview-grid absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-25" />
      <div className="absolute -right-20 -top-20 size-72 rounded-full border border-university/25" />
      <div className="absolute -right-8 -top-8 size-48 rounded-full border border-burgundy/30" />
      <span className="absolute -bottom-8 -right-1 font-display text-[9rem] font-bold leading-none tracking-[-.1em] text-white/[.025]">01</span>

      <div className="relative z-10 flex min-h-[360px] flex-col p-6 md:min-h-[420px] md:p-8">
        <div className="game-preview-divider flex items-start justify-between gap-5 border-b pb-5">
          <div className="flex items-center gap-3">
            <Flag size={18} className="text-burgundy" />
            <p className="game-preview-muted text-[10px] font-bold uppercase tracking-[.28em]">MSKU RACING GAME</p>
          </div>
          <span className="flex shrink-0 items-center gap-2 border border-burgundy/30 bg-burgundy/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-burgundy">
            <Clock3 size={12} />
            {translate("Hazırlanıyor", "In development")}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="game-preview-icon mb-6 grid size-20 place-items-center border border-university/40 shadow-[0_0_60px_rgba(37,43,135,.3)]">
            <Gauge size={31} />
          </div>
          <p className="game-preview-muted text-[9px] font-bold uppercase tracking-[.26em]">
            {translate("Yeni yarış deneyimi", "A new racing experience")}
          </p>
          <h3 className="mt-3 max-w-md font-display text-[clamp(2.6rem,5vw,4.6rem)] font-semibold uppercase leading-[.84] tracking-[-.055em]">
            {translate("Çok yakında", "Coming soon")}
          </h3>
          <p className="game-preview-muted mt-5 max-w-md text-sm leading-6">
            {translate(
              "MSKU Racing ruhunu piste taşıyan yeni oyun deneyimi hazırlanıyor. Gelişmeleri buradan paylaşacağız.",
              "A new game experience bringing the MSKU Racing spirit to the track is in development. Updates will be shared here.",
            )}
          </p>
        </div>

        <div className="game-preview-divider flex items-center gap-3 border-t pt-5 text-[9px] font-bold uppercase tracking-[.18em]">
          <Wrench size={14} className="text-burgundy" />
          <span className="game-preview-muted">{translate("Garajda çalışmalar sürüyor", "Work continues in the garage")}</span>
        </div>
      </div>
    </div>
  );
}
