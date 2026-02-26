interface Props {
  current: number;
  total: number;
  categoryLabel: string;
}

export function ProgressBar({ current, total, categoryLabel }: Props) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-primary">{categoryLabel}</span>
        <span className="text-gray-500">
          {current + 1} / {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
