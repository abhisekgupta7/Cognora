export interface Lesson {
    id: string;
    course_id: string;
    name: string;
    description?: string;
    lesson_video_url?: string;
    org_id: number;
}