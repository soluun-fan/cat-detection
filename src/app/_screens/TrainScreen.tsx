import { useEffect, useState } from "react";
import { fakeAccuracy, ROUNDS } from "../_lib/fakeModel";
import { StepCard } from "../_components/StepCards";
import { MainButton } from "../_components/MainButton";
import { RoundCounter } from "../_components/RoundCounter";
import { ProgressBar } from "../_components/ProgressBar";
import { AccuracyChart } from "../_components/AccuracyChart";
import { HelpBox } from "../_components/HelpBox";
import { BackButton } from "../_components/BackButton";
import { LockedButton } from "../_components/LockedButton";

interface TrainScreenProps {
  accuracies: number[];
  onStart: () => void;
  onRound: (accuracy: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export const TrainScreen = (props: TrainScreenProps) => {
  const { accuracies, onStart, onRound, onBack, onNext } = props;
  const [started, setStarted] = useState(false);

  const round = accuracies.length;
  const done = round === ROUNDS;
  const running = started && !done;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => onRound(fakeAccuracy(round + 1)), 600);
    return () => clearTimeout(timer);
  }, [running, round, onRound]);

  const start = () => {
    onStart();
    setStarted(true);
  };

  const next = () => {
    if (done) onNext();
  };

  let startText = "Start training";
  if (running) startText = "Training…";
  if (done) startText = "Train again";

  return (
    <StepCard title="Step 3: Train the model">
      <div className="flex justify-center">
        <MainButton big onClick={start} disabled={running}>
          {startText}
        </MainButton>
      </div>

      <RoundCounter round={round} total={ROUNDS} />
      <ProgressBar percent={(round / ROUNDS) * 100} />
      <AccuracyChart accuracies={accuracies} total={ROUNDS} />

      <HelpBox title="What is happening?">After each round the model checks its guesses and fixes itself a little.</HelpBox>

      <div className="flex flex-wrap justify-between gap-3">
        <BackButton onClick={onBack} />
        {done ? <MainButton onClick={next}>Next: Test the model</MainButton> : <LockedButton>Finish all {ROUNDS} rounds first</LockedButton>}
      </div>
    </StepCard>
  );
};
