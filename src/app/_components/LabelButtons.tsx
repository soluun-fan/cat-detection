import type { Label } from "../_lib/types";

interface LabelButtonsProps {
  value: Label | null;
  onChange: (label: Label) => void;
}

export const LabelButtons = (props: LabelButtonsProps) => {
  const { value, onChange } = props;
  const isCat = value === "cat";
  const isNotCat = value === "not_cat";

  return (
    <div className="grid grid-cols-2 border-t-2 border-line text-base font-bold">
      <button
        type="button"
        aria-pressed={isCat}
        onClick={() => onChange("cat")}
        className={`px-1 py-4 transition ${isCat ? "bg-cat-soft text-cat" : "hover:bg-page"}`}
      >
        Cat
      </button>
      <button
        type="button"
        aria-pressed={isNotCat}
        onClick={() => onChange("not_cat")}
        className={`border-l-2 border-line px-1 py-4 transition ${isNotCat ? "bg-not-soft text-not" : "hover:bg-page"}`}
      >
        Not cat
      </button>
    </div>
  );
};
