interface MainButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  big?: boolean;
  disabled?: boolean;
}

export const MainButton = (props: MainButtonProps) => {
  const { children, onClick, big, disabled } = props;
  const size = big ? "px-10 py-5 text-xl" : "px-8 py-4 text-lg";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl border-2 border-transparent bg-blue font-bold text-white shadow-md shadow-blue/30 transition hover:brightness-110 active:translate-y-0.5 active:shadow-sm disabled:cursor-wait ${size}`}
    >
      {children}
    </button>
  );
};
