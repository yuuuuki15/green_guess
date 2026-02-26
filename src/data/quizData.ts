import type { QuizData } from '../types/quiz';

export const quizData: QuizData = {
  meta: {
    version: '1.0',
    sources: {
      ja: '文部科学省「日本食品標準成分表（八訂）増補2023年」',
      en: 'USDA FoodData Central / Japan Standard Tables of Food Composition (8th Rev.)',
    },
    note: {
      ja: 'すべての栄養素値は生・可食部100gあたりの値です（特記がない限り）',
      en: 'All nutrient values are per 100g raw edible portion unless otherwise noted',
    },
  },
  questions: [
    {
      id: 'q1',
      category: 'protein',
      difficulty: 'easy',
      question: {
        ja: '鶏むね肉（皮なし）100gのタンパク質は23.3g。同じ量のタンパク質を納豆で摂るには何g必要？',
        en: 'Chicken breast (skinless) has 23.3g protein per 100g. How many grams of natto do you need for the same amount?',
      },
      animal_food: {
        ja: '鶏むね肉（皮なし）',
        en: 'Chicken breast (skinless)',
        amount_g: 100,
        nutrient_value: 23.3,
        nutrient_unit: 'g',
      },
      plant_food: {
        ja: '納豆（糸引き）',
        en: 'Natto (fermented soybeans)',
        nutrient_per_100g: 16.5,
        nutrient_unit: 'g',
      },
      answer_g: 141,
      slider_range: { min: 50, max: 400, step: 10 },
      tolerance: 15,
      comment: {
        ja: '約141g — 納豆約3パック分（1パック≒45g）。朝食に納豆を2パック食べるだけでも、鶏むね肉の7割近いタンパク質が摂れます。',
        en: 'About 141g — roughly 3 packs of natto (1 pack ≈ 45g). Just 2 packs at breakfast covers nearly 70% of chicken breast protein.',
      },
      alternatives: [
        { name: { ja: '木綿豆腐', en: 'Firm tofu' }, nutrient_per_100g: 7.0 },
        { name: { ja: '枝豆（ゆで）', en: 'Edamame (boiled)' }, nutrient_per_100g: 11.5 },
      ],
    },
    {
      id: 'q2',
      category: 'protein',
      difficulty: 'medium',
      question: {
        ja: '牛もも肉（赤身）100gのタンパク質は21.3g。同じ量を茹で大豆で摂るには何g必要？',
        en: 'Lean beef (round) has 21.3g protein per 100g. How many grams of cooked soybeans do you need?',
      },
      animal_food: {
        ja: '牛もも肉（赤身）',
        en: 'Lean beef (round)',
        amount_g: 100,
        nutrient_value: 21.3,
        nutrient_unit: 'g',
      },
      plant_food: {
        ja: '茹で大豆（黄大豆）',
        en: 'Cooked soybeans',
        nutrient_per_100g: 14.8,
        nutrient_unit: 'g',
      },
      answer_g: 144,
      slider_range: { min: 50, max: 500, step: 10 },
      tolerance: 20,
      comment: {
        ja: '約144g — 意外と少ない！茹で大豆は100gあたり14.8gものタンパク質を含んでいます。',
        en: "About 144g — less than you'd think! Cooked soybeans pack 14.8g of protein per 100g.",
      },
      alternatives: [
        { name: { ja: '納豆', en: 'Natto' }, nutrient_per_100g: 16.5 },
        { name: { ja: '木綿豆腐', en: 'Firm tofu' }, nutrient_per_100g: 7.0 },
      ],
    },
    {
      id: 'q3',
      category: 'iron',
      difficulty: 'medium',
      question: {
        ja: '牛もも肉（赤身）100gの鉄分は2.7mg。同じ量を小松菜で摂るには何g必要？',
        en: 'Lean beef has 2.7mg iron per 100g. How many grams of komatsuna (Japanese mustard spinach) do you need?',
      },
      animal_food: {
        ja: '牛もも肉（赤身）',
        en: 'Lean beef (round)',
        amount_g: 100,
        nutrient_value: 2.7,
        nutrient_unit: 'mg',
      },
      plant_food: {
        ja: '小松菜（生）',
        en: 'Komatsuna / Japanese mustard spinach (raw)',
        nutrient_per_100g: 2.8,
        nutrient_unit: 'mg',
      },
      answer_g: 96,
      slider_range: { min: 30, max: 500, step: 10 },
      tolerance: 15,
      comment: {
        ja: '約96g — ほぼ同じ重さ！小松菜は100gあたり2.8mgの鉄分を含み、牛肉とほぼ同等です。',
        en: 'About 96g — almost the same weight! Komatsuna has 2.8mg iron per 100g, nearly matching beef.',
      },
      alternatives: [
        { name: { ja: '納豆', en: 'Natto' }, nutrient_per_100g: 3.3 },
        { name: { ja: 'ほうれん草（生）', en: 'Spinach (raw)' }, nutrient_per_100g: 2.0 },
      ],
    },
    {
      id: 'q4',
      category: 'iron',
      difficulty: 'easy',
      question: {
        ja: '豚レバー100gの鉄分は13.0mg。同じ量を木綿豆腐で摂るには何g必要？',
        en: 'Pork liver has 13.0mg iron per 100g. How many grams of firm tofu do you need?',
      },
      animal_food: {
        ja: '豚レバー',
        en: 'Pork liver',
        amount_g: 100,
        nutrient_value: 13.0,
        nutrient_unit: 'mg',
      },
      plant_food: {
        ja: '木綿豆腐',
        en: 'Firm tofu',
        nutrient_per_100g: 1.5,
        nutrient_unit: 'mg',
      },
      answer_g: 867,
      slider_range: { min: 100, max: 1500, step: 10 },
      tolerance: 50,
      comment: {
        ja: '約867g — レバーの鉄分はかなり多いので、豆腐だけで同じ量を摂るのは大変。でも小松菜やひじきなど、複数の植物性食品を組み合わせれば十分カバーできます。',
        en: "About 867g — liver is extremely iron-rich, so tofu alone is tough. But combining multiple plant foods like komatsuna, sesame, and hijiki seaweed makes it achievable.",
      },
      alternatives: [
        { name: { ja: '小松菜', en: 'Komatsuna' }, nutrient_per_100g: 2.8 },
        { name: { ja: '納豆', en: 'Natto' }, nutrient_per_100g: 3.3 },
      ],
    },
    {
      id: 'q5',
      category: 'calcium',
      difficulty: 'easy',
      question: {
        ja: '牛乳200ml（コップ1杯）のカルシウムは220mg。同じ量を小松菜で摂るには何g必要？',
        en: 'A glass of milk (200ml) has 220mg calcium. How many grams of komatsuna do you need for the same?',
      },
      animal_food: {
        ja: '牛乳（コップ1杯・200ml）',
        en: 'Whole milk (1 glass, 200ml)',
        amount_g: 200,
        nutrient_value: 220,
        nutrient_unit: 'mg',
      },
      plant_food: {
        ja: '小松菜（生）',
        en: 'Komatsuna / Japanese mustard spinach (raw)',
        nutrient_per_100g: 170,
        nutrient_unit: 'mg',
      },
      answer_g: 129,
      slider_range: { min: 30, max: 500, step: 10 },
      tolerance: 15,
      comment: {
        ja: '約129g — 小松菜はカルシウムの宝庫！100gあたりのカルシウム量は牛乳を上回ります。',
        en: 'About 129g — komatsuna is a calcium powerhouse! It actually contains more calcium per 100g than milk.',
      },
      alternatives: [
        { name: { ja: '木綿豆腐', en: 'Firm tofu' }, nutrient_per_100g: 93 },
      ],
    },
    {
      id: 'q6',
      category: 'calcium',
      difficulty: 'medium',
      question: {
        ja: '牛乳200ml（コップ1杯）のカルシウムは220mg。同じ量を木綿豆腐で摂るには何g必要？',
        en: 'A glass of milk (200ml) has 220mg calcium. How many grams of firm tofu do you need?',
      },
      animal_food: {
        ja: '牛乳（コップ1杯・200ml）',
        en: 'Whole milk (1 glass, 200ml)',
        amount_g: 200,
        nutrient_value: 220,
        nutrient_unit: 'mg',
      },
      plant_food: {
        ja: '木綿豆腐',
        en: 'Firm tofu',
        nutrient_per_100g: 93,
        nutrient_unit: 'mg',
      },
      answer_g: 237,
      slider_range: { min: 50, max: 800, step: 10 },
      tolerance: 25,
      comment: {
        ja: '約237g — 木綿豆腐1丁（300g）の8割弱。麻婆豆腐1人前くらいの量でコップ1杯の牛乳と同じカルシウムが摂れます。',
        en: "About 237g — less than one standard block of tofu. A single serving of mapo tofu gives you as much calcium as a glass of milk.",
      },
      alternatives: [
        { name: { ja: '小松菜', en: 'Komatsuna' }, nutrient_per_100g: 170 },
      ],
    },
    {
      id: 'q7',
      category: 'vitamin_b12',
      difficulty: 'hard',
      question: {
        ja: '卵1個（50g）のビタミンB12は約0.5μg。焼き海苔で同じ量を摂るには何枚必要？（全形1枚＝3g）',
        en: 'One egg (50g) has about 0.5μg of vitamin B12. How many sheets of roasted nori seaweed do you need? (1 full sheet = 3g)',
      },
      animal_food: {
        ja: '鶏卵1個（50g）',
        en: 'One chicken egg (50g)',
        amount_g: 50,
        nutrient_value: 0.5,
        nutrient_unit: 'μg',
      },
      plant_food: {
        ja: '焼き海苔（全形1枚＝3g）',
        en: 'Roasted nori seaweed (1 full sheet = 3g)',
        nutrient_per_100g: 58.0,
        nutrient_per_sheet: 1.7,
        nutrient_unit: 'μg',
      },
      answer_sheets: 1,
      answer_type: 'sheets',
      slider_range: { min: 1, max: 20, step: 1 },
      slider_label: { ja: '枚', en: 'sheets' },
      tolerance: 0,
      comment: {
        ja: 'たった1枚！焼き海苔1枚（3g）で約1.7μgのB12が含まれ、卵1個分を超えます。ただし、海苔のB12の体内での利用効率についてはまだ研究途上です。',
        en: 'Just 1 sheet! One sheet of nori (3g) contains about 1.7μg of B12, exceeding one egg. However, the bioavailability of B12 from nori is still being researched.',
      },
    },
    {
      id: 'q8',
      category: 'vitamin_b12',
      difficulty: 'hard',
      question: {
        ja: 'ビタミンB12の1日の目安量は4.0μg（2025年版）。これは植物性食品だけで摂れると思う？',
        en: 'The daily adequate intake of vitamin B12 is 4.0μg (2025 edition). Do you think you can get this from plant foods alone?',
      },
      answer_type: 'special_knowledge',
      slider_range: null,
      content: {
        ja: '正直に言うと、ビタミンB12は植物性食品にほとんど含まれない栄養素です。海苔には含まれていますが、体内での利用効率は研究途上。ビーガンの多くはB12強化食品（ニュートリショナルイーストや強化豆乳など）やサプリメントで補っています。これはビーガン食の「弱点」ではなく、知って対策すれば簡単にカバーできるポイントです。',
        en: "Honestly, vitamin B12 is rarely found in plant foods. Nori seaweed contains some, but its bioavailability is still being studied. Most vegans supplement B12 through fortified foods (nutritional yeast, fortified plant milk) or supplements. This isn't a 'weakness' of a vegan diet — it's simply something to be aware of and easily managed.",
      },
    },
  ],
  quiz_config: {
    questions_per_session: 5,
    selection_rule:
      'Pick 1-2 from each category, always include q8 (B12 knowledge) as the final question',
    recommended_sets: [
      {
        name: 'balanced',
        question_ids: ['q1', 'q3', 'q5', 'q7', 'q8'],
      },
      {
        name: 'surprising',
        question_ids: ['q2', 'q3', 'q5', 'q7', 'q8'],
      },
    ],
  },
  result_messages: {
    '0_1_correct': {
      ja: '植物性食品の実力、思ったより知らなかったかも？でもそれが普通！これをきっかけに、植物性食品の栄養にも目を向けてみてください。',
      en: 'Plant foods might have more power than you thought! This is a great starting point to learn about plant-based nutrition.',
    },
    '2_3_correct': {
      ja: 'なかなか詳しいですね！植物性食品でもかなりの栄養が摂れることがわかったのでは？',
      en: "Not bad! You're starting to see that plant foods can pack a real nutritional punch.",
    },
    '4_5_correct': {
      ja: 'すごい！植物性の栄養についてかなり詳しいですね。もうビーガン食に対する不安はないかも？',
      en: 'Impressive! You clearly know your plant-based nutrition. Ready to give it a try?',
    },
  },
  daily_reference: {
    protein: {
      nutrient: { ja: 'タンパク質', en: 'Protein' },
      male: '65g',
      female: { ja: '50g', en: '50g' },
    },
    iron: {
      nutrient: { ja: '鉄', en: 'Iron' },
      male: '7.5mg',
      female: { ja: '6.0〜10.5mg（月経の有無による）', en: '6.0–10.5mg (varies with menstruation)' },
    },
    calcium: {
      nutrient: { ja: 'カルシウム', en: 'Calcium' },
      male: '750mg',
      female: { ja: '650mg', en: '650mg' },
    },
    vitamin_b12: {
      nutrient: { ja: 'ビタミンB12', en: 'Vitamin B12' },
      male: '4.0μg',
      female: { ja: '4.0μg', en: '4.0μg' },
    },
  },
};
