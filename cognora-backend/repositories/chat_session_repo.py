from db.connection import get_conn
from datetime import datetime


class ChatSessionRepository:
    
    def __init__(self):
        self.conn = get_conn()
        self.cursor = self.conn.cursor()


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

        self.cursor.execute(
            query,
            (
                user_id,
                course_id,
                org_id,
                lesson_id,
                thread_id,
                datetime.utcnow(),
                title
            )
        )

        session_id = self.cursor.fetchone()
        self.conn.commit()

        return session_id

    def get_session(self, session_id):
        # Logic to retrieve a chat session from the database
        pass
    def list_sessions(self, user_id):
        # Logic to list all chat sessions for a user from the database
        pass    

    def delete_chat_session(self, session_id):
        # Logic to delete a chat session from the database
        pass                    