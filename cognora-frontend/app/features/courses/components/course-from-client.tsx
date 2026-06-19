"use client";
import { Plus } from "lucide-react";
import { createCourse } from "../actions/course";

export default function CourseFromClient() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const course = await createCourse({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    });
  };
  return (
   <div className="w-full text-[#1C1C1C]">
      <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
        
        {/* Course Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Course title
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g., Class 10 Physics — Mechanics"
            className="w-full h-12 px-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
          />
        </div>

        {/* Course Description Input — Upgraded to textarea for better content entry */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#1C1C1C]/60 tracking-wide uppercase">
            Course description
          </label>
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Provide a summary of what your students will learn in this course..."
            className="w-full min-h-25 p-4 bg-white border border-[#1C1C1C]/10 rounded-xl font-medium text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          className="w-full h-12 mt-2 bg-[#F97316] hover:bg-[#F97316]/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>Create course</span>
        </button>
        
      </form>
    </div>
  );
}
