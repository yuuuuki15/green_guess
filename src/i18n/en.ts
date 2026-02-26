import type { Translations } from './types';

export const en: Translations = {
  app: {
    title: 'Green Guess',
    subtitle: 'How much can plants cover? Take the quiz and find out',
  },
  top: {
    startButton: 'Start Quiz',
  },
  quiz: {
    progress: '{current} / {total}',
    submitButton: 'Submit',
    nextButton: 'Next',
    sliderUnit: 'g',
    sheetsUnit: 'sheets',
  },
  result: {
    correct: 'Great!',
    close: 'Close!',
    incorrect: 'The answer was {answer}',
    answerLabel: 'Answer',
  },
  knowledge: {
    yes: 'Yes',
    no: 'No',
    notSure: 'Not sure',
  },
  final: {
    scoreLabel: '{score} / {total} correct',
    tryAgain: 'Try Again',
    reviewTitle: 'Review',
  },
  footer: {
    source: 'Data source: Japan Standard Tables of Food Composition (8th Rev.) / USDA FoodData Central',
    disclaimer: 'This app is not intended as nutritional advice.',
  },
  category: {
    protein: 'Protein',
    iron: 'Iron',
    calcium: 'Calcium',
    vitamin_b12: 'Vitamin B12',
  },
};
