interface CountPillsProps {
  cat: number;
  notCat: number;
  left?: number;
}

export const CountPills = (props: CountPillsProps) => {
  const { cat, notCat, left } = props;

  return (
    <div className="flex flex-wrap gap-3 text-[15px] font-bold">
      <span className="rounded-full bg-cat-soft px-4 py-1 text-cat">Cat: {cat}</span>
      <span className="rounded-full bg-not-soft px-4 py-1 text-not">Not cat: {notCat}</span>
      {left !== undefined && (
        <span className="rounded-full bg-page px-4 py-1 text-muted">Still to label: {left}</span>
      )}
    </div>
  );
};
