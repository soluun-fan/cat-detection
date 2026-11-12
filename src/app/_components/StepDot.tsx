interface StepDotProps {
  number: number;
  label: string;
  current: number;
}

export const StepDot = (props: StepDotProps) => {
  const { number, label, current } = props;
  const isNow = number === current;
  const isDone = number < current;

  let dotColor = "border-line bg-card text-ink";
  if (isNow) dotColor = "border-blue bg-blue text-white";
  if (isDone) dotColor = "border-blue bg-blue-soft text-blue";

  return (
    <div className={`flex flex-col items-center gap-2 text-[15px] font-bold ${isNow ? "text-ink" : "text-muted"}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-lg font-semibold ${dotColor}`}>
        {number}
      </div>
      {label}
    </div>
  );
};
