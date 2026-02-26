import { useMemo } from 'react';
import type { Translations } from '../i18n/types';
import type { Language, Question } from '../types/quiz';
import { generateChoices } from '../hooks/useQuiz';
import { ProgressBar } from './ProgressBar';
import { DailyReferenceCard } from './DailyReferenceCard';

interface Props {
  t: Translations;
  lang: Language;
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSubmit: (answer: number | string) => void;
}

export function QuizScreen({
  t,
  lang,
  question,
  currentIndex,
  totalQuestions,
  onSubmit,
}: Props) {
  const categoryLabel =
    t.category[question.category as keyof Translations['category']] ??
    question.category;

  if (question.answer_type === 'special_knowledge') {
    return (
      <KnowledgeScreen
        t={t}
        lang={lang}
        question={question}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        categoryLabel={categoryLabel}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ChoiceQuizScreen
      t={t}
      lang={lang}
      question={question}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      categoryLabel={categoryLabel}
      onSubmit={onSubmit}
    />
  );
}

function ChoiceQuizScreen({
  t,
  lang,
  question,
  currentIndex,
  totalQuestions,
  categoryLabel,
  onSubmit,
}: Props & { categoryLabel: string }) {
  const choices = useMemo(() => generateChoices(question), [question]);

  const unit =
    question.answer_type === 'sheets'
      ? t.quiz.unit_sheets
      : t.quiz.unit_g;

  return (
    <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
      <ProgressBar
        current={currentIndex}
        total={totalQuestions}
        categoryLabel={categoryLabel}
      />

      <div className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-lg leading-relaxed font-medium">{question.question[lang]}</p>
      </div>

      <DailyReferenceCard t={t} lang={lang} category={question.category} compact />

      <div className="flex flex-1 flex-col justify-center gap-3">
        {choices.map((value) => (
          <button
            key={value}
            onClick={() => onSubmit(value)}
            className="w-full rounded-2xl border-2 border-primary/20 bg-white py-4 text-xl font-bold text-text tabular-nums transition-all hover:border-primary hover:bg-green-50 active:scale-[0.98]"
          >
            {value}
            <span className="ml-1 text-base font-medium text-gray-500">{unit}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function KnowledgeScreen({
  t,
  lang,
  question,
  currentIndex,
  totalQuestions,
  categoryLabel,
  onSubmit,
}: Props & { categoryLabel: string }) {
  return (
    <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
      <ProgressBar
        current={currentIndex}
        total={totalQuestions}
        categoryLabel={categoryLabel}
      />

      <div className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-lg leading-relaxed font-medium">{question.question[lang]}</p>
      </div>

      <DailyReferenceCard t={t} lang={lang} category={question.category} compact />

      <div className="flex flex-1 flex-col justify-center gap-3">
        {(['yes', 'no', 'notSure'] as const).map((key) => (
          <button
            key={key}
            onClick={() => onSubmit(key)}
            className="w-full rounded-2xl border-2 border-primary/20 bg-white py-4 text-lg font-semibold text-text transition-all hover:border-primary hover:bg-green-50 active:scale-[0.98]"
          >
            {t.knowledge[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
