import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

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
  if (response.ok && data.success) {
    console.log("Transcript initiated successfully:", data);
    toast.success("Transcript initiated successfully!");
  } else {
    console.error("Failed to initiate transcript:", data);
    toast.error("Failed to initiate transcript.");
  }
    return NextResponse.json(data, { status: response.status });
}
