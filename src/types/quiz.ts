export interface LocalizedText {
  ja: string;
  en: string;
}

export type Language = 'ja' | 'en';

export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

export interface AnimalFood {
  ja: string;
  en: string;
  amount_g: number;
  nutrient_value: number;
  nutrient_unit: string;
}

export interface PlantFood {
  ja: string;
  en: string;
  nutrient_per_100g: number;
  nutrient_unit: string;
  nutrient_per_sheet?: number;
}

export interface SliderQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: LocalizedText;
  animal_food: AnimalFood;
  plant_food: PlantFood;
  answer_g: number;
  answer_type?: undefined;
  slider_range: SliderRange;
  slider_label?: LocalizedText;
  tolerance: number;
  comment: LocalizedText;
  answer_sheets?: number;
}

export interface SheetQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: LocalizedText;
  animal_food: AnimalFood;
  plant_food: PlantFood;
  answer_sheets: number;
  answer_type: 'sheets';
  slider_range: SliderRange;
  slider_label: LocalizedText;
  tolerance: number;
  comment: LocalizedText;
  answer_g?: undefined;
}

export interface KnowledgeQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: LocalizedText;
  answer_type: 'special_knowledge';
  slider_range: null;
  content: LocalizedText;
}

export type Question = SliderQuestion | SheetQuestion | KnowledgeQuestion;

export interface DailyReference {
  nutrient: LocalizedText;
  male: string;
  female: LocalizedText;
}

export interface QuizConfig {
  questions_per_session: number;
  selection_rule: string;
  recommended_sets: {
    name: string;
    question_ids: string[];
  }[];
}

export interface ResultMessages {
  [key: string]: LocalizedText;
}

export interface QuizMeta {
  version: string;
  sources: LocalizedText;
  note: LocalizedText;
}

export interface QuizData {
  meta: QuizMeta;
  questions: Question[];
  quiz_config: QuizConfig;
  result_messages: ResultMessages;
  daily_reference: Record<string, DailyReference>;
}

export type JudgeResult = 'correct' | 'incorrect';

export interface AnswerRecord {
  question: Question;
  userAnswer: number | string;
  result: JudgeResult | 'knowledge';
}
