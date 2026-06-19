import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import TranscriptClient from "./transcript-client";
import { getAllCourses } from "@/app/features/courses/services/course";
import { Course } from "@/app/features/courses/types/course";

export default async function Transcript() {
    const org_id = await getActiveOrgId();
    if (!org_id) {
        return <div>Please select an organization to view the transcript.</div>;
    }
    const courses: Course[] = await getAllCourses();

  
    return (
        <div>
            <TranscriptClient courses={courses} orgId={org_id} />
        </div>
    )
}