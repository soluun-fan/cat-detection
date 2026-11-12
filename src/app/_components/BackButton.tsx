interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = (props: BackButtonProps) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border-2 border-line px-8 py-4 text-lg font-bold text-ink transition hover:border-muted hover:bg-page"
    >
      ← Back
    </button>
  );
};
