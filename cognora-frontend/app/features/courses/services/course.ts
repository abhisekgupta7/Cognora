export interface Course {
  id: string;
  name: string;
  description?: string;
  org_id: number;
}
import db from "@/lib/db";
import { courses } from "@/lib/db/schema";
export async function createCourserepo(courseData: {
  name: string;
  description?: string;
  org_id: number;
}): Promise<Course> {
  // Mock implementation - replace with actual database call
  const course = await db
    .insert(courses)
    .values({
      name: courseData.name,
      description: courseData.description,
      org_id: courseData.org_id,
    })
    .returning();
  return course[0] as Course;
}

export async function getAllCourses(): Promise<Course[]> { 
  const allCourses = await db.select().from(courses);
  return allCourses as Course[];
}
