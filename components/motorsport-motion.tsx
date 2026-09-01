"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotorsportMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const introDelay = pathname === "/" && !mobile ? 1.45 : 0;
    const animationTargets = Array.from(document.querySelectorAll<HTMLElement>(".gsap-reveal, .hero-title, .hero-kicker, .hero-actions"));

    if (reducedMotion) {
      gsap.set(animationTargets, {
        clearProps: "all",
        opacity: 1,
      });
      return;
    }

    let context: gsap.Context | undefined;
    let heroSafetyTimer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        const homeHero = document.querySelector<HTMLElement>(".home-hero");
        if (homeHero) {
          const heroKicker = document.querySelector<HTMLElement>(".hero-kicker");
          const heroLines = Array.from(document.querySelectorAll<HTMLElement>(".hero-line > span"));
          const heroActions = document.querySelector<HTMLElement>(".hero-actions");
          const heroFocusFrame = document.querySelector<HTMLElement>(".hero-focus-frame");

          if (heroKicker) {
            gsap.set(heroKicker, { opacity: 1, x: 0 });
          }
          if (heroLines.length) {
            gsap.set(heroLines, { yPercent: 0, rotate: 0, skewX: 0 });
          }
          if (heroActions) {
            gsap.set(heroActions, { opacity: 1, y: 0 });
          }
          if (heroFocusFrame) {
            gsap.fromTo(heroFocusFrame, { opacity: 0, scale: 1.035 }, { opacity: 1, scale: 1, duration: mobile ? .75 : 1.25, ease: "power3.out", delay: introDelay + .18 });
          }

          // Browsers can heavily throttle requestAnimationFrame in background tabs.
          // Guarantee that the hero never remains clipped if the entrance timeline is paused.
          heroSafetyTimer = window.setTimeout(() => {
            gsap.killTweensOf([heroKicker, ...heroLines, heroActions, heroFocusFrame].filter(Boolean));
            gsap.set(heroLines, { yPercent: 0, rotate: 0, skewX: 0 });
            if (heroKicker) gsap.set(heroKicker, { opacity: 1, x: 0 });
            if (heroActions) gsap.set(heroActions, { opacity: 1, y: 0 });
            if (heroFocusFrame) gsap.set(heroFocusFrame, { opacity: 1, scale: 1 });
          }, (introDelay + (mobile ? 1.4 : 2.4)) * 1000);

          const heroPreview = document.querySelector<HTMLElement>(".hero-preview");
          if (!mobile && heroPreview) {
            gsap.fromTo(
              heroPreview,
              { opacity: 0, x: 90, rotateY: -12, transformPerspective: 1000 },
              { opacity: 1, x: 0, rotateY: 0, duration: 1.1, ease: "power4.out", delay: introDelay + .25 },
            );
            gsap.to(heroPreview, {
              y: -12,
              rotateZ: .35,
              duration: 3.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: introDelay + 1.25,
            });
          }
        }

        document.querySelectorAll<HTMLElement>(".gsap-reveal:not(.hero-preview)").forEach((element) => {
          const delay = Number(element.dataset.delay ?? 0);
          gsap.fromTo(
            element,
            { opacity: 0, y: mobile ? 18 : 38 },
            {
              opacity: 1,
              y: 0,
              duration: mobile ? 0.55 : 0.85,
              delay: mobile ? Math.min(delay, 0.08) : delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: mobile ? "top 94%" : "top 88%",
                once: true,
              },
            },
          );
        });

        document.querySelectorAll<HTMLElement>(".section-title").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: mobile ? 18 : 28, rotateX: mobile ? 0 : -10, transformPerspective: 900 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: mobile ? .62 : .9,
              ease: "power4.out",
              scrollTrigger: { trigger: element, start: mobile ? "top 94%" : "top 86%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".section-index").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, x: -32, letterSpacing: ".8em" },
            {
              opacity: 1,
              x: 0,
              letterSpacing: ".2em",
              duration: .8,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            },
          );
        });

        if (!mobile) {
          const heroMedia = document.querySelector<HTMLElement>(".hero-media");
          if (homeHero && heroMedia) {
            gsap.fromTo(
            heroMedia,
            { scale: 1.08, yPercent: -2 },
            {
              scale: 1,
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: homeHero,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            },
            );
          }

          document.querySelectorAll<HTMLElement>(".parallax-media").forEach((element) => {
            gsap.to(element, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: element.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          });

          const vehicleLab = document.querySelector<HTMLElement>(".vehicle-lab");
          const vehicleMedia = document.querySelector<HTMLElement>(".vehicle-media");
          const vehicleTitle = document.querySelector<HTMLElement>(".vehicle-title");
          const vehicleWatermark = document.querySelector<HTMLElement>(".vehicle-watermark");
          if (vehicleLab && vehicleMedia) {
            gsap.fromTo(
            vehicleMedia,
            { scale: 1.16, filter: "saturate(.4) contrast(1.18)" },
            {
              scale: 1.03,
              yPercent: 6,
              filter: "saturate(1) contrast(1)",
              ease: "none",
              scrollTrigger: {
                trigger: vehicleLab,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
            );
          }

          if (vehicleLab && vehicleTitle) {
            gsap.fromTo(
            vehicleTitle,
            { xPercent: -10 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: vehicleLab,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
            );
          }

          if (vehicleLab && vehicleWatermark) {
            gsap.fromTo(
            vehicleWatermark,
            { xPercent: -14, opacity: .015 },
            {
              xPercent: 8,
              opacity: .06,
              ease: "none",
              scrollTrigger: {
                trigger: vehicleLab,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            },
            );
          }

          document.querySelectorAll<HTMLElement>(".vehicle-stage").forEach((element) => {
            gsap.fromTo(
              element,
              { opacity: .22, x: 54 },
              {
                opacity: 1,
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top 72%",
                  end: "center 42%",
                  scrub: .7,
                },
              },
            );
          });

          document.querySelectorAll<HTMLElement>(".team-discipline-motion").forEach((element, index) => {
            gsap.fromTo(
              element,
              { xPercent: index % 2 === 0 ? 10 : -6 },
              {
                xPercent: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  end: "top 58%",
                  scrub: .6,
                },
              },
            );
          });

          const raceControl = document.querySelector<HTMLElement>(".race-control");
          const raceControlBoard = document.querySelector<HTMLElement>(".race-control-board");
          if (raceControl && raceControlBoard) {
            gsap.fromTo(
            raceControlBoard,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.15,
              ease: "power4.inOut",
              scrollTrigger: { trigger: raceControl, start: "top 82%", once: true },
            },
            );
          }

          const raceGameStage = document.querySelector<HTMLElement>(".race-game-stage");
          if (raceGameStage) {
            gsap.to(raceGameStage, { y: -10, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
          }

          document.querySelectorAll<HTMLElement>(".gallery-panel").forEach((element, index) => {
            gsap.fromTo(
              element,
              { xPercent: index === 0 ? -18 : 18, scale: .84, rotate: index === 0 ? -2.5 : 2.5 },
              {
                xPercent: 0,
                scale: 1,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: "#gallery",
                  start: "top bottom",
                  end: "center 48%",
                  scrub: .9,
                },
              },
            );
          });

        }

        const scrollProgress = document.querySelector<HTMLElement>(".scroll-progress");
        if (scrollProgress) {
          gsap.to(scrollProgress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
          });
        }

        ScrollTrigger.refresh();
      });

    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (heroSafetyTimer) window.clearTimeout(heroSafetyTimer);
      context?.revert();
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
