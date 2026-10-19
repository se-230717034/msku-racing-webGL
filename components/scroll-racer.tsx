"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

const vehicleHeight = 52;
const vehicleWidth = 32;
const activationClicks = 10;
const escapeMessages = ["Yakalayamazsın!", "Basmasana kardeşim!", "Ehliyetin var mı?", "Yeter lan!"];

type EscapePhase = "idle" | "escaping" | "returning";
type EscapePosition = { x: number; y: number; tilt: number; side: "left" | "right" };

const randomMessage = () => escapeMessages[Math.floor(Math.random() * escapeMessages.length)];
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export function ScrollRacer() {
  const [position, setPosition] = useState({ y: 0, percent: 0, visible: false });
  const [escapePhase, setEscapePhase] = useState<EscapePhase>("idle");
  const [escapePosition, setEscapePosition] = useState<EscapePosition>({ x: 0, y: 0, tilt: 0, side: "left" });
  const [escapeMessage, setEscapeMessage] = useState("");
  const railRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const dragOffset = useRef(vehicleHeight / 2);
  const dragFrame = useRef(0);
  const pendingPointerY = useRef(0);
  const pointerStart = useRef({ x: 0, y: 0 });
  const clickCount = useRef(0);
  const normalY = useRef(0);
  const phaseRef = useRef<EscapePhase>("idle");
  const lastEscapeAt = useRef(0);

  const changePhase = useCallback((nextPhase: EscapePhase) => {
    phaseRef.current = nextPhase;
    setEscapePhase(nextPhase);
  }, []);

  const moveEscapeVehicle = useCallback((pointer?: { x: number; y: number }) => {
    const padding = 18;
    const maxX = Math.max(padding, window.innerWidth - vehicleWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - vehicleHeight - padding);

    setEscapePosition((current) => {
      let best = current;
      let bestScore = -1;

      for (let index = 0; index < 14; index += 1) {
        const x = padding + Math.random() * Math.max(1, maxX - padding);
        const y = padding + Math.random() * Math.max(1, maxY - padding);
        const moveDistance = Math.hypot(x - current.x, y - current.y);
        const pointerDistance = pointer ? Math.hypot(x + vehicleWidth / 2 - pointer.x, y + vehicleHeight / 2 - pointer.y) : 0;
        const score = moveDistance + pointerDistance * 1.45;

        if (score > bestScore) {
          bestScore = score;
          best = {
            x: clamp(x, padding, maxX),
            y: clamp(y, padding, maxY),
            tilt: Math.round((Math.random() - .5) * 24),
            side: x > window.innerWidth / 2 ? "left" : "right",
          };
        }
      }

      return best;
    });
    setEscapeMessage(randomMessage());
    lastEscapeAt.current = performance.now();
  }, []);

  const returnToRail = useCallback((message: string) => {
    if (phaseRef.current !== "escaping") return;
    setEscapeMessage(message);
    changePhase("returning");
  }, [changePhase]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const progress = maximum ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      const travel = Math.max(0, window.innerHeight - 112 - vehicleHeight);
      const y = progress * travel;
      normalY.current = y;
      setPosition({ y, percent: Math.round(progress * 100), visible: maximum > 120 });
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

  useEffect(() => {
    if (escapePhase !== "escaping") return;

    let randomTimer = 0;
    let proximityTimer = 0;
    const scheduleRandomMove = () => {
      randomTimer = window.setTimeout(() => {
        if (phaseRef.current !== "escaping") return;
        moveEscapeVehicle();
        scheduleRandomMove();
      }, 1_150 + Math.random() * 850);
    };
    const firstMove = window.setTimeout(() => moveEscapeVehicle(), 180);
    scheduleRandomMove();

    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch" || performance.now() - lastEscapeAt.current < 280) return;
      const rect = vehicleRef.current?.getBoundingClientRect();
      if (!rect) return;
      const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
      if (distance < 145 && !proximityTimer) {
        proximityTimer = window.setTimeout(() => {
          proximityTimer = 0;
          moveEscapeVehicle({ x: event.clientX, y: event.clientY });
        }, 90);
      }
    };
    const onEscapeKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") returnToRail("");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onEscapeKey);
    return () => {
      window.clearTimeout(firstMove);
      window.clearTimeout(randomTimer);
      window.clearTimeout(proximityTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [escapePhase, moveEscapeVehicle, returnToRail]);

  useEffect(() => {
    if (escapePhase !== "returning") return;

    const railRect = railRef.current?.getBoundingClientRect();
    const target = {
      x: railRect ? railRect.left + 1 : window.innerWidth - 37,
      y: railRect ? railRect.top + normalY.current : 88 + normalY.current,
      tilt: 0,
      side: "left" as const,
    };
    const frame = window.requestAnimationFrame(() => setEscapePosition(target));
    const timer = window.setTimeout(() => {
      changePhase("idle");
      setEscapeMessage("");
      clickCount.current = 0;
    }, 950);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [changePhase, escapePhase]);

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
    if (phaseRef.current !== "idle") return;
    const vehicle = (event.target as Element).closest(".scroll-racer-vehicle");
    dragging.current = Boolean(vehicle);
    dragMoved.current = false;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragOffset.current = vehicle ? event.clientY - vehicle.getBoundingClientRect().top : vehicleHeight / 2;
    event.currentTarget.classList.toggle("is-dragging", dragging.current);
    if (!vehicle) {
      event.currentTarget.setPointerCapture(event.pointerId);
      requestPointerScroll(event.clientY, event.currentTarget);
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (phaseRef.current !== "idle" || !dragging.current) return;
    event.preventDefault();
    if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 14) {
      dragMoved.current = true;
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
    const points = event.nativeEvent.getCoalescedEvents?.();
    const latestPoint = points?.[points.length - 1];
    requestPointerScroll(latestPoint?.clientY ?? event.clientY, event.currentTarget);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (phaseRef.current !== "idle") return;
    if (dragFrame.current) {
      window.cancelAnimationFrame(dragFrame.current);
      dragFrame.current = 0;
      scrollFromPointer(event.clientY, event.currentTarget);
    }
    dragging.current = false;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const activateEscape = () => {
    const rect = vehicleRef.current?.getBoundingClientRect();
    if (!rect) return;
    setEscapePosition({
      x: rect.left,
      y: rect.top,
      tilt: 0,
      side: rect.left > window.innerWidth / 2 ? "left" : "right",
    });
    setEscapeMessage(randomMessage());
    lastEscapeAt.current = performance.now();
    changePhase("escaping");
  };

  const onVehicleClick = () => {
    if (phaseRef.current !== "idle") return;
    if (dragMoved.current) return;
    clickCount.current += 1;
    if (clickCount.current < activationClicks) return;
    clickCount.current = 0;
    activateEscape();
  };

  const onVehiclePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (phaseRef.current === "idle") return;
    event.preventDefault();
    event.stopPropagation();
    if (phaseRef.current === "escaping") returnToRail("Tamam lan, pes!");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && phaseRef.current === "escaping") {
      event.preventDefault();
      returnToRail("");
      return;
    }
    if (phaseRef.current !== "idle") return;
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
      ref={railRef}
      className={`scroll-racer${position.visible ? " is-visible" : ""}${escapePhase !== "idle" ? " is-escaping" : ""}${escapePhase === "returning" ? " is-returning" : ""}`}
      role="scrollbar"
      aria-label="Sayfa kaydırma konumu"
      aria-controls="site-main"
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
      style={{
        "--scroll-racer-y": `${position.y}px`,
        "--scroll-racer-escape-x": `${escapePosition.x}px`,
        "--scroll-racer-escape-y": `${escapePosition.y}px`,
        "--scroll-racer-escape-tilt": `${escapePosition.tilt}deg`,
      } as CSSProperties}
    >
      <span className="scroll-racer-track" aria-hidden="true" />
      <button
        type="button"
        ref={vehicleRef}
        className="scroll-racer-vehicle"
        aria-label="Scroll arabası"
        tabIndex={-1}
        onPointerDown={onVehiclePointerDown}
        onClick={onVehicleClick}
      >
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
      </button>
      {escapePhase !== "idle" && escapeMessage ? (
        <span
          className={`scroll-racer-message is-${escapePosition.side}`}
          role="status"
          aria-live="polite"
          style={{
            "--scroll-racer-message-x": `${escapePosition.x}px`,
            "--scroll-racer-message-y": `${escapePosition.y}px`,
          } as CSSProperties}
        >
          {escapeMessage}
        </span>
      ) : null}
    </div>
  );
}
