
import CourseForm from "../features/courses/components/course-form";
import LessonForm from "../features/courses/components/lesson-form";
import OrgDetails from "./components/org-details";
import Transcript from "./components/transcript";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      This is the dashboard page.
      <div>
        <OrgDetails />
      </div>
      <div>
        <p>Create courses for your organization.</p>
        <CourseForm />
      </div>
      <div>
        <p>Create lessons for your courses.</p>
        <LessonForm />
      </div>
      <div>
        <p>Generate transcripts for your courses.</p>
        <Transcript />
      </div>
    </div>
  );
}
