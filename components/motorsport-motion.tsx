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
          { opacity: 1, x: 0, duration: 0.65, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-title",
          { opacity: 0, yPercent: 18 },
          { opacity: 1, yPercent: 0, duration: mobile ? 0.75 : 1.05, ease: "power4.out", delay: 0.08 },
        );
        gsap.fromTo(
          ".hero-actions",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.3 },
        );

        document.querySelectorAll<HTMLElement>(".gsap-reveal").forEach((element) => {
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
            { scale: 1.12, clipPath: "inset(8% 6% 8% 6%)" },
            {
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
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
            { y: 70 },
            {
              y: -25,
              ease: "none",
              scrollTrigger: {
                trigger: ".scroll-story",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );

          gsap.to(".kinetic-word", {
            xPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: ".kinetic-strip",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
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
