
import { FileText, FolderPlus, LayoutDashboard, Video } from "lucide-react";
import CourseForm from "../features/courses/components/course-form";
import LessonForm from "../features/courses/components/lesson-form";
import OrgDetails from "./components/org-details";
import Transcript from "./components/transcript";

export default function Dashboard() {
  return (
   <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] px-6 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Dashboard Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1C1C1C]/5 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#F97316] font-semibold text-sm mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>LMS Admin Dashboard</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Manage your platform's <span className="text-[#F97316]">AI capabilities</span>
            </h1>
            <p className="text-[#1C1C1C]/70 font-medium mt-1">
              Configure multilingual tutors, track usage, and manage curriculum integrations.
            </p>
          </div>
          
          {/* Quick Stats or Org Info Summary box */}
          <div className="bg-white rounded-2xl border border-[#F97316]/10 p-4 shadow-sm min-w-60">
            <OrgDetails />
          </div>
        </div>

        {/* Creator Ecosystem Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Step 1: Course Orchestrator */}
          <div className="bg-white rounded-2xl border border-[#F97316]/10 p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#1C1C1C]/5 flex items-center justify-center text-[#F97316]">
                  <FolderPlus className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Build your course library</h2>
                  <p className="text-sm text-[#1C1C1C]/60 font-medium">Create and manage courses for your platform.</p>
                </div>
              </div>
              
              <div className="mt-6 bg-[#FAFAF8] p-6 rounded-xl border border-[#1C1C1C]/5">
                {/* Internal form inputs should use rounded-xl/2xl structures */}
                <CourseForm />
              </div>
            </div>
          </div>

          {/* Step 2: Lesson Studio */}
          <div className="bg-white rounded-2xl border border-[#F97316]/10 p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#1C1C1C]/5 flex items-center justify-center text-[#F97316]">
                  <Video className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Populate lesson tracks</h2>
                  <p className="text-sm text-[#1C1C1C]/60 font-medium">Attach video assets and lectures directly to your courses.</p>
                </div>
              </div>
              
              <div className="mt-6 bg-[#FAFAF8] p-6 rounded-xl border border-[#1C1C1C]/5">
                <LessonForm />
              </div>
            </div>
          </div>

        </div>

        {/* Step 3: Global Knowledge & Processing Layer */}
        <div className="bg-white rounded-2xl border border-[#F97316]/10 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1C1C1C]/5 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#1C1C1C]/5 flex items-center justify-center text-[#F97316]">
                <FileText className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI localization engines</h2>
                <p className="text-sm text-[#1C1C1C]/60 font-medium">
                  Generate and verify deep localized transcripts to train Hindi, Nepali, and English conversational nuances.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAF8] p-6 rounded-xl border border-[#1C1C1C]/5">
            <Transcript />
          </div>
        </div>

      </div>
    </div>
  );
}
