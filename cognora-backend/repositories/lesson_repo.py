from db.connection import get_conn
class LessonRepository:

    def __init__(self):
        self.conn = get_conn()
        self.cursor = self.conn.cursor()

    def get_course_lessons(
        self,
        course_id,
        org_id: int
    ):

        query = """
        SELECT
            id,
            org_id,
            course_id,
            lesson_video_url
        FROM lessons
        WHERE course_id=%s AND org_id=%s
        """

        self.cursor.execute(
            query,
            (course_id, org_id)
        )

        return self.cursor.fetchall()