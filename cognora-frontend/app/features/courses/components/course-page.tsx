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

export default async function CoursePage() {
  const courses = await getAllCourses();
  if (courses.length === 0) { 
    return <div>No courses available.</div>;
  }
  return (
  <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Human, direct section header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight">
          Manage your <span className="text-[#F97316]">courses</span>
        </h2>
        <p className="text-[#1C1C1C]/80 font-medium mt-2 text-lg">
          Configure AI tutors for your active LMS curriculum.
        </p>
      </div>

      {/* Responsive grid layout replacing the fixed w-96 wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="bg-white rounded-2xl border border-[#F97316]/15 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            {/* Added flex-grow to ensure buttons always align at the bottom */}
            <CardContent className="p-8 flex flex-col grow">
              
              {/* Friendly icon wrapper to break up the text */}
              <div className="w-12 h-12 bg-[#FAFAF8] rounded-xl flex items-center justify-center mb-6 border border-[#1C1C1C]/5">
                <BookOpen className="w-6 h-6 text-[#F97316]" strokeWidth={2.5} />
              </div>
              
              <CardTitle className="text-xl font-bold text-[#1C1C1C] mb-3 leading-tight">
                {course.name}
              </CardTitle>
              
              {/* Used line-clamp to keep card heights uniform if descriptions get long */}
              <CardDescription className="text-[#1C1C1C]/70 font-medium line-clamp-3 mb-8 grow leading-relaxed">
                {course.description}
              </CardDescription>
              
              {/* Single, clear CTA per card */}
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
