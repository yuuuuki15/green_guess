import type { Translations } from '../i18n/types';
import type { Language } from '../types/quiz';
import { quizData } from '../data/quizData';

interface Props {
  t: Translations;
  lang: Language;
  category: string;
  compact?: boolean;
}

export function DailyReferenceCard({ t, lang, category, compact }: Props) {
  const ref = quizData.daily_reference[category];
  if (!ref) return null;

  if (compact) {
    return (
      <div className="mb-4 rounded-lg bg-gray-50 px-4 py-2 text-xs text-gray-500">
        <span className="font-bold">{t.reference.title}:</span>{' '}
        {ref.nutrient[lang]} {t.reference.male} {ref.male} / {t.reference.female} {ref.female[lang]}
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="mb-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
        {t.reference.title}
      </p>
      <p className="text-sm text-gray-700">
        {ref.nutrient[lang]}:{' '}
        <span className="font-semibold">{t.reference.male} {ref.male}</span>
        {' / '}
        <span className="font-semibold">{t.reference.female} {ref.female[lang]}</span>
      </p>
      <p className="mt-1 text-[10px] text-gray-400">{t.reference.source}</p>
    </div>
  );
}
