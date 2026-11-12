export async function GET() {
  return new Response("Hello, Next.js!");
}
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  return new Response("Post works. You sent the name " + body.name);
}
export async function PUT(request: Request) {
  const body = await request.json();
  console.log(body);
  return new Response("Put works. You sent the name " + body.name);
}
export async function DELETE() {
  return new Response("Delete works.");
}
export async function PATCH(request: Request) {
  const body = await request.json();
  console.log(body);
  return new Response("Patch works. You sent the name " + body.name);
}
