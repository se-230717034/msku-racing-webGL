"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Language = "tr" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (turkish: string, english: string) => string;
};

const LANGUAGE_KEY = "msku-racing-language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage === "en") setLanguageState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translate: (turkish, english) => (language === "tr" ? turkish : english),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
