import type { Label, Photo } from "./types";

type Ground = "training" | "testing";

const uploadOne = async (file: File, ground: Ground): Promise<Photo | null> => {
  const form = new FormData();
  form.append("file", file);
  form.append("ground", ground);

  const res = await fetch("/api/photos", { method: "POST", body: form });
  if (!res.ok) {
    console.error("Upload failed", await res.json());
    return null;
  }
  return res.json();
};

export const uploadPhotos = async (files: File[], ground: Ground) => {
  const photos = await Promise.all(files.map((file) => uploadOne(file, ground)));
  return photos.filter((photo) => photo !== null);
};

export const getPhotos = async (ground: Ground): Promise<Photo[]> => {
  const res = await fetch(`/api/photos?ground=${ground}`);
  if (!res.ok) throw new Error("Could not load photos");
  return res.json();
};

export const saveLabel = async (id: string, label: Label) => {
  const res = await fetch(`/api/photos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label }),
  });
  if (!res.ok) throw new Error("Could not save the label");
};

export const saveTrainingRun = async (run: { rounds: number; accuracy: number; modelUrl: string }) => {
  const res = await fetch("/api/training-runs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(run),
  });
  if (!res.ok) throw new Error("Could not save the training run");
};
