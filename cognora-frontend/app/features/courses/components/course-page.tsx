import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { getAllCourses } from "../services/course";
import Link from "next/link";

export default async function CoursePage() {
  const courses = await getAllCourses();
  if (courses.length === 0) { 
    return <div>No courses available.</div>;
  }
  return (
    <div>
      <div>
        {courses.map((course) => (
          <Card key={course.id} className="w-96">
            <CardContent>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
              <CardAction>
                <Link href={`/courses/${course.id}`} className="btn">
                  View Course
                </Link>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
