"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Flag, Gamepad2, Play, Trophy, X } from "lucide-react";
import { useLanguage } from "./language-provider";

type LapRecord = {
  id: string;
  driver: string;
  time: number;
};

const leaderboardKey = "msku-racing-game-leaderboard";
const driverKey = "msku-racing-game-driver";

function formatLapTime(time: number) {
  return `${time.toFixed(1)} sn`;
}

export function GamePreview() {
  const { translate } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [driver, setDriver] = useState("MSKU Pilot");
  const [leaderboard, setLeaderboard] = useState<LapRecord[]>([]);

  useEffect(() => {
    setMounted(true);

    try {
      const savedDriver = window.localStorage.getItem(driverKey);
      const savedLeaderboard = JSON.parse(window.localStorage.getItem(leaderboardKey) ?? "[]") as LapRecord[];
      if (savedDriver) setDriver(savedDriver);
      if (Array.isArray(savedLeaderboard)) setLeaderboard(savedLeaderboard.slice(0, 8));
    } catch {
      // The game stays playable even when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (!gameOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGameOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [gameOpen]);

  useEffect(() => {
    const saveLap = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type !== "msku-racing:lap-complete") return;

      const time = Number(event.data.time);
      if (!Number.isFinite(time) || time <= 0 || time > 3_600) return;

      const entry: LapRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        driver: driver.trim().slice(0, 18) || "MSKU Pilot",
        time,
      };

      setLeaderboard((current) => {
        const next = [...current, entry].sort((a, b) => a.time - b.time).slice(0, 8);
        try {
          window.localStorage.setItem(leaderboardKey, JSON.stringify(next));
        } catch {
          // Keep the in-memory leaderboard when browser storage is unavailable.
        }
        return next;
      });
    };

    window.addEventListener("message", saveLap);
    return () => window.removeEventListener("message", saveLap);
  }, [driver]);

  const launchGame = () => {
    const normalizedDriver = driver.trim().slice(0, 18) || "MSKU Pilot";
    setDriver(normalizedDriver);
    try {
      window.localStorage.setItem(driverKey, normalizedDriver);
    } catch {
      // The game still launches when browser storage is unavailable.
    }
    setGameOpen(true);
  };

  const leaderboardList = (
    <div className="space-y-2">
      {leaderboard.length ? leaderboard.slice(0, 5).map((record, index) => (
        <div key={record.id} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-white/10 pb-2 text-xs">
          <span className="font-display text-burgundy">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate font-semibold uppercase tracking-[.08em] text-white/70">{record.driver}</span>
          <strong className="font-mono text-white">{formatLapTime(record.time)}</strong>
        </div>
      )) : (
        <p className="py-3 text-xs leading-5 text-white/35">
          {translate("İlk tur zamanını sen kaydet.", "Set the first lap time.")}
        </p>
      )}
    </div>
  );

  return (
    <>
      <div className="theme-fixed-dark carbon-subtle game-preview relative min-h-[360px] overflow-hidden border border-white/15 bg-[#0B1222]/90 backdrop-blur-md md:min-h-[420px]">
        <div className="absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-25" />
        <div className="absolute -right-12 top-16 size-44 rounded-full border border-university/25" />
        <div className="absolute -right-4 top-24 size-28 rounded-full border border-burgundy/30" />

        <div className="relative z-10 flex min-h-[360px] flex-col p-6 md:min-h-[420px] md:p-8">
          <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <Gamepad2 size={18} className="text-burgundy" />
                <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/45">MSKU RACING GAME</p>
              </div>
              <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.03em]">
                {translate("Garajdan piste", "From garage to track")}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 border border-green/25 bg-green/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-green">
              <span className="size-1.5 bg-green" />
              {translate("Oynanabilir", "Playable")}
            </span>
          </div>

          <div className="grid flex-1 gap-5 py-5 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div>
              <div className="grid size-20 place-items-center border border-university/40 bg-[#09101E] shadow-[0_0_60px_rgba(37,43,135,.3)]">
                <Flag size={30} className="text-white/75" />
              </div>
              <p className="mt-4 text-xs leading-5 text-white/45">
                {translate("MSKU renklerindeki Formula aracınla en hızlı turu at.", "Set the fastest lap in an MSKU-liveried Formula car.")}
              </p>
            </div>

            <div className="border border-white/10 bg-[#070D19]/85 p-4">
              <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em] text-white/40">
                <Trophy size={13} className="text-burgundy" />
                {translate("Yerel liderlik tablosu", "Local leaderboard")}
              </div>
              {leaderboardList}
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="game-driver-name">{translate("Pilot adı", "Driver name")}</label>
            <input
              id="game-driver-name"
              value={driver}
              maxLength={18}
              onChange={(event) => setDriver(event.target.value)}
              className="border border-white/15 bg-white/[.04] px-4 py-3 text-xs font-semibold uppercase tracking-[.12em] text-white outline-none transition placeholder:text-white/25 focus:border-burgundy"
              placeholder={translate("Pilot adı", "Driver name")}
            />
            <button
              type="button"
              onClick={launchGame}
              className="inline-flex items-center justify-center gap-2 bg-burgundy px-5 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#c10f39]"
            >
              {translate("Yarışı başlat", "Start race")} <Play size={14} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {mounted && gameOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#03060D] text-white" role="dialog" aria-modal="true" aria-label={translate("MSKU Racing oyunu", "MSKU Racing game")}>
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#080D1A] px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Flag size={18} className="text-burgundy" />
              <div>
                <p className="font-display text-lg font-semibold uppercase leading-none">MSKU Racing</p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[.2em] text-white/35">{driver}</p>
              </div>
            </div>
            <div className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-white/35 sm:block">
              {translate("Yön tuşları • ESC ile çık", "Arrow keys • ESC to exit")}
            </div>
            <button type="button" onClick={() => setGameOpen(false)} className="grid size-10 place-items-center border border-white/15 transition hover:border-burgundy" aria-label={translate("Oyunu kapat", "Close game")}>
              <X size={18} />
            </button>
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_290px]">
            <iframe
              ref={iframeRef}
              src="/game/index.html"
              title={translate("MSKU Racing - Garajdan Piste", "MSKU Racing - From garage to track")}
              className="h-full min-h-[420px] w-full border-0 bg-black"
              allow="autoplay; fullscreen; gamepad"
            />
            <aside className="hidden overflow-y-auto border-l border-white/10 bg-[#080D1A] p-6 lg:block">
              <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
                <Trophy size={15} className="text-burgundy" />
                {translate("En hızlı turlar", "Fastest laps")}
              </div>
              {leaderboardList}
              <p className="mt-8 border-t border-white/10 pt-5 text-[9px] uppercase leading-5 tracking-[.14em] text-white/25">
                {translate("Dereceler bu cihazda saklanır. Bir turu tamamladığında tablo otomatik güncellenir.", "Times are stored on this device. The board updates automatically after each completed lap.")}
              </p>
            </aside>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
