import "server-only";
import type { Photo as PhotoRow } from "@/generated/prisma/client";
import { BUCKET, supabase } from "./supabase";

const ONE_HOUR = 60 * 60;

export const withLinks = async (rows: PhotoRow[]) => {
  if (rows.length === 0) return [];

  const paths = rows.map((row) => row.storagePath);
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(paths, ONE_HOUR);
  if (error) throw error;

  const links = new Map(data.filter((link) => !link.error).map((link) => [link.path, link.signedUrl]));
  return rows
    .filter((row) => links.has(row.storagePath))
    .map((row) => ({
      id: row.id,
      label: row.label,
      ground: row.ground,
      url: links.get(row.storagePath)!,
    }));
};
