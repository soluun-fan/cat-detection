import type { Label, TestPhoto } from "../_lib/types";
import { StepCard } from "../_components/StepCards";
import { Score } from "../_components/Score";
import { ResultTile } from "../_components/ResultTile";
import { PhotoTile } from "../_components/PhotoTile";
import { LabelButtons } from "../_components/LabelButtons";
import { UploadBox } from "../_components/UploadBox";
import { GuessResult } from "../_components/GuessResult";
import { HelpBox } from "../_components/HelpBox";
import { BackButton } from "../_components/BackButton";

interface TestScreenProps {
  photos: TestPhoto[];
  onAdd: (files: File[]) => void;
  onLabel: (id: string, label: Label) => void;
  onBack: () => void;
}

export const TestScreen = (props: TestScreenProps) => {
  const { photos, onAdd, onLabel, onBack } = props;

  const checked = photos.filter((photo) => photo.label !== null);
  const right = checked.filter((photo) => photo.guess.label === photo.label).length;
  const newest = photos[photos.length - 1];

  return (
    <StepCard title="Step 4: Test with new photos">
      {checked.length > 0 && <Score right={right} total={checked.length} />}

      {photos.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
          {photos.map((photo) =>
            photo.label ? (
              <ResultTile key={photo.id} src={photo.url} guess={photo.guess.label} right={photo.guess.label === photo.label} />
            ) : (
              <PhotoTile key={photo.id} src={photo.url}>
                <LabelButtons value={null} onChange={(label) => onLabel(photo.id, label)} />
              </PhotoTile>
            ),
          )}
        </div>
      )}

      <UploadBox onFiles={onAdd} title="Click to add test photos" hint="Use photos the model has never seen" />

      {newest && <GuessResult src={newest.url} guess={newest.guess} />}

      <HelpBox title="Why new photos?">
        Test photos are never used in training. Tell us what each one really is, and you will see if the model was right.
      </HelpBox>

      <div className="flex">
        <BackButton onClick={onBack} />
      </div>
    </StepCard>
  );
};
