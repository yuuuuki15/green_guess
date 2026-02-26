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
  const diff = Math.abs(userAnswer - correctAnswer);
  const tolerance = question.tolerance;

  if (diff <= tolerance) return 'correct';
  if (diff <= tolerance * 2) return 'close';
  return 'incorrect';
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
