"use client"
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
    <div className="p-4 border rounded-lg bg-green/5 border-white/10">
      <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
        <input className="p-2 border rounded-lg bg-white/10 border-white/20 text-black" type="text" name="name" placeholder="Lesson Name" />
        <input
          className="p-2 border rounded-lg bg-white/10 border-white/20 text-black"
          type="text"
          name="description"
          placeholder="Lesson Description"
        />
        <input
          className="p-2 border rounded-lg bg-white/10 border-white/20 text-black"
          type="url"
          name="lesson_video_url"
          placeholder="Lesson Video URL"
        />
        <select className="p-2 border rounded-lg bg-white/10 border-white/20 text-black" name="course_id">
          <option value="">Select a Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700" type="submit">
          Create Lesson
        </button>
      </form>
    </div>
  );
}
