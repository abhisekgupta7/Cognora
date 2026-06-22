import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.FASTAPI_URL}/student_report/generate_report`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: body.user_id,
        lesson_id: body.lesson_id,
        org_id: body.org_id,
      }),
    },
  );

  const data = await response.json();
  if (response.ok) {
    console.log("Student report generated successfully:", data);
  } else {
    console.error("Failed to generate student report:", data);
  }
  return NextResponse.json(data, { status: response.status });
}
