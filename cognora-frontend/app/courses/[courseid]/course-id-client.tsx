"use client";
import { Lesson } from "@/app/features/courses/types/lesson";
import Chatbot from "./chatbot";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Video } from "lucide-react";

export default function CourseIdClient({
  courseId,
  orgId,
  lessons,
}: {
  courseId: string;
  orgId: number;
  lessons: Lesson[];
}) {
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  function toYouTubeEmbed(url: string) {
    try {
      const u = new URL(url);

      // case 1: watch?v=
      if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
        const id = u.searchParams.get("v");
        return `https://www.youtube.com/embed/${id}`;
      }

      // case 2: youtu.be short link
      if (u.hostname === "youtu.be") {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }

      return url;
    } catch {
      return url;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-[#1C1C1C]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT: LECTURES / LESSON TRACK */}
        <div className="lg:col-span-2 space-y-4">
          {/* Branded Section Header in Sentence Case */}
          <div className="mb-1">
            <span className="text-xs font-bold tracking-wider text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full inline-block">
              Course workspace
            </span>
            <h1 className="text-3xl font-bold tracking-tight mt-3">
              Reviewing curriculum for{" "}
              <span className="text-[#F97316]">Course {courseId}</span>
            </h1>
            <p className="text-[#1C1C1C]/70 font-bold text-2xl m-3">Lessons: </p>
          </div>

          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="bg-white rounded-2xl border border-[#F97316]/10 shadow-sm p-4 md:p-4 flex flex-col gap-2"
            >
              <CardHeader className="p-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#1C1C1C]/5 flex items-center justify-center text-[#F97316]">
                    <Video className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#1C1C1C]">
                    {lesson.name}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-0 space-y-5">
                <CardDescription className="text-[#1C1C1C]/70 font-medium leading-relaxed">
                  {lesson.description}
                </CardDescription>

                {/* Upgraded iframe container to utilize responsive aspect ratios instead of rigid pixel properties */}
                <div className="aspect-video w-3/4 rounded-xl overflow-hidden border border-[#1C1C1C]/5 shadow-inner bg-[#FAFAF8]">
                  <iframe
                    className="w-full h-full"
                    src={toYouTubeEmbed(lesson.lesson_video_url || "")}
                    title={lesson.name}
                    allowFullScreen
                  />
                </div>
              </CardContent>

              {/* Clean, individual action selector */}
              <div className="pt-2">
                <Button
                  onClick={() => {
                    setShowChatbot(true);
                    setSelectedLessonId(lesson.id.toString());
                  }}
                  variant="outline"
                  className="h-11 px-5 rounded-xl border border-[#F97316]/20 text-[#1C1C1C] font-medium bg-white hover:bg-[#F97316] hover:text-white transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span>Test AI tutor for this lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* RIGHT: LIVE COGNORA WIDGET SIMULATION */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          {/* Dropped green/5 and dark mode border structures for clear warm-bordered aesthetics */}
          <div className="bg-white rounded-2xl border border-[#F97316]/15 p-6 shadow-sm min-h-[70vh] flex flex-col">
            <div className="border-b border-[#1C1C1C]/5 pb-4 mb-5">
              <div className="flex items-center gap-2 text-[#F97316] mb-1">
                <Sparkles className="w-4 h-4" fill="currentColor" />
                <span className="text-xs font-bold tracking-wide uppercase">
                  LMS Ai Tutor:Aria
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Engine Bracket */}
            <div className="grow flex flex-col justify-between">
              {showChatbot ? (
                <div className="grow rounded-xl border border-[#1C1C1C]/5 bg-[#FAFAF8] p-2 h-full min-h-112.5">
                  <Chatbot
                    courseId={courseId}
                    lessonId={selectedLessonId || ""}
                    orgId={orgId}
                  />
                </div>
              ) : (
                // Added an intentional placeholder empty state so the layout does not look broken when initialized
                <div className="grow flex flex-col items-center justify-center text-center p-6 bg-[#FAFAF8]/50 rounded-xl border border-dashed border-[#1C1C1C]/10 min-h-87.5">
                  <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[#1C1C1C]">
                    No active tutoring session
                  </p>
                  <p className="text-xs text-black max-w-55 mt-1 leading-relaxed">
                    Select a lesson sequence on the left to wake up the live AI
                    preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
