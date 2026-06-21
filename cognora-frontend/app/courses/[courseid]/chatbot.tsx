import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot({
  courseId,
  lessonId,
  orgId,
}: {
  courseId: string;
  lessonId: string;
  orgId: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const question = formData.get("question") as string;
    form.reset(); // clear input immediately

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    // Add empty assistant message (will be filled by stream)
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setLoading(true);

    const res = await fetch("/api/chat", {
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

    if (!res.ok) {
      toast.error("Failed to get response from AI tutor. Please try again.", {
        position: "top-center",
      });
      setMessages((prev) => prev.slice(0, -1)); // remove empty assistant message
      setLoading(false);
      return;
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const token = decoder.decode(value, { stream: true });
      // Append each token to the last (assistant) message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: updated[updated.length - 1].content + token,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] text-[#1C1C1C] rounded-xl overflow-hidden">
      {/* Message Area */}
      <div className="grow p-4 flex flex-col overflow-y-auto min-h-75 gap-3">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="bg-white border border-[#F97316]/10 rounded-2xl rounded-tl-none p-4 text-sm font-medium shadow-sm leading-relaxed">
              Hi! I'm your AI tutor for this course. Ask me anything about the
              lessons, videos, or course topics.
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#F97316] text-white rounded-tr-none"
                  : "bg-white border border-[#F97316]/10 shadow-sm rounded-tl-none"
              }`}
            >
              {msg.content}
              {/* Blinking cursor while streaming this message */}
              {loading && i === messages.length - 1 && msg.role === "assistant" && (
                <span className="inline-block w-0.5 h-3.5 bg-current ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-[#1C1C1C]/5">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            name="question"
            required
            disabled={loading}
            placeholder="Ask your questions..."
            className="w-full h-12 pl-4 pr-14 bg-[#FAFAF8] border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 h-9 w-9 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            aria-label="Send message"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}