import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.FASTAPI_URL}/ingestion/ingest_course`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: body.course_id,
        org_id: body.org_id,
      }),
    },
  );

  const data = await response.json();
if (response.ok) {
  console.log("Transcript initiated successfully:", data);
} else {
  console.error("Failed to initiate transcript:", data);
}
    return NextResponse.json(data, { status: response.status });
}
