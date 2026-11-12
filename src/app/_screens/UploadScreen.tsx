import type { Photo } from "../_lib/types";
import { StepCard } from "../_components/StepCards";
import { UploadBox } from "../_components/UploadBox";
import { PhotoTile } from "../_components/PhotoTile";
import { HelpBox } from "../_components/HelpBox";
import { MainButton } from "../_components/MainButton";
import { LockedButton } from "../_components/LockedButton";

interface UploadScreenProps {
  photos: Photo[];
  onAdd: (files: File[]) => void;
  onNext: () => void;
}

export const UploadScreen = (props: UploadScreenProps) => {
  const { photos, onAdd, onNext } = props;

  const missing = 2 - photos.length;
  const ready = missing <= 0;

  const next = () => {
    if (ready) onNext();
  };

  return (
    <StepCard title="Step 1: Add your photos">
      <UploadBox onFiles={onAdd} />

      {photos.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
          {photos.map((photo) => (
            <PhotoTile key={photo.id} src={photo.url} label={photo.label} />
          ))}
        </div>
      )}

      <HelpBox title="Why so many photos?">The model learns only from what you show it.</HelpBox>

      <div className="flex justify-end">
        {ready ? (
          <MainButton onClick={next}>Next: Label photos</MainButton>
        ) : (
          <LockedButton>Add {missing} more {missing === 1 ? "photo" : "photos"}</LockedButton>
        )}
      </div>
    </StepCard>
  );
};
