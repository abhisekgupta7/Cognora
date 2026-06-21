import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(`${process.env.FASTAPI_URL}/quiz/generate_quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lesson_id: body.lesson_id,
      org_id: body.org_id,
    }),
  });

  return new Response(response.body, {
    headers: { "Content-Type": "text/plain" },
  });
}