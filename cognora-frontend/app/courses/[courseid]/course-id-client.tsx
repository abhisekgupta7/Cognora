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
import { ArrowRight } from "lucide-react";

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
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: LECTURES */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-xl font-semibold">
            Course Detail Page for Course ID: {courseId}
          </h1>

          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <CardTitle>{lesson.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <CardDescription>{lesson.description}</CardDescription>

                <CardDescription>
                  Lesson Video Url: {lesson.lesson_video_url}
                </CardDescription>

                <div className="aspect-video w-full">
                  <iframe
                    className="w-140 h-79  rounded-md"
                    src={toYouTubeEmbed(lesson.lesson_video_url || "")}
                    title={lesson.name}
                    allowFullScreen
                  />
                </div>
              </CardContent>
              <Button
                onClick={() => {
                  setShowChatbot((prev) => !prev);
                  setSelectedLessonId(lesson.id.toString());
                }}
                variant="outline"
                size="sm"
              >
                <p>Ai tutor</p>
                <ArrowRight className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        {/* RIGHT: AI TUTOR */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <div className="p-4 border rounded-lg bg-green/5 border-white/10 h-[80vh]">
              <h2 className="text-lg font-semibold mb-2">AI Tutor</h2>

              <div className="text-sm text-muted-foreground">
                Ask questions about this course content.
              </div>

              {/* Replace this with your chatbot component later */}
              {showChatbot && (
                <div className="mt-4 h-full border rounded-md p-2">
                  <Chatbot
                    courseId={courseId}
                    lessonId={selectedLessonId || ""}
                    orgId={orgId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
