"use client";

import { ArrowRight, Flag, Gauge, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";

type LaunchPhase = "idle" | "countdown" | "launching";

const START_LIGHT_COUNT = 5;
const LIGHT_INTERVAL_MS = 360;

export function GamePreview() {
  const { translate } = useLanguage();
  const [phase, setPhase] = useState<LaunchPhase>("idle");
  const [litLights, setLitLights] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const startRace = () => {
    if (phase !== "idle") return;

    setPhase("countdown");

    for (let index = 1; index <= START_LIGHT_COUNT; index += 1) {
      timers.current.push(
        window.setTimeout(() => setLitLights(index), index * LIGHT_INTERVAL_MS),
      );
    }

    const lightsOutAt = (START_LIGHT_COUNT + 1) * LIGHT_INTERVAL_MS;

    timers.current.push(
      window.setTimeout(() => {
        setLitLights(0);
        setPhase("launching");
      }, lightsOutAt),
    );

    timers.current.push(
      window.setTimeout(() => window.location.assign("/game/"), lightsOutAt + 620),
    );
  };

  return (
    <div className={`race-game-launch race-game-compact is-${phase}`}>
      <div className="race-game-grid" aria-hidden="true" />
      <div className="race-game-scan" aria-hidden="true" />

      <div className="race-game-content">
        <div className="race-game-topline">
          <div className="race-game-brand">
            <span className="race-game-brand-mark"><Flag size={15} /></span>
            <span>MSKU RACING GAME</span>
          </div>
          <span className="race-game-platform">
            <span className="race-game-platform-dot" />
            UNITY WEBGL
          </span>
        </div>

        <div className="race-game-main">
          <div className="race-game-copy">
            <span className="race-game-kicker">
              <Zap size={13} /> FORMULA STUDENT
            </span>
            <h2>
              {translate("Dijital pist", "The digital track")}
              <span>{translate("seni bekliyor.", "is waiting.")}</span>
            </h2>
            <p>
              {translate(
                "Start ışıklarını takip et, ardından MSKU Racing deneyimine geç.",
                "Follow the start lights, then enter the MSKU Racing experience.",
              )}
            </p>
          </div>

          <div className="race-game-schematic" aria-hidden="true">
            <span className="race-game-number">48</span>
            <svg className="race-game-circuit" viewBox="0 0 360 220">
              <path d="M20 156c27-82 80-124 154-123 55 1 95 25 132 72 24 30 31 65 8 87-24 24-69 12-96-8-34-25-61-22-90 1-37 29-88 14-108-29Z" />
            </svg>
            <svg className="race-game-formula" viewBox="0 0 520 230">
              <g className="race-game-formula-glow">
                <path d="M91 44h55l28 20h171l29-20h55M91 186h55l28-20h171l29 20h55" />
              </g>
              <g className="race-game-formula-wheels">
                <rect x="88" y="38" width="70" height="43" rx="10" />
                <rect x="88" y="149" width="70" height="43" rx="10" />
                <rect x="372" y="28" width="58" height="56" rx="11" />
                <rect x="372" y="146" width="58" height="56" rx="11" />
              </g>
              <g className="race-game-formula-body">
                <path d="M42 92h92l41-20 94-12 83 23 72 9v46l-72 9-83 23-94-12-41-20H42Z" />
                <path d="M175 72 231 24h66l55 59-20 64-35 59h-66l-56-48 25-43Z" />
                <path d="M241 74h47l28 41-28 41h-47l-26-41Z" />
                <path d="M16 82h76v66H16M430 76h76v78h-76" />
                <path d="m240 76 13-31h24l13 31M239 154l14 31h24l13-31" />
              </g>
              <text x="254" y="123">48</text>
            </svg>
            <div className="race-game-schematic-label">
              <span>MSKU</span>
              <i />
              <span>RACING</span>
            </div>
          </div>
        </div>

        <div className="race-game-launchpad">
          <div className="race-start-lights" aria-label={translate("Yarış başlangıç ışıkları", "Race start lights")}>
            {Array.from({ length: START_LIGHT_COUNT }, (_, index) => (
              <span key={index} className={index < litLights ? "is-lit" : ""} aria-hidden="true" />
            ))}
          </div>

          <button className="race-game-button" type="button" onClick={startRace} disabled={phase !== "idle"}>
            <span className="race-game-button-icon"><Gauge size={18} /></span>
            <span>
              <small>MSKU RACING</small>
              {phase === "idle"
                ? translate("Yarışı Başlat", "Start the Race")
                : phase === "countdown"
                  ? translate("Işıkları Bekle", "Watch the Lights")
                  : translate("Piste Çıkılıyor", "Entering the Track")}
            </span>
            <ArrowRight className="race-game-button-arrow" size={18} />
          </button>
        </div>
      </div>

      <div className={`race-game-transition ${phase === "launching" ? "is-visible" : ""}`} aria-live="polite">
        <div className="race-game-transition-mark"><Flag size={22} /></div>
        <p>MSKU RACING GAME</p>
        <strong>{translate("Yarış hazırlanıyor", "Preparing the race")}</strong>
        <span className="race-game-transition-line"><i /></span>
      </div>
    </div>
  );
}
