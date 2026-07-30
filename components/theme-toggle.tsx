"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "./language-provider";

const THEME_KEY = "msku-racing-theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const { translate } = useLanguage();

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;

    document.documentElement.classList.toggle("light", nextIsLight);
    document.documentElement.classList.toggle("dark", !nextIsLight);
    localStorage.setItem(THEME_KEY, nextIsLight ? "light" : "dark");
    setIsLight(nextIsLight);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? translate("Gece moduna geç", "Switch to dark mode") : translate("Gündüz moduna geç", "Switch to light mode")}
      title={isLight ? translate("Gece modu", "Dark mode") : translate("Gündüz modu", "Light mode")}
      className="theme-toggle grid size-10 shrink-0 place-items-center border border-white/15 text-white/65 transition hover:border-burgundy hover:text-white"
    >
      {isLight ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
