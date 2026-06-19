"use server"
import { getActiveOrgId } from "../../auth/services/org-context.service";
import { createCourserepo } from "../services/course";
import { createLessonrepo } from "../services/lesson";
import { Course } from "../types/course";
import { Lesson } from "../types/lesson";

export async function getLessonsForOrganization(
  orgId: number,
): Promise<Lesson[]> {
  // Mock implementation - replace with actual API call
  return [];
}

export async function createLesson(lessonData: {
  name: string;
  description?: string;
  lesson_video_url?: string;
  course_id: string;
}): Promise<Lesson> {
  const orgId = await getActiveOrgId();
  if (!orgId) {
    throw new Error("No active organization context found");
  }
  let lesson: Lesson;
  try {
    lesson = await createLessonrepo({ ...lessonData, org_id: orgId });
  } catch (error) {
    throw new Error("Failed to create lesson: " + (error as Error).message);
  }
  return lesson;
}
