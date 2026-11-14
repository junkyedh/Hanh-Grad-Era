"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCopy, type GuestAddressing, type Language } from "@/data/content";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  addressing: GuestAddressing;
} | null>(null);

export function LanguageProvider({ addressing, children }: { addressing: GuestAddressing; children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, addressing }}>
      <div className={`language-root locale-${language}`} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}

export function useInvitationCopy() {
  const { language, addressing } = useLanguage();
  return getCopy(language, addressing);
}


export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const nextLanguage = language === "vi" ? "en" : "vi";
  const label =
    language === "vi"
      ? "Switch to English"
      : "Chuyển sang tiếng Việt";

  return (
    <div className="language-switcher">
      <button
        type="button"
        lang={language}
        aria-label={label}
        title={label}
        onClick={() => setLanguage(nextLanguage)}
      >
        {language.toUpperCase()}
      </button>
    </div>
  );
}

