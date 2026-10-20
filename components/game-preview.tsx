"use client";

import Image from "next/image";
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

          <div className="race-game-gameplay">
            <Image
              className="race-game-gameplay-image"
              src="/images/msku-racing-gameplay.png"
              alt={translate("MSKU Racing oyununun yarış pisti", "The race track in the MSKU Racing game")}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
            <div className="race-game-gameplay-shade" aria-hidden="true" />
            <span className="race-game-gameplay-label">
              <i /> {translate("Oyun içi görüntü", "In-game footage")}
            </span>
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
