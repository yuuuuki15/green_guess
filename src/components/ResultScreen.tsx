import type { Translations } from '../i18n/types';
import type { Language, AnswerRecord } from '../types/quiz';
import { NutrientBarChart } from './NutrientBarChart';
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

        {/* Nutrient per 100g bar chart (not for sheets/knowledge) */}
        {question.answer_type !== 'sheets' && (() => {
          const animalPer100g =
            (question.animal_food.nutrient_value / question.animal_food.amount_g) * 100;
          const items = [
            { name: question.animal_food[lang], value: animalPer100g, type: 'animal' as const },
            { name: question.plant_food[lang], value: question.plant_food.nutrient_per_100g, type: 'plant' as const },
            ...('alternatives' in question && question.alternatives
              ? question.alternatives.map((alt) => ({
                  name: alt.name[lang],
                  value: alt.nutrient_per_100g,
                  type: 'plant' as const,
                }))
              : []),
          ];
          return (
            <NutrientBarChart
              title={t.result.alternativesTitle}
              unit={question.plant_food.nutrient_unit}
              items={items}
              lang={lang}
            />
          );
        })()}

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
