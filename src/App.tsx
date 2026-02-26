import { useLanguage } from './i18n/useLanguage';
import { useQuiz } from './hooks/useQuiz';
import { LanguageToggle } from './components/LanguageToggle';
import { TopScreen } from './components/TopScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { FinalScreen } from './components/FinalScreen';
import { Footer } from './components/Footer';

function App() {
  const { lang, toggleLang, t } = useLanguage();
  const quiz = useQuiz();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col">
      <LanguageToggle lang={lang} onToggle={toggleLang} />

      {quiz.screen === 'top' && (
        <TopScreen t={t} lang={lang} onStart={quiz.startQuiz} />
      )}

      {quiz.screen === 'quiz' && quiz.currentQuestion && (
        <QuizScreen
          key={quiz.currentQuestion.id}
          t={t}
          lang={lang}
          question={quiz.currentQuestion}
          currentIndex={quiz.currentIndex}
          totalQuestions={quiz.totalQuestions}
          onSubmit={quiz.submitAnswer}
        />
      )}

      {quiz.screen === 'result' && quiz.answers.length > 0 && (
        <ResultScreen
          key={`result-${quiz.currentIndex}`}
          t={t}
          lang={lang}
          record={quiz.answers[quiz.answers.length - 1]}
          correctAnswer={quiz.getCorrectAnswer(quiz.currentQuestion!)}
          onNext={quiz.nextQuestion}
        />
      )}

      {quiz.screen === 'final' && (
        <FinalScreen
          t={t}
          lang={lang}
          score={quiz.score}
          scorableCount={quiz.scorableCount}
          message={quiz.getResultMessage(quiz.score, lang)}
          answers={quiz.answers}
          onRestart={quiz.restart}
        />
      )}

      <Footer source={t.footer.source} disclaimer={t.footer.disclaimer} />
    </div>
  );
}

export default App;
