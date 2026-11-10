"use client";

import { useEffect, useRef } from "react";

const RACE_SEQUENCE = ["R", "A", "C", "E"] as const;
const MAX_KEY_INTERVAL_MS = 2_000;
const DESKTOP_MIN_WIDTH = 1_024;

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])') !== null
  );
}

type UseRaceSequenceOptions = {
  disabled?: boolean;
};

export function useRaceSequence(onMatch: () => void, { disabled = false }: UseRaceSequenceOptions = {}) {
  const onMatchRef = useRef(onMatch);

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    const desktopInput = window.matchMedia("(hover: hover) and (pointer: fine)");
    let sequenceIndex = 0;
    let lastKeyAt = 0;

    const resetSequence = () => {
      sequenceIndex = 0;
      lastKeyAt = 0;
    };

    const isDesktopEligible = () => window.innerWidth >= DESKTOP_MIN_WIDTH && desktopInput.matches;

    const handleEligibilityChange = () => {
      if (!isDesktopEligible()) resetSequence();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        disabled ||
        !isDesktopEligible() ||
        event.repeat ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      const key = event.key.toUpperCase();
      if (key.length !== 1) {
        resetSequence();
        return;
      }

      const now = performance.now();
      if (sequenceIndex > 0 && now - lastKeyAt > MAX_KEY_INTERVAL_MS) resetSequence();

      if (key === RACE_SEQUENCE[sequenceIndex]) {
        sequenceIndex += 1;
        lastKeyAt = now;

        if (sequenceIndex === RACE_SEQUENCE.length) {
          resetSequence();
          onMatchRef.current();
        }
        return;
      }

      sequenceIndex = key === RACE_SEQUENCE[0] ? 1 : 0;
      lastKeyAt = sequenceIndex === 1 ? now : 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleEligibilityChange);
    desktopInput.addEventListener("change", handleEligibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleEligibilityChange);
      desktopInput.removeEventListener("change", handleEligibilityChange);
    };
  }, [disabled]);
}
