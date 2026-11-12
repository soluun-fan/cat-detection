interface HelpBoxProps {
  title: string;
  children: React.ReactNode;
}

export const HelpBox = (props: HelpBoxProps) => {
  const { title, children } = props;

  return (
    <div className="rounded-xl bg-blue-soft px-4 py-3 text-[15px]">
      <b>{title}</b> {children}
    </div>
  );
};

