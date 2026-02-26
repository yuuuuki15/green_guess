import { useState } from 'react';
import type { Translations } from '../i18n/types';
import type { Language, AnswerRecord } from '../types/quiz';

interface Props {
  t: Translations;
  lang: Language;
  score: number;
  scorableCount: number;
  message: string;
  answers: AnswerRecord[];
  onRestart: () => void;
}

export function FinalScreen({
  t,
  lang,
  score,
  scorableCount,
  message,
  answers,
  onRestart,
}: Props) {
  const accuracyRate =
    scorableCount > 0 ? Math.round((score / scorableCount) * 100) : 0;

  return (
    <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
      <div className="flex-1">
        {/* Score */}
        <div className="animate-bounce-in mb-2 text-center">
          <p className="tabular-nums text-5xl font-extrabold text-primary">
            {score}
            <span className="text-2xl text-gray-400"> / {scorableCount}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {t.final.scoreLabel
              .replace('{score}', String(score))
              .replace('{total}', String(scorableCount))}
          </p>
        </div>

        {/* Accuracy rate */}
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-lg font-bold tabular-nums text-primary">
            {t.final.accuracyRate.replace('{rate}', String(accuracyRate))}
          </span>
        </div>

        {/* Result message */}
        <div className="mb-6 rounded-2xl bg-green-50 p-5 text-center text-base leading-relaxed shadow-sm">
          {message}
        </div>

        {/* Review */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-bold">{t.final.reviewTitle}</h3>
          <div className="space-y-2">
            {answers.map((record, i) => (
              <ReviewItem
                key={i}
                t={t}
                record={record}
                lang={lang}
                index={i + 1}
              />
            ))}
          </div>
        </div>

        {/* Source and disclaimer */}
        <div className="mb-6 text-center text-xs text-gray-400">
          <p>{t.footer.source}</p>
          <p className="mt-1">{t.footer.disclaimer}</p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
      >
        {t.final.tryAgain}
      </button>
    </div>
  );
}

function ReviewItem({
  t,
  record,
  lang,
  index,
}: {
  t: Translations;
  record: AnswerRecord;
  lang: Language;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const { question, userAnswer, result } = record;

  const badge =
    result === 'correct'
      ? { text: '&#10003;', cls: 'bg-green-100 text-primary' }
      : result === 'knowledge'
        ? { text: 'i', cls: 'bg-blue-100 text-blue-600' }
        : { text: '&#10007;', cls: 'bg-red-50 text-red-500' };

  // Format user answer for display
  let userAnswerDisplay = '';
  if (question.answer_type === 'special_knowledge') {
    const key = userAnswer as 'yes' | 'no' | 'notSure';
    userAnswerDisplay = t.knowledge[key] ?? String(userAnswer);
  } else if (question.answer_type === 'sheets') {
    userAnswerDisplay = `${userAnswer}${question.slider_label![lang]}`;
  } else {
    userAnswerDisplay = `${userAnswer}g`;
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${badge.cls}`}
          dangerouslySetInnerHTML={{ __html: badge.text }}
        />
        <span className="flex-1 text-sm font-medium leading-snug">
          Q{index}. {question.question[lang].slice(0, 40)}...
        </span>
        <span
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          &#9660;
        </span>
      </button>
      {open && (
        <div className="animate-fade-in border-t border-gray-100 px-3 pb-3 pt-2 text-sm text-gray-600">
          {question.answer_type !== 'special_knowledge' && (
            <p className="mb-1 text-xs text-gray-400">
              {t.final.yourAnswer}: <span className="font-semibold text-gray-600">{userAnswerDisplay}</span>
            </p>
          )}
          {question.answer_type === 'special_knowledge'
            ? question.content[lang]
            : question.comment[lang]}
        </div>
      )}
    </div>
  );
}
