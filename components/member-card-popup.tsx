"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const images = [
  "/images/team-card/team-card-1.jpg",
  "/images/team-card/team-card-2.jpg",
];

const storageKey = "msku-racing-member-card-popup-v1-dismissed-at";
const displayCooldown = 7 * 24 * 60 * 60 * 1_000;

export function MemberCardPopup() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const closePopup = useCallback(() => {
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Closing the popup should never depend on browser storage.
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);

    let shouldOpen = true;
    try {
      const dismissedAt = Number(window.localStorage.getItem(storageKey));
      shouldOpen = !Number.isFinite(dismissedAt) || Date.now() - dismissedAt >= displayCooldown;
    } catch {
      // The announcement can still be shown when browser storage is unavailable.
    }

    if (!shouldOpen) return;
    const hasDesktopIntro = window.matchMedia("(min-width: 768px)").matches;
    const timer = window.setTimeout(() => setIsOpen(true), hasDesktopIntro ? 2_450 : 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
      if (event.key === "ArrowLeft") setActiveSlide((current) => (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveSlide((current) => (current + 1) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, 5_000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % images.length);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="member-card-popup fixed inset-0 z-[200] grid place-items-center bg-[#03060d]/85 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="MSKU Racing üye kartı duyurusu"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div className="member-card-popup-panel relative w-[min(92vw,560px)] overflow-hidden border border-white/15 bg-[#080d1a] shadow-[0_32px_120px_rgba(0,0,0,.68)]">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-20 grid size-11 place-items-center border border-white/25 bg-[#080d1a]/80 text-white backdrop-blur-md transition hover:border-burgundy hover:bg-burgundy"
          aria-label="Duyuruyu kapat"
        >
          <X size={20} />
        </button>

        <div
          className="relative aspect-[1122/1402] w-full touch-pan-y overflow-hidden"
          onPointerDown={(event) => {
            dragStartX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (dragStartX.current === null) return;
            const distance = event.clientX - dragStartX.current;
            dragStartX.current = null;
            if (Math.abs(distance) < 42) return;
            if (distance > 0) showPrevious();
            else showNext();
          }}
          onPointerCancel={() => {
            dragStartX.current = null;
          }}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={src} className="relative h-full min-w-full">
                <Image
                  src={src}
                  alt={index === 0 ? "MSKU Racing üye kartı tanıtımı" : "MSKU Racing üye kartı avantajları"}
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, 560px"
                  className="select-none object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center border border-white/20 bg-[#080d1a]/65 text-white backdrop-blur-md transition hover:border-burgundy hover:bg-burgundy"
            aria-label="Önceki görsel"
          >
            <ChevronLeft size={21} />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center border border-white/20 bg-[#080d1a]/65 text-white backdrop-blur-md transition hover:border-burgundy hover:bg-burgundy"
            aria-label="Sonraki görsel"
          >
            <ChevronRight size={21} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 border border-white/15 bg-[#080d1a]/70 px-3 py-2 backdrop-blur-md" aria-label="Görsel seçimi">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 transition-all ${activeSlide === index ? "w-8 bg-burgundy" : "w-3 bg-white/45 hover:bg-white/70"}`}
                aria-label={`${index + 1}. görseli göster`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
