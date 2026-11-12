import { prisma } from "@/lib/prisma";
import { BUCKET, supabase } from "@/lib/supabase";
import { withLinks } from "@/lib/photos";

const GROUNDS = ["training", "testing"];
const MAX_SIZE = 5 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return Response.json({ error: "Send form-data with 'file' and 'ground', not JSON" }, { status: 400 });
  }
  const file = form.get("file");
  const ground = form.get("ground");

  if (!(file instanceof File) || !EXTENSIONS[file.type]) {
    return Response.json({ error: "Send one JPG, PNG, WEBP or AVIF photo as 'file'" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "Photo is bigger than 5 MB" }, { status: 400 });
  }
  if (typeof ground !== "string" || !GROUNDS.includes(ground)) {
    return Response.json({ error: "ground must be training or testing" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const storagePath = `${ground}/${id}.${EXTENSIONS[file.type]}`;
  const upload = await supabase.storage.from(BUCKET).upload(storagePath, file, { contentType: file.type });
  if (upload.error) {
    return Response.json({ error: upload.error.message }, { status: 500 });
  }

  let row;
  try {
    row = await prisma.photo.create({ data: { id, storagePath, ground } });
  } catch (error) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    console.error(error);
    return Response.json({ error: "Could not save the photo" }, { status: 500 });
  }

  const [photo] = await withLinks([row]);
  return Response.json(photo, { status: 201 });
}

export async function GET(request: Request) {
  const ground = new URL(request.url).searchParams.get("ground") ?? "training";
  if (!GROUNDS.includes(ground)) {
    return Response.json({ error: "ground must be training or testing" }, { status: 400 });
  }

  const rows = await prisma.photo.findMany({ where: { ground }, orderBy: { createdAt: "asc" } });
  return Response.json(await withLinks(rows));
}
 