"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function RaceIntro() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reducedMotion || mobile) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const progress = { value: 0 };
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };
    const safetyTimer = window.setTimeout(finish, 3600);

    const context = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: finish,
      })
        .fromTo(".race-intro-mark", { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: .72 })
        .fromTo(".race-intro-rule", { scaleX: 0 }, { scaleX: 1, duration: .65 }, .08)
        .to(progress, {
          value: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
          },
        }, 0)
        .to(".race-intro-mark", { yPercent: -120, opacity: 0, duration: .62 }, 1.08)
        .to(".race-intro-meta", { opacity: 0, x: 30, duration: .35 }, 1.08)
        .to(".race-intro-panel-top", { yPercent: -102, duration: .82 }, 1.2)
        .to(".race-intro-panel-bottom", { yPercent: 102, duration: .82 }, 1.2)
        .to(".race-intro-flash", { scaleX: 1, opacity: 1, duration: .25, ease: "power2.out" }, 1.3)
        .to(".race-intro-flash", { opacity: 0, duration: .3 }, 1.55);
    }, root);

    return () => {
      window.clearTimeout(safetyTimer);
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className="race-intro" aria-hidden="true">
      <div className="race-intro-panel race-intro-panel-top" />
      <div className="race-intro-panel race-intro-panel-bottom" />
      <div className="race-intro-flash" />
      <div className="race-intro-content">
        <div className="overflow-hidden">
          <p className="race-intro-mark">MSKU <span>RACING</span></p>
        </div>
        <div className="race-intro-rule" />
        <div className="race-intro-meta">
          <span>FORMULA STUDENT / MUĞLA</span>
          <span ref={counter}>000</span>
        </div>
      </div>
    </div>
  );
}
