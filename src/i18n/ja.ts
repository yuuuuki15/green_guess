import type { Translations } from './types';

export const ja: Translations = {
  app: {
    title: 'Green Guess',
    subtitle: '植物性でどこまで摂れる？ クイズで確かめよう',
  },
  top: {
    startButton: 'クイズを始める',
  },
  quiz: {
    progress: '{current} / {total}',
    nextButton: '次の問題へ',
    unit_g: 'g',
    unit_sheets: '枚',
  },
  result: {
    correct: '正解！',
    incorrect: '正解は {answer} でした',
    answerLabel: '正解',
  },
  knowledge: {
    yes: 'はい',
    no: 'いいえ',
    notSure: 'わからない',
  },
  final: {
    scoreLabel: '{score} / {total} 問正解',
    accuracyRate: '正答率 {rate}%',
    tryAgain: 'もう一度挑戦',
    reviewTitle: '振り返り',
  },
  footer: {
    source: 'データ出典: 文部科学省「日本食品標準成分表（八訂）増補2023年」',
    disclaimer: 'このアプリは栄養指導を目的としたものではありません。',
  },
  category: {
    protein: 'タンパク質',
    iron: '鉄分',
    calcium: 'カルシウム',
    vitamin_b12: 'ビタミンB12',
  },
};
