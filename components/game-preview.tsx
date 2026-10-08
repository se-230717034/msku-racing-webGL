"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, Flag, Gamepad2, Gauge, Paintbrush, Play, Trophy, UserRound, X } from "lucide-react";
import { useLanguage } from "./language-provider";

type LapRecord = {
  id: string;
  driver: string;
  time: number;
};

type GameStage = "closed" | "name" | "loading" | "playing";
type LiveryId = "burgundy" | "navy" | "white";

const leaderboardKey = "msku-racing-game-leaderboard";
const driverKey = "msku-racing-game-driver";
const liveryKey = "msku-racing-game-livery";
const liveryOptions: Array<{ id: LiveryId; tr: string; en: string; colors: [string, string, string] }> = [
  { id: "burgundy", tr: "Kırmızı / Siyah", en: "Red / Black", colors: ["#A70C30", "#080D1A", "#F5F4EF"] },
  { id: "navy", tr: "Lacivert / Kırmızı", en: "Navy / Red", colors: ["#252B87", "#A70C30", "#F5F4EF"] },
  { id: "white", tr: "Beyaz / Kırmızı", en: "White / Red", colors: ["#F5F4EF", "#A70C30", "#252B87"] },
];

function formatLapTime(time: number) {
  return `${time.toFixed(1)} sn`;
}

