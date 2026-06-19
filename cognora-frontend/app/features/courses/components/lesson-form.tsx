import { createLesson } from "../actions/lesson";
import { getAllCourses } from "../services/course";
import { Course } from "../types/course";
import LessonClientForm from "./lesson-form-client";

export default async function LessonForm() {
  const courses: Course[] = await getAllCourses(); // Fetch courses to populate the dropdown


  return <LessonClientForm  courses={courses} />;
}
