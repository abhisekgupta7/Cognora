"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Course } from "@/app/features/courses/types/course";
import { Cpu, Languages } from "lucide-react";

export default function TranscriptClient({
  courses,
  orgId,
}: {
  courses: Course[];
  orgId: number;
}) {
  const handleTranscriptInitiation = async (courseId: string) => {
    toast.loading("Initiating transcript generation...");
    const response = await fetch("/api/transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        org_id: orgId,
      }),
    });
    const data = await response.json();

    if (response.ok) {
  toast.success("Transcript initiated successfully!", { position: "top-center" });
} else {
  toast.error("Failed to initiate transcript.");
}
  };
  return (
    <div className="w-full text-[#1C1C1C]">
      {/* Section metadata header */}
      <p className="text-xs font-bold text-[#1C1C1C]/50 uppercase tracking-wide mb-4">
        Available course libraries
      </p>

      {/* List-row layout for a cleaner B2B SaaS dashboard execution */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-[#1C1C1C]/5 rounded-xl gap-4 hover:border-[#F97316]/20 transition-all"
          >
            {/* Left Side: Course contextual alignment tracking */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#1C1C1C]/5 flex items-center justify-center text-[#F97316] shrink-0">
                <Languages className="w-4 h-4" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1C1C1C] leading-snug">
                  {course.name}
                </h4>
                {/* Visual callback to your specific region targets */}
                <p className="text-xs text-[#1C1C1C]/50 font-medium mt-0.5">
                  Regional localization scope: EN • HI • NE
                </p>
              </div>
            </div>

            {/* Right Side: Core transcription request CTA */}
            <button
              type="button"
              onClick={() => handleTranscriptInitiation(course.id)}
              className="h-10 px-4 bg-white hover:bg-[#F97316] text-[#1C1C1C] hover:text-white border border-[#1C1C1C]/15 hover:border-transparent font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Generate AI transcript</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
