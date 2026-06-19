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
    console.log("Calling API with courseId:", courseId, "lessonId:", lessonId, "orgId:", orgId);

    console.log("API URL:", process.env.NEXT_PUBLIC_FASTAPI_URL);

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 7, // Replace with actual user ID
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
      
      {/* Mini Chat Header — Focused on the student experience */}
      <div className="p-4 bg-white border-b border-[#1C1C1C]/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#1C1C1C]">Cognora tutor</h3>
            <p className="text-[11px] text-[#1C1C1C]/60 font-medium">Ready to explain this lesson</p>
          </div>
        </div>

        {/* Clean, non-intrusive context indicator replacing raw text logs */}
        <div className="text-[10px] font-mono bg-[#1C1C1C]/5 text-[#1C1C1C]/60 px-2 py-1 rounded-md">
          ctx: c-{courseId} • l-{lessonId}
        </div>
      </div>

      {/* Scrollable Message Area (Empty state / Welcome prompt example) */}
      <div className="grow p-4 flex flex-col justify-end overflow-y-auto min-h-75">
        <div className="flex gap-3 max-w-[85%] mb-2">
          <div className="bg-white border border-[#F97316]/10 rounded-2xl rounded-tl-none p-4 text-sm font-medium shadow-sm leading-relaxed">
            Hi! I am your personal learning assistant for this lecture. You can ask me to break things down, quiz you, or explain complex parts.
            
            {/* Proudly emphasizing multilingual availability */}
            <div className="mt-3 pt-3 border-t border-[#1C1C1C]/5 text-xs text-[#1C1C1C]/60 font-normal">
              Feel free to ask in <span className="font-semibold text-[#1C1C1C]">English</span>, <span className="font-semibold text-[#1C1C1C]">हिंदी</span>, or <span className="font-semibold text-[#1C1C1C]">नेपाली</span>.
            </div>
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
            placeholder="Ask a question... (English, हिंदी, नेपाली)"
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
