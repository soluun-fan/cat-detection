import type { Label } from "../_lib/types";

interface PhotoTileProps {
  src: string;
  label?: Label | null;
  result?: "right" | "wrong"; 
  children?: React.ReactNode; 
}

export const PhotoTile = (props: PhotoTileProps) => {
  const { src, label, result, children } = props;

  
  let border = "border-line";
  if (label === "cat") border = "border-cat";
  if (label === "not_cat") border = "border-not";
  if (result === "right") border = "border-not";
  if (result === "wrong") border = "border-bad";

  return (
    <div className={`overflow-hidden rounded-xl border-2 bg-card ${border}`}>
<img src={src} alt="Uploaded photo" crossOrigin="anonymous" className="aspect-square w-full object-cover" />
      {children}
    </div>
  );
};
