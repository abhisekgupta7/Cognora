import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { getAllCourses } from "../services/course";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Course } from "../types/course";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  let courses: Course[] = [];
  try {
    courses = await getAllCourses();
  } catch (e) {
    console.error("Failed to fetch courses:", e);
  }

  if (courses.length === 0) {
    return <div>No courses available.</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight">
          Manage your <span className="text-[#F97316]">courses</span>
        </h2>
        <p className="text-[#1C1C1C]/80 font-medium mt-2 text-lg">
          Configure AI tutors for your active LMS curriculum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="bg-white rounded-lg border border-[#F97316]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <CardContent className="p-8 flex flex-col grow">
              <div className="w-12 h-12 bg-[#FAFAF8] rounded-xl flex items-center justify-center mb-6 border border-[#1C1C1C]/5">
                <BookOpen
                  className="w-6 h-6 text-[#F97316]"
                  strokeWidth={2.5}
                />
              </div>
              <CardTitle className="text-xl font-bold text-[#1C1C1C] mb-3 leading-tight">
                {course.name}
              </CardTitle>
              <CardDescription className="text-[#1C1C1C]/70 font-medium line-clamp-3 mb-8 grow leading-relaxed">
                {course.description}
              </CardDescription>
              <CardAction className="mt-auto">
                <Link
                  href={`/courses/${course.id}`}
                  className="w-full h-12 flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#F97316] text-[#1C1C1C] hover:text-white border border-[#1C1C1C]/5 hover:border-transparent font-medium rounded-xl transition-all"
                >
                  Manage course
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
