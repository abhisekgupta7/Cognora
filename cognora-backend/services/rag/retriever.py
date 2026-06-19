from db.connection import get_conn
class Retriever:
    def __init__(self):
        self.conn = get_conn()
        self.cursor = self.conn.cursor()

    def search(self, query_vector: list[float], lesson_id: str, course_id: str, org_id: str, top_k: int = 5):
        query = """
            SELECT chunk_text, embedding
            FROM chunks
            WHERE lesson_id = %s AND course_id = %s AND org_id = %s
            ORDER BY embedding <-> %s ::vector
            LIMIT %s
        """

        self.cursor.execute(query, (lesson_id, course_id, org_id, query_vector, top_k))
        results = self.cursor.fetchall()
        return results  
