"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "msku-racing-theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);

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
      aria-label={isLight ? "Gece moduna geç" : "Gündüz moduna geç"}
      title={isLight ? "Gece modu" : "Gündüz modu"}
      className="theme-toggle grid size-10 shrink-0 place-items-center border border-white/15 text-white/65 transition hover:border-burgundy hover:text-white"
    >
      {isLight ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
