import type { Guess } from "./types";

export const ROUNDS = 10;

export const fakeAccuracy = (round: number) => {
  const curve = 0.5 + 0.4 * (round / ROUNDS);
  return Math.min(curve + Math.random() * 0.05, 1);
};

export const fakeGuess = (): Guess => ({
  label: Math.random() < 0.5 ? "cat" : "not_cat",
  sure: 0.55 + Math.random() * 0.4,
});
