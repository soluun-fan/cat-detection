import type { Label } from "../_lib/types";
import { PhotoTile } from "./PhotoTile";

interface ResultTileProps {
  src: string;
  guess: Label;
  right: boolean;
}

export const ResultTile = (props: ResultTileProps) => {
  const { src, guess, right } = props;

  return (
    <PhotoTile src={src} result={right ? "right" : "wrong"}>
      <div className="flex flex-col border-t-2 border-line px-3 py-2 text-sm">
        <b className={right ? "text-not" : "text-bad"}>{right ? "Right" : "Wrong"}</b>
        <span>Guessed: {guess === "cat" ? "Cat" : "Not cat"}</span>
      </div>
    </PhotoTile>
  );
};
