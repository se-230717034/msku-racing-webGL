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

    if (reducedMotion) {
      gsap.set(".gsap-reveal, .hero-title, .hero-kicker, .hero-actions", {
        clearProps: "all",
        opacity: 1,
      });
      return;
    }

    let context: gsap.Context | undefined;
    const frame = window.requestAnimationFrame(() => {
      context = gsap.context(() => {
        gsap.fromTo(
          ".hero-kicker",
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.65, ease: "power3.out", delay: introDelay },
        );
        gsap.fromTo(
          ".hero-line > span",
          { yPercent: 112, rotate: mobile ? 0 : 4, skewX: mobile ? 0 : -6 },
          { yPercent: 0, rotate: 0, skewX: 0, duration: mobile ? 0.78 : 1.08, stagger: .12, ease: "power4.out", delay: introDelay + .04 },
        );
        gsap.fromTo(
          ".hero-actions",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: introDelay + .32 },
        );

        if (!mobile) {
          gsap.fromTo(
            ".hero-preview",
            { opacity: 0, x: 90, rotateY: -12, transformPerspective: 1000 },
            { opacity: 1, x: 0, rotateY: 0, duration: 1.1, ease: "power4.out", delay: introDelay + .25 },
          );
          gsap.to(".hero-preview", {
            y: -12,
            rotateZ: .35,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: introDelay + 1.25,
          });
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
            { clipPath: "inset(0 0 100% 0)", yPercent: 24, rotateX: mobile ? 0 : -18, transformPerspective: 900 },
            {
              clipPath: "inset(0 0 0% 0)",
              yPercent: 0,
              rotateX: 0,
              duration: mobile ? .7 : 1.05,
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
          gsap.fromTo(
            ".hero-media",
            { scale: 1.08, yPercent: -2 },
            {
              scale: 1,
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );

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

          gsap.fromTo(
            ".story-media",
            { scale: 1.22, clipPath: "inset(14% 9% 14% 9%)", filter: "saturate(.35) contrast(1.18)" },
            {
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "saturate(1) contrast(1)",
              ease: "none",
              scrollTrigger: {
                trigger: ".scroll-story",
                start: "top 85%",
                end: "bottom 35%",
                scrub: 0.8,
              },
            },
          );

          gsap.fromTo(
            ".story-copy",
            { y: 130, rotateX: -8, transformPerspective: 900 },
            {
              y: -35,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".scroll-story",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );

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

        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.25,
          },
        });

        ScrollTrigger.refresh();
      });

    });

    return () => {
      window.cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
