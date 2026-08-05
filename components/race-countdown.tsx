"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Radio, TimerReset } from "lucide-react";
import { useLanguage } from "./language-provider";
import { GamePreview } from "./game-preview";

const targetDate = new Date("2027-09-20T00:00:00+03:00").getTime();

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateCountdown(): CountdownValue {
  const distance = Math.max(0, targetDate - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

const units: Array<{ key: keyof CountdownValue; tr: string; en: string }> = [
  { key: "days", tr: "Gün", en: "Days" },
  { key: "hours", tr: "Saat", en: "Hours" },
  { key: "minutes", tr: "Dakika", en: "Minutes" },
  { key: "seconds", tr: "Saniye", en: "Seconds" },
];

export function RaceCountdown() {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);
  const { language, translate } = useLanguage();

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown());
    update();

    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="race-countdown-title" className="race-control relative overflow-hidden border-b border-white/10 bg-[#080d1a]">
      <div className="race-control-grid absolute inset-0" />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-burgundy to-transparent" />
      <div className="container-shell relative grid gap-8 py-16 lg:grid-cols-[1.3fr_.7fr] lg:items-stretch lg:py-20">
        <div className="race-control-board">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="race-live-dot" />
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-white/55">{translate("Yarış merkezi", "Race control")}</p>
            </div>
            <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-green"><Radio size={13} /> Formula Student 2027</span>
          </div>

          <div className="grid gap-10 py-9 xl:grid-cols-[.55fr_1.45fr] xl:items-end">
            <div>
              <CalendarDays className="text-burgundy" size={24} />
              <h2 id="race-countdown-title" className="mt-5 font-display text-4xl font-semibold uppercase leading-[.9] tracking-[-.045em] md:text-5xl">
                {translate("Yarışa", "Race")}<span className="block text-white/35">{translate("kalan süre", "countdown")}</span>
              </h2>
            </div>
            <div className="race-clock" aria-label={translate("Yarışa kalan süre", "Time until the race")}>
              {units.map(({ key, tr, en }, index) => (
                <div key={key} className={`race-clock-unit race-clock-unit-${key}`}>
                  <span className="race-clock-index">0{index + 1}</span>
                  <strong>{countdown ? String(countdown[key]).padStart(2, "0") : "--"}</strong>
                  <span>{language === "tr" ? tr : en}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/35">
            <TimerReset size={14} className="text-university" />
            {translate("Canlı zamanlayıcı / İstanbul saat dilimi", "Live timer / Istanbul time zone")}
          </div>
        </div>

        <div className="race-game-stage"><GamePreview /></div>
      </div>
    </section>
  );
}
