interface ScoreProps {
  right: number;
  total: number;
}

export const Score = (props: ScoreProps) => {
  const { right, total } = props;

  return (
    <div className="text-center">
      <div className="font-display text-5xl font-semibold">
        {right} / {total}
      </div>
      <div className="text-[17px] text-muted">test photos right</div>
    </div>
  );
};
