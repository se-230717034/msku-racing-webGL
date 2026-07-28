"use client";

import { Activity, Radio } from "lucide-react";
import { useLanguage } from "./language-provider";

export function VehicleTelemetry() {
  const { translate } = useLanguage();
  const metrics = [
    translate("Araç Hızı", "Vehicle Speed"),
    translate("Batarya", "Battery"),
    translate("Motor Sıcaklığı", "Motor Temperature"),
    translate("Tur Zamanı", "Lap Time"),
  ];

  return (
    <div className="theme-fixed-dark carbon-subtle relative min-h-[460px] overflow-hidden border border-white/15 bg-[#0B1222]">
      <div className="absolute inset-5 border border-university/35" />
      <div className="absolute right-5 top-5 h-px w-1/3 bg-burgundy" />
      <div className="absolute bottom-5 left-5 h-px w-1/4 bg-green/70" />
      <div className="relative z-10 flex min-h-[460px] flex-col p-7 md:p-10">
        <div className="flex flex-col items-start justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-burgundy" />
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/45">
                {translate("Canlı Telemetri Sistemi", "Live Telemetry System")}
              </p>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.03em]">
              {translate("Amper Araç Verileri", "Amper Vehicle Data")}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 border border-white/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white/35">
            <span className="size-1.5 bg-burgundy" />
            {translate("Bağlantı bekleniyor", "Awaiting connection")}
          </span>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((label) => (
            <div key={label} className="min-h-28 bg-[#09101E] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[.2em] text-white/35">{label}</p>
              <div
                className="mt-8 h-px w-12 bg-university/55"
                aria-label={`${label} ${translate("verisi bekleniyor", "data pending")}`}
              />
            </div>
          ))}
        </div>

        <div className="relative mt-6 flex-1 overflow-hidden border border-white/10 bg-[#09101E]">
          <div className="absolute inset-0 bg-grid-dark bg-[size:32px_32px] opacity-40" />
          <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
          <div className="absolute inset-y-5 left-1/3 w-px bg-white/10" />
          <div className="absolute inset-y-5 left-2/3 w-px bg-white/10" />
          <div className="relative flex h-full min-h-28 items-center justify-center">
            <Radio size={18} className="text-green/60" />
            <p className="ml-3 text-[9px] font-bold uppercase tracking-[.22em] text-white/25">
              {translate("Telemetri akışı bekleniyor", "Awaiting telemetry stream")}
            </p>
          </div>
        </div>
      </div>
      <span className="pointer-events-none absolute bottom-8 right-8 font-display text-7xl font-semibold uppercase text-white/[.025]">
        Amper
      </span>
    </div>
  );
}
