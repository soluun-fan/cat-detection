import { prisma } from "@/lib/prisma";

const LABELS = ["cat", "not_cat"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Send raw JSON like { \"label\": \"cat\" }, not form-data" }, { status: 400 });
  }
  if (!LABELS.includes(body.label)) {
    return Response.json({ error: `label must be cat or not_cat, but you sent ${JSON.stringify(body.label)}` }, { status: 400 });
  }
  const exists = await prisma.photo.findUnique({ where: { id } });
  if (!exists) {
    return Response.json({ error: "No photo with that id" }, { status: 404 });
  }

  const photo = await prisma.photo.update({ where: { id }, data: { label: body.label } });

  return Response.json({ id: photo.id, label: photo.label });
}
