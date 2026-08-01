"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
const vehicleHeight = 52;

export function ScrollRacer() {
  const [position, setPosition] = useState({ y: 0, percent: 0, visible: false });
  const dragging = useRef(false);
  const dragOffset = useRef(vehicleHeight / 2);
  const dragFrame = useRef(0);
  const pendingPointerY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const progress = maximum ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      const travel = Math.max(0, window.innerHeight - 112 - vehicleHeight);
      setPosition({ y: progress * travel, percent: Math.round(progress * 100), visible: maximum > 120 });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (dragFrame.current) window.cancelAnimationFrame(dragFrame.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollFromPointer = (clientY: number, rail: HTMLDivElement) => {
    const rect = rail.getBoundingClientRect();
    const travel = Math.max(1, rect.height - vehicleHeight);
    const progress = Math.min(1, Math.max(0, (clientY - rect.top - dragOffset.current) / travel));
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    rail.style.setProperty("--scroll-racer-y", `${progress * travel}px`);
    window.scrollTo({ top: progress * maximum, behavior: dragging.current ? "instant" : "smooth" });
  };

  const requestPointerScroll = (clientY: number, rail: HTMLDivElement) => {
    pendingPointerY.current = clientY;
    if (dragFrame.current) return;
    dragFrame.current = window.requestAnimationFrame(() => {
      dragFrame.current = 0;
      scrollFromPointer(pendingPointerY.current, rail);
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const vehicle = (event.target as Element).closest(".scroll-racer-vehicle");
    dragging.current = Boolean(vehicle);
    dragOffset.current = vehicle ? event.clientY - vehicle.getBoundingClientRect().top : vehicleHeight / 2;
    event.currentTarget.classList.toggle("is-dragging", dragging.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    requestPointerScroll(event.clientY, event.currentTarget);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    event.preventDefault();
    const points = event.nativeEvent.getCoalescedEvents?.();
    const latestPoint = points?.[points.length - 1];
    requestPointerScroll(latestPoint?.clientY ?? event.clientY, event.currentTarget);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragFrame.current) {
      window.cancelAnimationFrame(dragFrame.current);
      dragFrame.current = 0;
      scrollFromPointer(event.clientY, event.currentTarget);
    }
    dragging.current = false;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowUp: -80,
      ArrowDown: 80,
      PageUp: -window.innerHeight * .82,
      PageDown: window.innerHeight * .82,
      Home: -document.documentElement.scrollHeight,
      End: document.documentElement.scrollHeight,
    };
    const distance = steps[event.key];
    if (distance === undefined) return;
    event.preventDefault();
    window.scrollBy({ top: distance, behavior: "smooth" });
  };

  return (
    <div
      className={`scroll-racer${position.visible ? " is-visible" : ""}`}
      role="scrollbar"
      aria-label="Sayfa kaydırma konumu"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position.percent}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
      style={{ "--scroll-racer-y": `${position.y}px` } as CSSProperties}
    >
      <span className="scroll-racer-track" aria-hidden="true" />
      <span className="scroll-racer-vehicle" aria-hidden="true">
        <span className="formula-wing formula-wing-rear" />
        <span className="formula-wheel formula-wheel-rear-left" />
        <span className="formula-wheel formula-wheel-rear-right" />
        <span className="formula-sidepod formula-sidepod-left" />
        <span className="formula-sidepod formula-sidepod-right" />
        <span className="formula-body">
          <span className="formula-engine-cover" />
          <span className="formula-cockpit" />
          <small>48</small>
          <span className="formula-nose" />
        </span>
        <span className="formula-wheel formula-wheel-front-left" />
        <span className="formula-wheel formula-wheel-front-right" />
        <span className="formula-wing formula-wing-front" />
      </span>
    </div>
  );
}
