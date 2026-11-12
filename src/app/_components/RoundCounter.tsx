interface RoundCounterProps {
  round: number;
  total: number;
}

export const RoundCounter = (props: RoundCounterProps) => {
  const { round, total } = props;

  return (
    <div className="text-center">
      <div className="text-[15px] text-muted">Round</div>
      <div className="font-display text-[44px] font-semibold leading-tight">
        {round} / {total}
      </div>
    </div>
  );
};
