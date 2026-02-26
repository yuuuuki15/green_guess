import type { Language } from '../types/quiz';

interface Props {
  lang: Language;
  onToggle: () => void;
}

export function LanguageToggle({ lang, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium shadow-md transition-transform hover:scale-105 active:scale-95"
      aria-label="Toggle language"
    >
      <span className={lang === 'ja' ? 'opacity-100' : 'opacity-40'}>JP</span>
      <span className="text-gray-300">/</span>
      <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  );
}
