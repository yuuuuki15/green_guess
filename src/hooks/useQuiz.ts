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

/** Generate 4 multiple-choice options (1 correct + 3 distractors). */
export function generateChoices(question: Question): number[] {
  if (question.answer_type === 'special_knowledge') return [];

  const correctAnswer =
    question.answer_type === 'sheets' ? question.answer_sheets! : question.answer_g!;
  const { min, max, step } = question.slider_range!;

  const roundToStep = (v: number) => Math.round(v / step) * step;
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  const choices = new Set<number>([correctAnswer]);

  // Generate distractors using multipliers
  const multipliers = [0.35, 0.6, 1.5, 2.2, 0.45, 0.75, 1.8, 2.8];
  for (const m of multipliers) {
    if (choices.size >= 4) break;
    const v = clamp(roundToStep(correctAnswer * m));
    if (v !== correctAnswer && !choices.has(v)) {
      choices.add(v);
    }
  }

  // Fallback: evenly spaced values across the range
  if (choices.size < 4) {
    const spacing = Math.floor((max - min) / 5);
    for (let i = 1; i <= 4 && choices.size < 4; i++) {
      const v = clamp(roundToStep(min + spacing * i));
      if (v !== correctAnswer && !choices.has(v)) {
        choices.add(v);
      }
    }
  }

  // Shuffle using Fisher-Yates
  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
