"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRaceSequence } from "@/hooks/use-race-sequence";
import styles from "./race-easter-egg.module.css";

type RacePhase = "initializing" | "ignition" | "lights" | "final" | "exit";

const phaseClass = (phase: RacePhase, target: RacePhase) =>
  `${styles.stage} ${phase === target ? styles.stageActive : ""}`;

export function RaceEasterEgg() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<RacePhase>("initializing");
  const [litLights, setLitLights] = useState(0);
  const [lightsGreen, setLightsGreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const activate = useCallback(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPhase("initializing");
    setLitLights(0);
    setLightsGreen(false);
    setActive(true);
  }, []);

  useRaceSequence(activate, { disabled: active });

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayRef.current?.focus({ preventScroll: true });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setActive(false);
    };

    window.addEventListener("keydown", handleEscape, true);

    const timers = [
      window.setTimeout(() => setPhase("ignition"), 1_400),
      window.setTimeout(() => setPhase("lights"), 4_200),
      window.setTimeout(() => setPhase("final"), 6_600),
      window.setTimeout(() => setPhase("exit"), 8_600),
      window.setTimeout(() => setActive(false), 9_100),
    ];

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("keydown", handleEscape, true);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [active]);

  useEffect(() => {
    if (phase !== "lights") {
      setLitLights(0);
      setLightsGreen(false);
      return;
    }

    const timers = [
      window.setTimeout(() => setLitLights(1), 180),
      window.setTimeout(() => setLitLights(2), 630),
      window.setTimeout(() => setLitLights(3), 1_080),
      window.setTimeout(() => {
        setLitLights(0);
        setLightsGreen(true);
      }, 1_600),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  if (!mounted || !active) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${phase === "exit" ? styles.exit : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="MSKU Racing sinematik yarış animasyonu"
      tabIndex={-1}
    >
      <div className={styles.frame} aria-hidden="true" />
      <div className={styles.meta} aria-hidden="true">
        <span className={styles.metaMark} />
        <span>MSKU RACING / RACE PROTOCOL</span>
      </div>
      <div className={styles.counter} aria-hidden="true">48 / FORMULA STUDENT</div>

      {phase === "initializing" ? <div className={styles.scanLine} aria-hidden="true" /> : null}

      <div className={phaseClass(phase, "initializing")} aria-hidden={phase !== "initializing"}>
        <div className={styles.initializing} lang="en"><strong>●</strong>INITIALIZING RACE PROTOCOL...</div>
      </div>

      <div className={phaseClass(phase, "ignition")} aria-hidden={phase !== "ignition"}>
        <div className={styles.ignitionHalo} aria-hidden="true" />
        <p className={styles.brandKicker}>Formula Student · 48</p>
        <h2 className={styles.brandTitle}>MSKU RACING</h2>
        <p className={styles.brandSubtitle} lang="en">ENGINEERED TO COMPETE.</p>
      </div>

      <div className={phaseClass(phase, "lights")} aria-hidden={phase !== "lights"}>
        <p className={styles.lightsLabel} lang="en">START SEQUENCE</p>
        <div className={styles.lights} aria-label={lightsGreen ? "3 yeşil başlangıç ışığı yanıyor" : `${litLights} kırmızı başlangıç ışığı yanıyor`}>
          {[1, 2, 3].map((light) => (
            <span
              key={light}
              className={`${styles.light} ${litLights >= light ? styles.lightOn : ""} ${lightsGreen ? styles.lightGreen : ""}`}
            />
          ))}
        </div>
      </div>

      <div className={phaseClass(phase, "final")} aria-hidden={phase !== "final"}>
        <div className={styles.finalCopy}>
          <span className={styles.finalLine} lang="en">BORN TO ENGINEER.</span>
          <span className={`${styles.finalLine} ${styles.finalLineRed}`} lang="en">BUILT TO RACE.</span>
          <div className={styles.finalRule} aria-hidden="true" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
