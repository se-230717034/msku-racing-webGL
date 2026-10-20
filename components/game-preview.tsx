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
      window.setTimeout(() => {
        window.location.assign("/game/");
      }, lightsOutAt + 620),
    );
  };

  return (
    <div className={`race-game-launch is-${phase}`}>
      <Image
        className="race-game-car"
        src="/images/msku-racing-hero.png"
        alt={translate("MSKU Racing Formula Student aracı", "MSKU Racing Formula Student car")}
        fill
        priority
        sizes="(min-width: 1024px) 58vw, 100vw"
      />

      <div className="race-game-shade" aria-hidden="true" />
      <div className="race-game-grid" aria-hidden="true" />
      <div className="race-game-scan" aria-hidden="true" />

      <svg className="race-game-telemetry" viewBox="0 0 720 420" aria-hidden="true">
        <path d="M0 312H82L118 276H191L225 322H303L337 242H401L438 290H515L548 214H612L646 249H720" />
        <path d="M0 344H121L151 320H278L305 350H465L496 324H720" />
      </svg>

      <svg className="race-game-track" viewBox="0 0 190 126" aria-hidden="true">
        <path d="M26 83c-15-19-13-47 7-60 18-12 43-8 56 9 10 13 8 27 20 36 11 8 25 2 34 10 13 12 7 32-8 38-18 7-33-8-48-5-18 4-43-9-61-28Z" />
      </svg>

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

        <div className="race-game-copy">
          <span className="race-game-kicker">
            <Zap size={13} /> FORMULA STUDENT
          </span>
          <h2>
            {translate("Takım ruhunu", "Take the team spirit")}
            <span>{translate("piste taşı.", "to the track.")}</span>
          </h2>
          <p>
            {translate(
              "MSKU Racing aracının kokpitine geç ve yarış deneyimini başlat.",
              "Step into the MSKU Racing cockpit and start the racing experience.",
            )}
          </p>
        </div>

        <div className="race-game-launchpad">
          <div className="race-start-lights" aria-label={translate("Yarış başlangıç ışıkları", "Race start lights")}>
            {Array.from({ length: START_LIGHT_COUNT }, (_, index) => (
              <span
                key={index}
                className={index < litLights ? "is-lit" : ""}
                aria-hidden="true"
              />
            ))}
          </div>

          <button
            className="race-game-button"
            type="button"
            onClick={startRace}
            disabled={phase !== "idle"}
          >
            <span className="race-game-button-icon"><Gauge size={20} /></span>
            <span>
              <small>MSKU RACING</small>
              {phase === "idle"
                ? translate("Yarışı Başlat", "Start the Race")
                : phase === "countdown"
                  ? translate("Işıkları Bekle", "Watch the Lights")
                  : translate("Piste Çıkılıyor", "Entering the Track")}
            </span>
            <ArrowRight className="race-game-button-arrow" size={19} />
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
