interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
}

export function Slider({ min, max, step, value, onChange, unit }: Props) {
  return (
    <div className="mt-6 mb-6">
      <div className="mb-4 text-center">
        <span className="tabular-nums text-5xl font-extrabold text-primary">
          {value}
        </span>
        <span className="ml-1 text-2xl font-medium text-gray-500">{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
