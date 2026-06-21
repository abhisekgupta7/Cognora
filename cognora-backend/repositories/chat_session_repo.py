from db.connection import get_conn
from datetime import datetime


class ChatSessionRepository:
    
    def create_session(self, user_id, course_id, org_id, lesson_id, thread_id=None):
        title = f"Session for user {user_id} in course {course_id} and lesson {lesson_id}"

        if thread_id is None:
            thread_id = f"{user_id}-{course_id}-{lesson_id}"

        query = """
            INSERT INTO chat_sessions 
            (user_id, course_id, org_id, lesson_id, thread_id, last_message_at, title)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """

        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (
                    user_id,
                    course_id,
                    org_id,
                    lesson_id,
                    thread_id,
                    datetime.utcnow(),
                    title
                ))
                session_id = cursor.fetchone()

        return session_id