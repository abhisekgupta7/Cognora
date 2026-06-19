"use server"
export interface Course {
  id: string;
  name: string;
  description?: string;
  org_id: number;
}
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { lessons } from "@/lib/db/schema";
import { Lesson } from "../types/lesson";

export async function createLessonrepo(lessonData: {
  name: string;
  description?: string;
  lesson_video_url?: string;
  course_id: string;
    org_id: number;
}): Promise<Lesson> {

  // Mock implementation - replace with actual database call
  const lesson = await db
    .insert(lessons)
    .values({
      name: lessonData.name,
      description: lessonData.description,
      lesson_video_url: lessonData.lesson_video_url,
      course_id: lessonData.course_id,
      org_id: lessonData.org_id,
    })
        .returning();
    
  return lesson[0] as Lesson;
}

export async function getAllLessons(course_id:string): Promise<Lesson[]> { 
  const allLessons = await db.select().from(lessons).where(eq(lessons.course_id, course_id));
  return allLessons as Lesson[];
}
