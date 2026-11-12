interface ProgressBarProps {
  percent: number;
  color?: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { percent, color = "bg-blue" } = props;

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-4 overflow-hidden rounded-full border border-line bg-page"
    >
      <div className={`h-full rounded-full transition-[width] ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
};
