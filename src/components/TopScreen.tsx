import type { Translations } from '../i18n/types';
import type { Language } from '../types/quiz';
import { quizData } from '../data/quizData';

interface Props {
  t: Translations;
  lang: Language;
  onStart: () => void;
}

export function TopScreen({ t, lang, onStart }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="animate-bounce-in text-center">
        <h1 className="mb-2 text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
          {t.app.title}
        </h1>
        <p className="mb-10 text-lg text-gray-600">{t.app.subtitle}</p>
      </div>

      <button
        onClick={onStart}
        className="animate-fade-in rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl active:scale-95"
      >
        {t.top.startButton}
      </button>

      <p className="mt-12 max-w-sm text-center text-xs text-gray-400">
        {quizData.meta.sources[lang]}
      </p>
      <p className="mt-3 text-center text-xs text-gray-400">
        Made by{' '}
        <a
          href="https://github.com/yuuuuki15"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-dark"
        >
          @yuuuuki15
        </a>
      </p>
    </div>
  );
}
