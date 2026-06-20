import { SendHorizontal, Sparkles } from "lucide-react";

export default function Chatbot({
  courseId,
  lessonId,
  orgId,
}: {
  courseId: string;
  lessonId: string;
  orgId: number;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    console.log("Question submitted:", question);
    console.log(
      "Calling API with courseId:",
      courseId,
      "lessonId:",
      lessonId,
      "orgId:",
      orgId,
    );

    console.log("API URL:", process.env.NEXT_PUBLIC_FASTAPI_URL);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 9,
        lesson_id: lessonId,
        question,
        course_id: courseId,
        org_id: orgId,
      }),
    });
    console.log("API response status:", response.status);
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] text-[#1C1C1C] rounded-xl overflow-hidden">
      {/* Scrollable Message Area (Empty state / Welcome prompt example) */}
      <div className="grow p-4 flex flex-col justify-end overflow-y-auto min-h-75">
        <div className="flex gap-3 max-w-[85%] mb-2">
          <div className="bg-white border border-[#F97316]/10 rounded-2xl rounded-tl-none p-4 text-sm font-medium shadow-sm leading-relaxed">
            Hi! I'm your AI tutor for this course. You can ask me questions
            about the lessons, videos, or any course-related topic. Just type
            your question in the box below and I'll do my best to help you out.
            {/* Proudly emphasizing multilingual availability */}
          </div>
        </div>
      </div>

      {/* Form & Multilingual Input Field Layout */}
      <div className="p-4 bg-white border-t border-[#1C1C1C]/5">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            name="question"
            required
            // Multi-language placeholder display
            placeholder="Ask your questions... "
            className="w-full h-12 pl-4 pr-14 bg-[#FAFAF8] border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
          />

          {/* Action button matching large rounded corner values */}
          <button
            type="submit"
            className="absolute right-1.5 h-9 w-9 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            aria-label="Send message"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
