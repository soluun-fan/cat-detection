interface LockedButtonProps {
  children: React.ReactNode;
}

export const LockedButton = (props: LockedButtonProps) => {
  const { children } = props;

  return (
    <button
      type="button"
      disabled
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border-2 border-transparent bg-line px-8 py-4 text-lg font-bold text-muted"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
      {children}
    </button>
  );
};
