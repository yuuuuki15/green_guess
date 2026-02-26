import { useState } from 'react';
import type { Translations } from '../i18n/types';
import type { Language, Question } from '../types/quiz';
import { ProgressBar } from './ProgressBar';
import { Slider } from './Slider';

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
    <SliderQuizScreen
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

function SliderQuizScreen({
  t,
  lang,
  question,
  currentIndex,
  totalQuestions,
  categoryLabel,
  onSubmit,
}: Props & { categoryLabel: string }) {
  const range = question.slider_range!;
  const defaultValue = Math.round((range.min + range.max) / 2 / range.step) * range.step;
  const [value, setValue] = useState(defaultValue);

  const unit =
    question.answer_type === 'sheets'
      ? question.slider_label![lang]
      : t.quiz.sliderUnit;

  return (
    <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
      <ProgressBar
        current={currentIndex}
        total={totalQuestions}
        categoryLabel={categoryLabel}
      />

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-lg leading-relaxed font-medium">{question.question[lang]}</p>
      </div>

      <div className="flex-1">
        <Slider
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          onChange={setValue}
          unit={unit}
        />
      </div>

      <button
        onClick={() => onSubmit(value)}
        className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
      >
        {t.quiz.submitButton}
      </button>
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

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-lg leading-relaxed font-medium">{question.question[lang]}</p>
      </div>

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
