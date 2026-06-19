"use client";
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
    <div className="p-4 border rounded-lg bg-green/5 border-white/10">
      <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
        <input className="p-2 border rounded-lg bg-white/10 border-white/20 text-black" type="text" name="name" placeholder="Course Name" />
        <input
          className="p-2 border rounded-lg bg-white/10 border-white/20 text-black"
          type="text"
          name="description"
          placeholder="Course Description"
        />
        <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700" type="submit">Create Course</button>
      </form>
    </div>
  );
}
