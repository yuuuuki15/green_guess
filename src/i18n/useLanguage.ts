import { useState, useCallback, useEffect } from 'react';
import { ja } from './ja';
import { en } from './en';
import type { Language } from '../types/quiz';

const translations = { ja, en } as const;

function detectLanguage(): Language {
  const saved = localStorage.getItem('green-guess-lang');
  if (saved === 'ja' || saved === 'en') return saved;
  return navigator.language.startsWith('ja') ? 'ja' : 'en';
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(detectLanguage);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('green-guess-lang', l);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ja' ? 'en' : 'ja');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return { lang, setLang, toggleLang, t };
}
