"use client";

import { Flag, Gamepad2, Sparkles } from "lucide-react";
import { useLanguage } from "./language-provider";

export function GamePreview() {
  const { translate } = useLanguage();

  return (
    <div className="theme-fixed-dark carbon-subtle game-preview relative min-h-[360px] overflow-hidden border border-white/15 bg-[#0B1222]/90 backdrop-blur-md md:min-h-[420px]">
      <div className="absolute inset-5 border border-university/35" />
      <div className="absolute right-5 top-5 h-px w-1/3 bg-burgundy" />
      <div className="absolute bottom-5 left-5 h-px w-1/4 bg-green/70" />
      <div className="absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-25" />

      <div className="relative z-10 flex min-h-[360px] flex-col p-6 md:min-h-[420px] md:p-8">
        <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Gamepad2 size={18} className="text-burgundy" />
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/45">
                MSKU RACING GAME
              </p>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.03em]">
              {translate("Garajdan piste.", "From garage to track.")}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 border border-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/35">
            <span className="size-1.5 bg-green" />
            {translate("Geliştiriliyor", "In development")}
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-6">
          <div className="absolute h-32 w-56 rounded-[50%] border border-dashed border-university/35 md:h-40 md:w-72" />
          <div className="absolute h-20 w-40 rounded-[50%] border border-burgundy/30 md:h-24 md:w-52" />
          <div className="relative grid size-24 place-items-center border border-white/15 bg-[#09101E] shadow-[0_0_60px_rgba(37,43,135,.22)]">
            <Gamepad2 size={34} className="text-white/65" />
            <span className="absolute -right-2 -top-2 grid size-7 place-items-center bg-burgundy text-white">
              <Sparkles size={13} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10">
          {[
            translate("Araç", "Car"),
            translate("Pist", "Track"),
            translate("Skor", "Score"),
          ].map((label, index) => (
            <div key={label} className="bg-[#09101E] px-3 py-4 text-center">
              <p className="text-[8px] font-bold uppercase tracking-[.2em] text-white/30">{label}</p>
              <div className="mx-auto mt-3 h-px w-8 bg-university/50" />
              {index === 1 && <Flag size={11} className="mx-auto mt-2 text-burgundy/70" />}
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[.2em] text-white/30">
          {translate("Oyun alanı çok yakında", "Game area coming soon")}
        </p>
      </div>
    </div>
  );
}
