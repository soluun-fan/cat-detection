import type { Guess } from "../_lib/types";
import { ProgressBar } from "./ProgressBar";

interface GuessResultProps {
  src: string;
  guess: Guess;
}

export const GuessResult = (props: GuessResultProps) => {
  const { src, guess } = props;
  const isCat = guess.label === "cat";
  const percent = Math.round(guess.sure * 100);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <img src={src} crossOrigin="anonymous" alt="Your new photo" className="h-[150px] w-[150px] shrink-0 rounded-xl border-2 border-line object-cover" />
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-muted">The model thinks this is</span>
        <span className={`font-display text-[26px] font-semibold ${isCat ? "text-cat" : "text-not"}`}>
          {isCat ? "A cat" : "Not a cat"}
        </span>
        <ProgressBar percent={percent} color={isCat ? "bg-cat" : "bg-not"} />
        <span className="text-muted">It is {percent}% sure.</span>
      </div>
    </div>
  );
};
