'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lang, dictionaries } from './dictionaries';

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (keyPath: string) => string;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>('uz');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem('bisma_lang') as Lang;
    if (storedLang && ['uz', 'ru', 'en'].includes(storedLang)) {
      setLangState(storedLang);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('bisma_lang', newLang);
    document.cookie = `bisma_lang=${newLang}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = dictionaries[lang];
    for (const k of keys) {
      if (current[k] === undefined) {
        return keyPath; // fallback to key
      }
      current = current[k];
    }
    return current as string;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LangContext);
  if (!context) {
    // Return a dummy implementation during SSR / before mount if needed
    return {
      lang: 'uz' as Lang,
      setLang: () => {},
      t: (keyPath: string) => {
        const keys = keyPath.split('.');
        let current: any = dictionaries['uz'];
        for (const k of keys) {
          if (current?.[k] === undefined) {
            return keyPath;
          }
          current = current[k];
        }
        return current as string;
      }
    };
  }
  return context;
}
