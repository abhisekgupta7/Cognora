"use client";
import { Lesson } from "@/app/features/courses/types/lesson";
import Chatbot from "./chatbot";
import QuizPage from "./quiz";
import { useState } from "react";
import { Sparkles, Video, BookOpen, FileText } from "lucide-react";
import CourseReportPage from "./report";

export default function CourseIdClient({
  courseId,
  orgId,
  lessons,
}: {
  courseId: string;
  orgId: number;
  lessons: Lesson[];
}) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    lessons[0] || null,
  );
  const [activeTab, setActiveTab] = useState<"video" | "ai" | "quiz"| "report">("video");

  function toYouTubeEmbed(url: string) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com") && u.searchParams.get("v"))
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      if (u.hostname === "youtu.be")
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      return url;
    } catch {
      return url;
    }
  }

  const tabs = [
    { key: "video", label: "Video", icon: Video },
    { key: "ai", label: "AI Tutor", icon: Sparkles },
    { key: "quiz", label: "Quiz", icon: BookOpen },
    { key: "report", label: "Report", icon: FileText },
  ] as const;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#FAFAF8] text-[#1C1C1C]">
      {/* LEFT: Lesson List */}
      <div className="w-80 border-r border-[#1C1C1C]/5 bg-white flex flex-col overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[#1C1C1C]/5">
          <h2 className="font-bold text-sm text-[#1C1C1C]/50 uppercase tracking-wider">
            Course Content
          </h2>
        </div>
        <div className="flex flex-col">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`text-left px-4 py-4 border-b border-[#1C1C1C]/5 flex items-start gap-3 transition-colors cursor-pointer ${
                selectedLesson?.id === lesson.id
                  ? "bg-[#F97316]/10 border-l-2 border-l-[#F97316]"
                  : "hover:bg-[#FAFAF8]"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Video className="w-3 h-3 text-[#F97316]" />
              </div>
              <div>
                <p className="text-xs text-[#1C1C1C]/50 mb-0.5">
                  Lesson {index + 1}
                </p>
                <p className="text-sm font-medium text-[#1C1C1C] leading-snug">
                  {lesson.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#1C1C1C]/5 bg-white">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === key
                  ? "border-b-2 border-[#F97316] text-[#F97316]"
                  : "text-[#1C1C1C]/50 hover:text-[#1C1C1C]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "video" && (
            <div className="flex flex-col h-full overflow-y-auto">
              {selectedLesson ? (
                <>
                  <div className="aspect-video w-full bg-black shrink-0">
                    <iframe
                      className="w-full h-full"
                      src={toYouTubeEmbed(
                        selectedLesson.lesson_video_url || "",
                      )}
                      title={selectedLesson.name}
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-[#1C1C1C]">
                      {selectedLesson.name}
                    </h1>
                    <p className="text-[#1C1C1C]/60 mt-2 font-medium">
                      {selectedLesson.description}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setActiveTab("ai")}
                        className="flex items-center gap-2 bg-[#F97316] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#F97316]/90 transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        Ask AI Tutor
                      </button>
                      <button
                        onClick={() => setActiveTab("quiz")}
                        className="flex items-center gap-2 border border-[#F97316] text-[#F97316] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#F97316]/10 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        Take Quiz
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#1C1C1C]/40">
                  Select a lesson to start
                </div>
              )}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="h-full">
              {selectedLesson ? (
                <Chatbot
                  courseId={courseId}
                  lessonId={selectedLesson.id.toString()}
                  orgId={orgId}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#1C1C1C]/40">
                  Select a lesson first
                </div>
              )}
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="h-full overflow-y-auto">
              {selectedLesson ? (
                <QuizPage
                  lessonId={selectedLesson.id.toString()}
                  orgId={orgId}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#1C1C1C]/40">
                  Select a lesson first
                </div>
              )}
            </div>
          )}
          {activeTab === "report" && (
            <div className="h-full overflow-y-auto">
              {selectedLesson ? (
                <CourseReportPage
                  userId={orgId.toString()} // replace with actual user_id from session
                  lessonId={selectedLesson.id.toString()}
                  orgId={orgId}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#1C1C1C]/40">
                  Select a lesson first
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
