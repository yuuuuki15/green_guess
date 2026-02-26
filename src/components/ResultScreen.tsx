import type { Translations } from '../i18n/types';
import type { Language, AnswerRecord } from '../types/quiz';
import { ComparisonBar } from './ComparisonBar';
import { DailyReferenceCard } from './DailyReferenceCard';

interface Props {
  t: Translations;
  lang: Language;
  record: AnswerRecord;
  correctAnswer: number;
  onNext: () => void;
}

export function ResultScreen({ t, lang, record, correctAnswer, onNext }: Props) {
  const { question, result } = record;

  if (question.answer_type === 'special_knowledge') {
    return (
      <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
        <div className="flex-1">
          <div className="mb-6 rounded-2xl bg-green-50 p-6 shadow-sm">
            <p className="text-lg leading-relaxed">{question.content[lang]}</p>
          </div>
          <DailyReferenceCard t={t} lang={lang} category={question.category} />
        </div>
        <button
          onClick={onNext}
          className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
        >
          {t.quiz.nextButton}
        </button>
      </div>
    );
  }

  const unit =
    question.answer_type === 'sheets' ? question.slider_label![lang] : 'g';
  const answerDisplay = `${correctAnswer}${unit}`;

  return (
    <div className="animate-fade-slide flex flex-1 flex-col px-6 py-6">
      <div className="flex-1">
        {/* Judge badge */}
        <div className="animate-bounce-in mb-4 text-center">
          {result === 'correct' && (
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3">
              <span className="text-3xl">&#10003;</span>
              <span className="text-xl font-bold text-primary">
                {t.result.correct}
              </span>
            </div>
          )}
          {result === 'incorrect' && (
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-6 py-3">
              <span className="text-3xl">&#10007;</span>
              <span className="text-xl font-bold text-gray-600">
                {t.result.incorrect.replace('{answer}', answerDisplay)}
              </span>
            </div>
          )}
        </div>

        {/* Correct answer display */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">{t.result.answerLabel}</p>
          <p className="tabular-nums text-4xl font-extrabold text-primary">
            {answerDisplay}
          </p>
        </div>

        {/* Comment */}
        <div className="mb-4 rounded-2xl bg-white p-4 text-base leading-relaxed shadow-sm">
          {question.comment[lang]}
        </div>

        {/* Comparison bar (not for sheets/knowledge) */}
        {question.answer_type !== 'sheets' && (
          <ComparisonBar
            animalName={question.animal_food[lang]}
            animalAmount={question.animal_food.amount_g}
            plantName={question.plant_food[lang]}
            plantAmount={correctAnswer}
            unit="g"
            lang={lang}
          />
        )}

        {/* Alternative plant foods */}
        {'alternatives' in question && question.alternatives && question.alternatives.length > 0 && (
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <p className="mb-2 text-sm font-bold text-gray-600">{t.result.alternativesTitle}</p>
            <ul className="space-y-1">
              {question.alternatives.map((alt, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-primary">&#8226;</span>
                  <span>{alt.name[lang]}</span>
                  <span className="ml-auto font-semibold tabular-nums">{alt.amount[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Daily reference */}
        <DailyReferenceCard t={t} lang={lang} category={question.category} />
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-primary-dark active:scale-[0.98]"
      >
        {t.quiz.nextButton}
      </button>
    </div>
  );
}
