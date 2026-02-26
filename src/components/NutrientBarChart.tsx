import type { Language } from '../types/quiz';

interface BarItem {
  name: string;
  value: number;
  type: 'animal' | 'plant';
}

interface Props {
  title: string;
  unit: string;
  items: BarItem[];
  lang: Language;
}

export function NutrientBarChart({ title, unit, items }: Props) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const maxVal = Math.max(...sorted.map((item) => item.value));

  return (
    <div className="animate-fade-in mt-4 rounded-xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-bold text-gray-600">{title}</p>
      <div className="space-y-2.5">
        {sorted.map((item, i) => {
          const isAnimal = item.type === 'animal';
          const barColor = isAnimal ? 'bg-secondary' : 'bg-primary';
          const trackColor = isAnimal ? 'bg-orange-100' : 'bg-green-100';
          const textColor = isAnimal ? 'text-secondary' : 'text-primary';
          const widthPct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
          const displayValue = Math.round(item.value * 10) / 10;
          return (
            <div key={i}>
              <div className="mb-0.5 flex items-center justify-between text-xs">
                <span className={`font-medium ${textColor}`}>{item.name}</span>
                <span className={`tabular-nums font-bold ${textColor}`}>
                  {displayValue}
                  {unit}
                </span>
              </div>
              <div className={`h-3.5 overflow-hidden rounded-full ${trackColor}`}>
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
