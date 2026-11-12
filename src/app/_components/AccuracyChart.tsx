interface AccuracyChartProps {
  accuracies: number[];
  total: number;
}

const LEFT = 44;
const RIGHT = 388;
const TOP = 12;
const BOTTOM = 158;

export const AccuracyChart = (props: AccuracyChartProps) => {
  const { accuracies, total } = props;

  const x = (round: number) => LEFT + ((round - 1) / (total - 1)) * (RIGHT - LEFT);
  const y = (accuracy: number) => BOTTOM - accuracy * (BOTTOM - TOP);

  const points = accuracies.map((accuracy, i) => `${x(i + 1)},${y(accuracy)}`).join(" ");
  const last = accuracies.length;
  const middle = Math.ceil(total / 2);

  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" role="img" aria-label="How often the model is right after each round">
      <g className="stroke-line">
        <line x1={LEFT} x2={RIGHT} y1={y(0)} y2={y(0)} />
        <line x1={LEFT} x2={RIGHT} y1={y(0.5)} y2={y(0.5)} />
        <line x1={LEFT} x2={RIGHT} y1={y(1)} y2={y(1)} />
      </g>

      <g className="fill-muted" fontSize={12} textAnchor="end">
        <text x={36} y={y(0) + 4}>0%</text>
        <text x={36} y={y(0.5) + 4}>50%</text>
        <text x={36} y={y(1) + 4}>100%</text>
      </g>

      <g className="fill-muted" fontSize={12} textAnchor="middle">
        <text x={x(1)} y={192}>round 1</text>
        <text x={x(middle)} y={192}>round {middle}</text>
        <text x={x(total)} y={192}>round {total}</text>
      </g>

      {last > 0 && (
        <>
          <polyline points={points} fill="none" className="stroke-blue" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x(last)} cy={y(accuracies[last - 1])} r={5} className="fill-blue" />
        </>
      )}
    </svg>
  );
};
