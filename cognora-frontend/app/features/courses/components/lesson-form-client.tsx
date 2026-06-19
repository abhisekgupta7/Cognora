"use client"
import { Plus } from "lucide-react";
import { createLesson } from "../actions/lesson";
import { Course } from "../types/course";
import { toast } from "sonner";
export default  function LessonClientForm({ courses }: { courses: Course[] }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const lesson = await createLesson({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      lesson_video_url: formData.get("lesson_video_url") as string,
      course_id: formData.get("course_id") as string,
    });
    if (lesson) {
      toast.success("Lesson created successfully!");
    } else {
      toast.error("Failed to create lesson. Please try again.");
    }
  };
  return (
   <div className="w-full text-[#1C1C1C]">
      <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
        
        {/* Associated Course Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Select course
          </label>
          <div className="relative">
            <select 
              name="course_id" 
              required
              className="w-full h-12 px-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all appearance-none cursor-pointer"
            >
              <option value="" className="text-[#1C1C1C]/40">Select a target course...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {/* Custom down arrow icon since native indicators are hidden for visual layout cleanliness */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1C1C1C]/40">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Lesson Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Lesson title
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g., Introduction to gravitational force"
            className="w-full h-12 px-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
          />
        </div>

        {/* Lesson Video URL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Lecture video link
          </label>
          <input
            type="url"
            name="lesson_video_url"
            required
            placeholder="e.g., https://www.youtube.com/watch?v=..."
            className="w-full h-12 px-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
          />
        </div>

        {/* Lesson Description Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Lesson summary
          </label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Briefly detail the core concepts discussed in this video lecture..."
            className="w-full min-h-25 p-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          className="w-full h-12 mt-2 bg-[#F97316] hover:bg-[#F97316]/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>Create lesson</span>
        </button>
        
      </form>
    </div>
  );
}
