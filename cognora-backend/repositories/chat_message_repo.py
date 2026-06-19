from db.connection import get_conn
from psycopg.types.json import Json
class ChatMessageRepository:
    def __init__(self):
        self.conn = get_conn()
        self.cursor = self.conn.cursor()

    def get_messages(self, chat_id):
        self.cursor.execute("SELECT * FROM messages WHERE chat_id = ?", (chat_id,))
        return self.cursor.fetchall()

    def create_message(self, session_id, org_id, role, content, sources=None, metadata=None):
        query = """
            INSERT INTO chat_messages (session_id, org_id, role, content, sources, metadata) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        self.cursor.execute(
            query,
            (session_id, org_id, role, content, Json(sources) if sources else None, Json(metadata) if metadata else None)
        )
        self.conn.commit()

    def delete_message(self, message_id):
        self.cursor.execute("DELETE FROM chat_messages WHERE id = %s", (message_id,))
        self.conn.commit()

    def update_message(self, message_id, content):
        self.cursor.execute("UPDATE chat_messages SET content = %s WHERE id = %s", (content, message_id))
        self.conn.commit()