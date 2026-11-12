interface StepCardProps {
  title: string;
  children: React.ReactNode;
}

export const StepCard = (props: StepCardProps) => {
  const { title, children } = props;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-5 sm:p-7">
      <h2 className="font-display text-[26px] font-semibold leading-tight">{title}</h2>
      {children}
    </div>
  );
};
