"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Course } from "@/app/features/courses/types/course";

export default function TranscriptClient({ courses, orgId }: { courses: Course[], orgId: number }) {
  const handleTranscriptInitiation = async (courseId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/ingestion/ingest_course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: courseId,
        org_id: orgId,
      }),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      console.log("Transcript initiated successfully:", data);
      toast.success("Transcript initiated successfully!");
    } else {
      console.error("Failed to initiate transcript:", data);
      toast.error("Failed to initiate transcript.");
    }
  };
  return (
    <div>
          <p className="text-lg font-semibold">Send request to generate transcript.</p>
          {courses.map((course) => (
            <Button
              key={course.id}
              onClick={() => handleTranscriptInitiation(course.id)}
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Initiate Transcript for {course.name}
            </Button>
          ))}
    </div>
  );
}
