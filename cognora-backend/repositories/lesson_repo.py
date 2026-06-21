from db.connection import get_conn

class LessonRepository:

    def get_course_lessons(self, course_id, org_id: int):
        query = """
            SELECT id, org_id, course_id, lesson_video_url
            FROM lessons
            WHERE course_id=%s AND org_id=%s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (course_id, org_id))
                return cursor.fetchall()