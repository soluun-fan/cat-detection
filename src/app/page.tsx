"use client";

import { useEffect, useState } from "react";
import { getPhotos, saveLabel, uploadPhotos } from "./_lib/api";
import type { Label, Photo, TestPhoto } from "./_lib/types";
import { fakeGuess } from "./_lib/fakeModel";
import { StepBar } from "./_components/StepBar";
import { UploadScreen } from "./_screens/UploadScreen";
import { LabelScreen } from "./_screens/LabelScreen";
import { TrainScreen } from "./_screens/TrainScreen";
import { TestScreen } from "./_screens/TestScreen";
export default function Home() {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [accuracies, setAccuracies] = useState<number[]>([]);
  const [testPhotos, setTestPhotos] = useState<TestPhoto[]>([]);
useEffect(() => {
  getPhotos("training").then(setPhotos);
}, []);

  const back = () => setStep((s) => s - 1);
  const next = () => setStep((s) => s + 1);

const addPhotos = async (files: File[]) => {
  const added = await uploadPhotos(files, "training");
  setPhotos((old) => [...old, ...added]);
};

const labelPhoto = (id: string, label: Label) => {
  setPhotos((old) => old.map((photo) => (photo.id === id ? { ...photo, label } : photo)));
  saveLabel(id, label).catch(() => alert("Could not save the label. Try again."));
};

  const addTestPhotos = async (files: File[]) => {
    const added = (await uploadPhotos(files, "testing")).map((photo) => ({ ...photo, guess: fakeGuess() }));
    setTestPhotos((old) => [...old, ...added]);
  };

  const labelTestPhoto = (id: string, label: Label) => {
    setTestPhotos((old) => old.map((photo) => (photo.id === id ? { ...photo, label } : photo)));
    saveLabel(id, label).catch(() => alert("Could not save the label. Try again."));
  };

  return (
    <div className="min-h-screen bg-page">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 text-ink">
        <h1 className="font-display text-[28px] font-semibold">Cat Classifier Lab</h1>
        <StepBar current={step} />

        {step === 1 && <UploadScreen photos={photos} onAdd={addPhotos} onNext={next} />}

        {step === 2 && <LabelScreen photos={photos} onLabel={labelPhoto} onBack={back} onNext={next} />}

        {step === 3 && (
          <TrainScreen
            accuracies={accuracies}
            onStart={() => setAccuracies([])}
            onRound={(accuracy) => setAccuracies((old) => [...old, accuracy])}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 4 && <TestScreen photos={testPhotos} onAdd={addTestPhotos} onLabel={labelTestPhoto} onBack={back} />}
      </main>
    </div>
  );
}
