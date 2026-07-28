"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

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

const units: Array<{ key: keyof CountdownValue; label: string }> = [
  { key: "days", label: "Gün" },
  { key: "hours", label: "Saat" },
  { key: "minutes", label: "Dakika" },
  { key: "seconds", label: "Saniye" },
];

export function RaceCountdown() {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown());
    update();

    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="race-countdown-title" className="relative border-b border-white/10 bg-[#0D1425]">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-burgundy to-transparent" />
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:py-12">
        <div>
          <p className="eyebrow">Formula Student 2027</p>
          <div className="mt-4 flex items-start gap-4">
            <CalendarDays className="mt-1 shrink-0 text-university" size={22} />
            <div>
              <h2 id="race-countdown-title" className="font-display text-3xl font-semibold uppercase tracking-[-.035em]">
                Yarışa kalan süre
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Yarışa kalan süre">
          {units.map(({ key, label }) => (
            <div key={key} className="relative overflow-hidden border border-white/10 bg-[#0A1020] px-5 py-5 text-center">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-university" />
              <strong className="block font-display text-4xl font-semibold tabular-nums text-white md:text-5xl">
                {countdown ? String(countdown[key]).padStart(2, "0") : "--"}
              </strong>
              <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
