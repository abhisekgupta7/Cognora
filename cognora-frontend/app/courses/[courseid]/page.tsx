import { getAllLessons } from "@/app/features/courses/services/lesson";
import { Lesson } from "@/app/features/courses/types/lesson";

import { getActiveOrgId, getActiveUserId } from "@/app/features/auth/services/org-context.service";
import CourseIdClient from "./course-id-client";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseid: string }>;
}) {
  const { courseid } = await params;
  const orgId = await getActiveOrgId();
  const userId = await getActiveUserId(); // add this


  if (!orgId) {
    throw new Error("Organization context is required to view course details");
  }
  if (!userId) {
    throw new Error("User context is required to view course details");
  }
  console.log(
    "CourseDetailPage rendered with courseid:",
    courseid,
    "and orgId:",
    orgId,
  );

  const allLessons: Lesson[] = await getAllLessons(courseid);

  return (
    <CourseIdClient courseId={courseid} orgId={orgId} lessons={allLessons} userId={userId} />
  );
}
