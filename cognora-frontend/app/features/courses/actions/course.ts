"use server"
import { toast } from "sonner";
import { getActiveOrgId } from "../../auth/services/org-context.service";
import { createCourserepo } from "../services/course";
import { Course } from "../types/course";
export async function getCoursesForOrganization(
  orgId: number,
): Promise<Course[]> {
  // Mock implementation - replace with actual API call
  return [];
}
export async function createCourse(courseData: {
  name: string;
  description?: string;
}): Promise<Course> {
  const orgId = await getActiveOrgId();
  if (!orgId) {
    throw new Error("No active organization context found");
  }
  let course: Course;
  try {
    course = await createCourserepo({ ...courseData, org_id: orgId });
    toast.success("Course created successfully!");
  } catch (error) {
    throw new Error("Failed to create course: " + (error as Error).message);
    toast.error("Failed to create course. Please try again.");
  }
  return course;
}
