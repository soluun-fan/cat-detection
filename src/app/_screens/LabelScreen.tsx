import type { Label, Photo } from "../_lib/types";
import { StepCard } from "../_components/StepCards";
import { CountPills } from "../_components/CountPills";
import { PhotoTile } from "../_components/PhotoTile";
import { LabelButtons } from "../_components/LabelButtons";
import { HelpBox } from "../_components/HelpBox";
import { BackButton } from "../_components/BackButton";
import { MainButton } from "../_components/MainButton";
import { LockedButton } from "../_components/LockedButton";

interface LabelScreenProps {
  photos: Photo[];
  onLabel: (id: string, label: Label) => void;
  onBack: () => void;
  onNext: () => void;
}

export const LabelScreen = (props: LabelScreenProps) => {
  const { photos, onLabel, onBack, onNext } = props;

  const cats = photos.filter((photo) => photo.label === "cat").length;
  const notCats = photos.filter((photo) => photo.label === "not_cat").length;
  const left = photos.length - cats - notCats;

  const ready = left === 0 && cats > 0 && notCats > 0;

  let lockedText = `Label ${left} more to continue`;
  if (left === 0 && cats === 0) lockedText = "You need at least 1 Cat";
  if (left === 0 && notCats === 0) lockedText = "You need at least 1 Not cat";

  const next = () => {
    if (ready) onNext();
  };

  return (
    <StepCard title="Step 2: Tell the model what each photo is">
      <CountPills cat={cats} notCat={notCats} left={left} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {photos.map((photo) => (
          <PhotoTile key={photo.id} src={photo.url} label={photo.label}>
            <LabelButtons value={photo.label} onChange={(label) => onLabel(photo.id, label)} />
          </PhotoTile>
        ))}
      </div>

      <HelpBox title="Why label?">Your labels are the answers. The model learns by checking its guesses against them.</HelpBox>

      <div className="flex flex-wrap justify-between gap-3">
        <BackButton onClick={onBack} />
        {ready ? <MainButton onClick={next}>Next: Train</MainButton> : <LockedButton>{lockedText}</LockedButton>}
      </div>
    </StepCard>
  );
};
