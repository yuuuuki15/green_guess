import { useState, useCallback, useMemo } from 'react';
import { quizData } from '../data/quizData';
import type { Question, AnswerRecord, JudgeResult, Language } from '../types/quiz';

export type Screen = 'top' | 'quiz' | 'result' | 'final';

function selectQuestions(): Question[] {
  const sets = quizData.quiz_config.recommended_sets;
  const chosen = sets[Math.floor(Math.random() * sets.length)];
  return chosen.question_ids.map(
    (id) => quizData.questions.find((q) => q.id === id)!
  );
}

function judge(question: Question, userAnswer: number): JudgeResult {
  if (question.answer_type === 'special_knowledge') return 'correct';

  const correctAnswer =
    question.answer_type === 'sheets' ? question.answer_sheets! : question.answer_g!;
  return userAnswer === correctAnswer ? 'correct' : 'incorrect';
}

function getCorrectAnswer(question: Question): number {
  if (question.answer_type === 'sheets') return question.answer_sheets!;
  if (question.answer_type === 'special_knowledge') return 0;
  return question.answer_g!;
}

function getResultMessage(score: number, lang: Language): string {
  if (score <= 1) return quizData.result_messages['0_1_correct'][lang];
  if (score <= 3) return quizData.result_messages['2_3_correct'][lang];
  return quizData.result_messages['4_5_correct'][lang];
}

/** Generate 4 multiple-choice options (1 correct + 3 distractors).
 *  Splits the range into 4 zones and picks one value per zone
 *  so the choices are well-spread and plausible. */
export function generateChoices(question: Question): number[] {
  if (question.answer_type === 'special_knowledge') return [];

  const correctAnswer =
    question.answer_type === 'sheets' ? question.answer_sheets! : question.answer_g!;
  const { min, max, step } = question.slider_range!;

  const roundToStep = (v: number) => Math.round(v / step) * step;
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  const rangeSize = max - min;
  const zoneSize = rangeSize / 4;

  // Which zone does the correct answer fall in? (0-3)
  const correctZone = Math.min(3, Math.floor((correctAnswer - min) / zoneSize));

  const choices: number[] = [correctAnswer];

  for (let z = 0; z < 4; z++) {
    if (z === correctZone) continue;

    const zoneMin = min + z * zoneSize;
    const zoneMax = min + (z + 1) * zoneSize;
    const stepsInZone = Math.max(1, Math.floor((zoneMax - zoneMin) / step));
    const randomSteps = Math.floor(Math.random() * stepsInZone);
    const v = clamp(roundToStep(zoneMin + randomSteps * step));

    if (v !== correctAnswer && !choices.includes(v)) {
      choices.push(v);
    }
  }

  // Fallback: fill with random values if zones produced duplicates
  let attempts = 0;
  while (choices.length < 4 && attempts < 50) {
    const totalSteps = Math.floor(rangeSize / step);
    const v = min + Math.floor(Math.random() * totalSteps) * step;
    if (!choices.includes(v)) {
      choices.push(v);
    }
    attempts++;
  }

  // Sort ascending so smallest is at the top
  return choices.sort((a, b) => a - b);
}

export function useQuiz() {
  const [screen, setScreen] = useState<Screen>('top');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const currentQuestion = questions[currentIndex] ?? null;

  const startQuiz = useCallback(() => {
    const selected = selectQuestions();
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers([]);
    setScreen('quiz');
  }, []);

  const submitAnswer = useCallback(
    (userAnswer: number | string) => {
      if (!currentQuestion) return;

      let result: JudgeResult | 'knowledge';
      if (currentQuestion.answer_type === 'special_knowledge') {
        result = 'knowledge';
      } else {
        result = judge(currentQuestion, userAnswer as number);
      }

      setAnswers((prev) => [
        ...prev,
        { question: currentQuestion, userAnswer, result },
      ]);
      setScreen('result');
    },
    [currentQuestion]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setScreen('quiz');
    } else {
      setScreen('final');
    }
  }, [currentIndex, questions.length]);

  const restart = useCallback(() => {
    setScreen('top');
  }, []);

  const score = useMemo(
    () => answers.filter((a) => a.result === 'correct').length,
    [answers]
  );

  const scorableCount = useMemo(
    () =>
      answers.filter((a) => a.question.answer_type !== 'special_knowledge')
        .length,
    [answers]
  );

  return {
    screen,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    score,
    scorableCount,
    startQuiz,
    submitAnswer,
    nextQuestion,
    restart,
    getCorrectAnswer,
    getResultMessage,
  };
}
