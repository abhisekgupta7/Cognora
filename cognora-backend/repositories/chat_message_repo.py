from db.connection import get_conn
from psycopg.types.json import Json

class ChatMessageRepository:

    def get_messages(self, chat_id):
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM chat_messages WHERE session_id = %s", (chat_id,))
                return cursor.fetchall()

    def create_message(self, session_id, org_id, role, content, sources=None, metadata=None):
        query = """
            INSERT INTO chat_messages (session_id, org_id, role, content, sources, metadata) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (
                    session_id, org_id, role, content,
                    Json(sources) if sources else None,
                    Json(metadata) if metadata else None
                ))

    def delete_message(self, message_id):
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM chat_messages WHERE id = %s", (message_id,))

    def update_message(self, message_id, content):
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute("UPDATE chat_messages SET content = %s WHERE id = %s", (content, message_id))