export function GamePreview() {
  const { translate } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingStartedAtRef = useRef(0);
  const readyTimerRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [gameStage, setGameStage] = useState<GameStage>("closed");
  const [driver, setDriver] = useState("");
  const [livery, setLivery] = useState<LiveryId>("burgundy");
  const [nameError, setNameError] = useState("");
  const [leaderboard, setLeaderboard] = useState<LapRecord[]>([]);

  const returnHome = useCallback(() => {
    if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
    readyTimerRef.current = null;
    setGameStage("closed");
    window.history.replaceState(null, "", "/");
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const scrollHome = () => window.scrollTo({ top: 0, behavior: "auto" });
    scrollHome();
    window.requestAnimationFrame(scrollHome);
    window.setTimeout(() => {
      scrollHome();
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = "auto";
    }, 120);
  }, []);

  useEffect(() => {
    setMounted(true);

    try {
      const savedDriver = window.localStorage.getItem(driverKey);
      const savedLivery = window.localStorage.getItem(liveryKey);
      const savedLeaderboard = JSON.parse(window.localStorage.getItem(leaderboardKey) ?? "[]") as LapRecord[];
      if (savedDriver) setDriver(savedDriver);
      if (savedLivery && liveryOptions.some((option) => option.id === savedLivery)) setLivery(savedLivery as LiveryId);
      if (Array.isArray(savedLeaderboard)) setLeaderboard(savedLeaderboard.slice(0, 8));
    } catch {
      // The game stays playable even when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (gameStage === "closed") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") returnHome();
    };
    const closeOnBack = () => returnHome();
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("popstate", closeOnBack);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("popstate", closeOnBack);
    };
  }, [gameStage, returnHome]);

  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;

      if (event.data?.type === "msku-racing:game-ready") {
        const remainingDelay = Math.max(0, 900 - (Date.now() - loadingStartedAtRef.current));
        if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
        readyTimerRef.current = window.setTimeout(() => {
          setGameStage((current) => current === "loading" ? "playing" : current);
        }, remainingDelay);
        return;
      }

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

    window.addEventListener("message", handleGameMessage);
    return () => {
      window.removeEventListener("message", handleGameMessage);
      if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
    };
  }, [driver]);

  const openDriverPrompt = () => {
    setNameError("");
    window.history.scrollRestoration = "manual";
    window.history.pushState({ mskuRacingGame: true }, "", "#game");
    setGameStage("name");
  };

  const closeGame = returnHome;

  const launchGame = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedDriver = driver.trim().replace(/\s+/g, " ").slice(0, 18);
    if (normalizedDriver.length < 2) {
      setNameError(translate("Lütfen en az 2 karakterlik bir pilot adı gir.", "Enter a driver name with at least 2 characters."));
      return;
    }

    setDriver(normalizedDriver);
    setNameError("");
    try {
      window.localStorage.setItem(driverKey, normalizedDriver);
      window.localStorage.setItem(liveryKey, livery);
    } catch {
      // The game still launches when browser storage is unavailable.
    }
    loadingStartedAtRef.current = Date.now();
    setGameStage("loading");
  };

  const leaderboardList = (
    <div className="space-y-2">
      {leaderboard.length ? leaderboard.slice(0, 5).map((record, index) => (
        <div key={record.id} className="game-leaderboard-row grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-white/10 pb-2 text-xs">
          <span className="font-display text-burgundy">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate font-semibold uppercase tracking-[.08em] text-white/70">{record.driver}</span>
          <strong className="font-mono text-white">{formatLapTime(record.time)}</strong>
        </div>
      )) : (
        <p className="game-leaderboard-empty py-3 text-xs leading-5 text-white/35">
          {translate("İlk tur zamanını sen kaydet.", "Set the first lap time.")}
        </p>
      )}
    </div>
  );

  return (
    <>
      <div className="carbon-subtle game-preview game-preview-panel relative min-h-[360px] overflow-hidden border backdrop-blur-md md:min-h-[420px]">
        <div className="game-preview-grid absolute inset-0 bg-grid-dark bg-[size:40px_40px] opacity-25" />
        <div className="absolute -right-12 top-16 size-44 rounded-full border border-university/25" />
        <div className="absolute -right-4 top-24 size-28 rounded-full border border-burgundy/30" />

        <div className="relative z-10 flex min-h-[360px] flex-col p-6 md:min-h-[420px] md:p-8">
          <div className="game-preview-divider flex items-start justify-between gap-5 border-b pb-5">
            <div>
              <div className="flex items-center gap-3">
                <Gamepad2 size={18} className="text-burgundy" />
                <p className="game-preview-muted text-[10px] font-bold uppercase tracking-[.28em]">MSKU RACING GAME</p>
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
              <div className="game-preview-icon grid size-20 place-items-center border border-university/40 shadow-[0_0_60px_rgba(37,43,135,.3)]">
                <Flag size={30} />
              </div>
              <p className="game-preview-muted mt-4 text-xs leading-5">
                {translate("MSKU renklerindeki Formula aracınla en hızlı turu at.", "Set the fastest lap in an MSKU-liveried Formula car.")}
              </p>
            </div>

            <div className="game-leaderboard border p-4">
              <div className="game-preview-muted mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em]">
                <Trophy size={13} className="text-burgundy" />
                {translate("Yerel liderlik tablosu", "Local leaderboard")}
              </div>
              {leaderboardList}
            </div>
          </div>

          <div className="game-preview-divider flex items-center justify-between gap-4 border-t pt-5">
            <p className="game-preview-muted hidden text-[9px] font-bold uppercase tracking-[.16em] sm:block">
              {translate("Pilot adını oyun açılırken belirle", "Choose your driver name before the race")}
            </p>
            <button
              type="button"
              onClick={openDriverPrompt}
              className="ml-auto inline-flex items-center justify-center gap-3 bg-burgundy px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#c10f39]"
            >
              {translate("Oyna", "Play")} <Play size={14} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {mounted && gameStage !== "closed" && createPortal(
        <div className="game-session fixed inset-0 z-[100] flex flex-col" role="dialog" aria-modal="true" aria-label={translate("MSKU Racing oyunu", "MSKU Racing game")}>
          {gameStage === "name" ? (
            <div className="game-start-screen flex min-h-full items-center justify-center overflow-y-auto p-5">
              <div className="game-start-orbit game-start-orbit-one" />
              <div className="game-start-orbit game-start-orbit-two" />
              <button type="button" onClick={closeGame} className="game-start-close absolute right-5 top-5 grid size-11 place-items-center border transition md:right-8 md:top-8" aria-label={translate("Oyunu kapat", "Close game")}>
                <X size={19} />
              </button>

              <form onSubmit={launchGame} className="game-start-dialog relative z-10 w-full max-w-xl border p-6 sm:p-9">
                <div className="mb-8 flex items-center justify-between gap-5 border-b pb-6">
                  <div className="flex items-center gap-4">
                    <div className="game-start-badge grid size-12 place-items-center border">
                      <Flag size={21} />
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold uppercase leading-none sm:text-2xl">MSKU Racing</p>
                      <p className="game-start-muted mt-2 text-[8px] font-bold uppercase tracking-[.24em]">Garajdan Piste</p>
                    </div>
                  </div>
                  <span className="game-start-step font-mono text-[9px] font-bold uppercase tracking-[.16em]">01 / 01</span>
                </div>

                <div className="mb-7">
                  <div className="mb-4 flex items-center gap-3">
                    <UserRound size={18} className="text-burgundy" />
                    <h2 className="font-display text-2xl font-semibold uppercase tracking-[-.03em] sm:text-3xl">
                      {translate("Pilot adını belirle", "Choose your driver name")}
                    </h2>
                  </div>
                  <p className="game-start-muted max-w-md text-sm leading-6">
                    {translate("Tur derecen bu isimle yerel liderlik tablosuna yazılacak.", "Your lap time will appear under this name on the local leaderboard.")}
                  </p>
                </div>

                <label className="game-start-label mb-2 block text-[9px] font-bold uppercase tracking-[.2em]" htmlFor="game-driver-name">
                  {translate("Pilot adı", "Driver name")}
                </label>
                <input
                  id="game-driver-name"
                  value={driver}
                  maxLength={18}
                  minLength={2}
                  required
                  autoFocus
                  autoComplete="nickname"
                  onChange={(event) => {
                    setDriver(event.target.value);
                    if (nameError) setNameError("");
                  }}
                  className="game-start-input w-full border px-4 py-4 text-sm font-semibold uppercase tracking-[.12em] outline-none transition"
                  placeholder={translate("Örn. Muğla Pilot", "E.g. Mugla Driver")}
                  aria-describedby={nameError ? "game-driver-error" : undefined}
                />
                {nameError && <p id="game-driver-error" className="mt-2 text-xs font-semibold text-burgundy">{nameError}</p>}

                <fieldset className="mt-5">
                  <legend className="game-start-label mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.2em]">
                    <Paintbrush size={13} className="text-burgundy" />
                    {translate("Araç kaplaması", "Car livery")}
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {liveryOptions.map((option) => (
                      <label key={option.id} className={`game-livery-option${livery === option.id ? " is-selected" : ""}`}>
                        <input
                          type="radio"
                          name="game-livery"
                          value={option.id}
                          checked={livery === option.id}
                          onChange={() => setLivery(option.id)}
                          className="sr-only"
                        />
                        <span className="game-livery-swatches" aria-hidden="true">
                          {option.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
                        </span>
                        <span>{translate(option.tr, option.en)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button type="submit" className="mt-5 inline-flex w-full items-center justify-between bg-burgundy px-5 py-4 text-[10px] font-bold uppercase tracking-[.19em] text-white transition hover:bg-[#c10f39]">
                  <span className="flex items-center gap-2"><Gauge size={16} /> {translate("Pisteye çık", "Enter the track")}</span>
                  <ChevronRight size={17} />
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#080D1A] px-4 text-white md:px-6">
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
                <button type="button" onClick={closeGame} className="grid size-10 place-items-center border border-white/15 transition hover:border-burgundy" aria-label={translate("Oyunu kapat", "Close game")}>
                  <X size={18} />
                </button>
              </div>

              <div className="relative grid min-h-0 flex-1 bg-[#03060D] lg:grid-cols-[1fr_290px]">
                <iframe
                  ref={iframeRef}
                  src={`/game/index.html?livery=${livery}`}
                  title={translate("MSKU Racing - Garajdan Piste", "MSKU Racing - From garage to track")}
                  className="h-full min-h-[420px] w-full border-0 bg-black"
                  allow="autoplay; fullscreen; gamepad"
                />
                <aside className="hidden overflow-y-auto border-l border-white/10 bg-[#080D1A] p-6 text-white lg:block">
                  <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
                    <Trophy size={15} className="text-burgundy" />
                    {translate("En hızlı turlar", "Fastest laps")}
                  </div>
                  {leaderboardList}
                  <p className="mt-8 border-t border-white/10 pt-5 text-[9px] uppercase leading-5 tracking-[.14em] text-white/25">
                    {translate("Dereceler bu cihazda saklanır. Bir turu tamamladığında tablo otomatik güncellenir.", "Times are stored on this device. The board updates automatically after each completed lap.")}
                  </p>
                </aside>

                {gameStage === "loading" && (
                  <div className="game-session-loader absolute inset-0 z-20 grid place-items-center" aria-live="polite">
                    <div className="w-[min(82vw,420px)] text-center">
                      <div className="mx-auto mb-6 grid size-16 place-items-center border border-white/15 bg-white/[.04]">
                        <Flag size={27} className="text-burgundy" />
                      </div>
                      <p className="font-display text-2xl font-semibold uppercase tracking-[-.03em] text-white sm:text-3xl">
                        {translate("Garajdan piste", "From garage to track")}
                      </p>
                      <p className="mt-3 text-[9px] font-bold uppercase tracking-[.24em] text-white/40">
                        {translate("Yarış oturumu hazırlanıyor", "Preparing race session")}
                      </p>
                      <div className="game-session-loader-track mt-7 h-1 overflow-hidden bg-white/10">
                        <span className="block h-full bg-burgundy" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
