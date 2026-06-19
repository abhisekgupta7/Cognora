import { getAllLessons } from "@/app/features/courses/services/lesson";
import { Lesson } from "@/app/features/courses/types/lesson";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import CourseIdClient from "./course-id-client";


export default async function CourseDetailPage({
  params,
}: {
  params: { courseid: string };
}) {

  const { courseid } = await params;
  const allLessons: Lesson[] = await getAllLessons(courseid);
  const orgId = await getActiveOrgId();
  
  if (!orgId) {
    throw new Error("Organization context is required to view course details");
  }

  return (
    <CourseIdClient  courseId={courseid} orgId={orgId} lessons={allLessons} />
  );
}
