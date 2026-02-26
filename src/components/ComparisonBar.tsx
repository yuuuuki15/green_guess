import type { Language } from '../types/quiz';

interface Props {
  animalName: string;
  animalAmount: number;
  plantName: string;
  plantAmount: number;
  unit: string;
  lang: Language;
}

export function ComparisonBar({
  animalName,
  animalAmount,
  plantName,
  plantAmount,
  unit,
}: Props) {
  const maxVal = Math.max(animalAmount, plantAmount);

  return (
    <div className="animate-fade-in mt-4 space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-secondary">{animalName}</span>
          <span className="tabular-nums font-bold text-secondary">
            {animalAmount}
            {unit}
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-700 ease-out"
            style={{ width: `${(animalAmount / maxVal) * 100}%` }}
          />
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-primary">{plantName}</span>
          <span className="tabular-nums font-bold text-primary">
            {plantAmount}
            {unit}
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-green-100">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${(plantAmount / maxVal) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
