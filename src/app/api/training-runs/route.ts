import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { rounds, accuracy, modelUrl } = body ?? {};

  if (!Number.isInteger(rounds) || rounds < 1) {
    return Response.json({ error: "rounds must be a whole number, 1 or more" }, { status: 400 });
  }
  if (typeof accuracy !== "number" || accuracy < 0 || accuracy > 1) {
    return Response.json({ error: "accuracy must be between 0 and 1" }, { status: 400 });
  }
  if (typeof modelUrl !== "string") {
    return Response.json({ error: "modelUrl must be text" }, { status: 400 });
  }

  const run = await prisma.trainingRun.create({ data: { rounds, accuracy, modelUrl } });
  return Response.json(run, { status: 201 });
}
