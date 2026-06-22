from db.connection import get_conn

class LessonRepository:
    def get_lesson_by_id(self, lesson_id: str, org_id: int):
        query = """
            SELECT id, course_id, name, lesson_video_url
            FROM lessons
            WHERE id=%s AND org_id=%s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                return cursor.fetchone()

    def get_course_lessons(self, course_id, org_id: int):
        query = """
            SELECT id, course_id, name, lesson_video_url
            FROM lessons
            WHERE course_id=%s AND org_id=%s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (course_id, org_id))
                return cursor.fetchall()

    def get_lesson_content(self, lesson_id: str, org_id: int):
        query = """
            SELECT t.translated_transcript as lesson_content
            FROM transcripts t
            WHERE t.lesson_id = %s AND t.org_id = %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                row = cursor.fetchone()
                return row if row else None