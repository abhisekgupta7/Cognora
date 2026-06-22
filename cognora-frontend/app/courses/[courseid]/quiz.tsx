"use client";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, CheckCircle, XCircle, RotateCcw } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizPage({
  lessonId,
  orgId,
}: {
  lessonId: string;
  orgId: number;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateQuiz = async () => {
    setLoading(true);
    setQuestions([]);
    setSelected({});
    setSubmitted(false);

    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lesson_id: lessonId, org_id: orgId }),
    });

    if (!res.ok) {
      toast.error("Failed to generate quiz. Please try again.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await res.json();
      // handle both {quiz: [...]} and [...] shapes
      console.log("Quiz API response:", data);
      const parsed = Array.isArray(data) ? data : (data.quiz ?? []);
      if (parsed.length === 0) {
        toast.error("No quiz questions returned.");
        setLoading(false);
        return;
      }
      setQuestions(parsed);
    } catch {
      toast.error("Failed to parse quiz. Please try again.");
    }

    setLoading(false);
  };

  const score = questions.filter((q, i) => selected[i] === q.answer).length;

  // Empty state
  if (!loading && questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
        <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-[#F97316]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1C1C1C]">
            Test your knowledge
          </h2>
          <p className="text-sm text-[#1C1C1C]/50 mt-1">
            Generate a quiz based on this lesson's content
          </p>
        </div>
        <button
          onClick={generateQuiz}
          className="bg-[#F97316] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F97316]/90 transition-colors"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-8 h-8 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#1C1C1C]/50">Generating quiz...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[#1C1C1C]">Lesson Quiz</h2>
        <button
          onClick={generateQuiz}
          className="flex items-center gap-1.5 text-sm text-[#1C1C1C]/50 hover:text-[#F97316] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Regenerate
        </button>
      </div>

      {/* Score banner */}
      {submitted && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
            score === questions.length
              ? "bg-green-50 text-green-700"
              : score >= questions.length / 2
                ? "bg-orange-50 text-orange-700"
                : "bg-red-50 text-red-700"
          }`}
        >
          {score === questions.length ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          You scored {score} out of {questions.length}
        </div>
      )}

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-white border border-[#1C1C1C]/5 rounded-2xl p-5"
          >
            <p className="text-sm font-semibold text-[#1C1C1C] mb-4">
              <span className="text-[#F97316] mr-2">{i + 1}.</span>
              {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = selected[i] === opt;
                const isCorrect = opt === q.answer;
                let style = "border border-[#1C1C1C]/10 text-[#1C1C1C]";
                if (submitted) {
                  if (isCorrect)
                    style =
                      "border border-green-400 bg-green-50 text-green-700";
                  else if (isSelected)
                    style = "border border-red-400 bg-red-50 text-red-700";
                } else if (isSelected) {
                  style =
                    "border border-[#F97316] bg-[#F97316]/5 text-[#F97316]";
                }
                return (
                  <button
                    key={opt}
                    disabled={submitted}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [i]: opt }))
                    }
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${style} disabled:cursor-default`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(selected).length !== questions.length}
          className="mt-6 w-full bg-[#F97316] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#F97316]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}
