"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";

type Report = {
  summary: string;
  mastered_concepts: string[];
  knowledge_gaps: string[];
  bottleneck: string;
  recommendations: string[];
};

export default function CourseReportPage({
  userId,
  lessonId,
  orgId,
}: {
  userId: string;
  lessonId: string;
  orgId: number;
}) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    const res = await fetch("/api/student-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, lesson_id: lessonId, org_id: orgId }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Report generated! Check your email for the PDF.", { position: "top-center" });
      setReport(data);
    } else {
      toast.error("Failed to generate report. Ask the AI tutor some questions first.");
    }
    setLoading(false);
  };

  if (!report && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center">
          <FileText className="w-7 h-7 text-[#F97316]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1C1C1C]">Learning Report</h2>
          <p className="text-sm text-[#1C1C1C]/50 mt-1">
            Ask the AI Tutor some questions first, then generate your personalized report.
          </p>
        </div>
        <button
          onClick={generateReport}
          className="bg-[#F97316] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F97316]/90 transition-colors"
        >
          Generate My Report
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Loader2 className="w-8 h-8 text-[#F97316] animate-spin" />
        <p className="text-sm text-[#1C1C1C]/50">Analyzing your learning...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-[#1C1C1C]">Your Learning Report</h2>
        <button onClick={generateReport} className="text-sm text-[#1C1C1C]/50 hover:text-[#F97316]">
          Regenerate
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-[#1C1C1C]/5 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-[#1C1C1C] mb-2">Summary</h3>
          <p className="text-sm text-[#1C1C1C]/70">{report!.summary}</p>
        </div>

        <div className="bg-white border border-[#1C1C1C]/5 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-green-600 mb-2">✓ Mastered Concepts</h3>
          <ul className="space-y-1">
            {report!.mastered_concepts.map((c, i) => (
              <li key={i} className="text-sm text-[#1C1C1C]/70">• {c}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#1C1C1C]/5 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-red-500 mb-2">⚠ Knowledge Gaps</h3>
          <ul className="space-y-1">
            {report!.knowledge_gaps.map((g, i) => (
              <li key={i} className="text-sm text-[#1C1C1C]/70">• {g}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FFF3E0] border border-[#F97316]/20 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-[#F97316] mb-2">🎯 Your Bottleneck</h3>
          <p className="text-sm text-[#1C1C1C]/70">{report!.bottleneck}</p>
        </div>

        <div className="bg-white border border-[#1C1C1C]/5 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-[#1C1C1C] mb-2">📚 Recommendations</h3>
          <ul className="space-y-1">
            {report!.recommendations.map((r, i) => (
              <li key={i} className="text-sm text-[#1C1C1C]/70">• {r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}