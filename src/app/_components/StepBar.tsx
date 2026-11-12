import { StepDot } from "./StepDot";

const STEPS = ["Upload", "Label", "Train", "Test"];

interface StepBarProps {
  current: number;
}

export const StepBar = (props: StepBarProps) => {
  const { current } = props;

  return (
    <div className="grid grid-cols-4 gap-2">
      {STEPS.map((label, i) => (
        <StepDot key={label} number={i + 1} label={label} current={current} />
      ))}
    </div>
  );
};
