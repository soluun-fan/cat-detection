interface UploadBoxProps {
  onFiles: (files: File[]) => void;
  title?: string;
  hint?: string;
}

export const UploadBox = (props: UploadBoxProps) => {
  const { onFiles, title = "Click to choose photos", hint = "You can pick many photos at once" } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) onFiles(files);
    event.target.value = "";
  };

  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-3 border-dashed border-line px-5 py-9 text-center hover:border-blue focus-within:border-blue">
      <svg
        viewBox="0 0 24 24"
        className="h-14 w-14 text-blue"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 16V4m0 0l-5 5m5-5l5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
      </svg>
      <b>{title}</b>
      <span className="text-muted">{hint}</span>
      <input type="file" accept="image/jpeg,image/png,image/webp,image/avif"
 multiple className="sr-only" onChange={handleChange} />
    </label>
  );
};
