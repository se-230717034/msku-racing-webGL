"use client";

import { useLanguage } from "./language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "tr" ? "en" : "tr";

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={language === "tr" ? "Switch to English" : "Türkçeye geç"}
      title={language === "tr" ? "English" : "Türkçe"}
      className="language-toggle flex h-10 shrink-0 items-center gap-1 border border-white/15 px-2.5 font-display text-[10px] font-semibold tracking-[.08em] text-white/65 transition hover:border-burgundy hover:text-white"
    >
      <span className={language === "tr" ? "text-burgundy" : ""}>TR</span>
      <span className="text-white/25">/</span>
      <span className={language === "en" ? "text-burgundy" : ""}>EN</span>
    </button>
  );
}
