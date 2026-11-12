export type Label = "cat" | "not_cat";

export interface Photo {
  id: string;
  url: string;
  label: Label | null;
}

export interface Guess {
  label: Label;
  sure: number;
}

export interface TestPhoto extends Photo {
  guess: Guess;
}
