from db.connection import get_conn

class Retriever:

    def search(self, query_vector: list[float], lesson_id: str, course_id: str, org_id: str, top_k: int = 5):
        query = """
            SELECT chunk_text, embedding
            FROM chunks
            WHERE lesson_id = %s AND course_id = %s AND org_id = %s
            ORDER BY embedding <-> %s::vector
            LIMIT %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, course_id, org_id, query_vector, top_k))
                return cursor.fetchall()