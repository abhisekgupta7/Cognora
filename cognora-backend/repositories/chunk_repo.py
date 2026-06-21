from db.connection import get_conn

class ChunkRepository:

    def insert_many(self, lesson_id, transcript_id, course_id, chunks, embedding, org_id, token_count):
        query = """
            INSERT INTO chunks
            (lesson_id, course_id, chunk_text, embedding, chunk_index, org_id, token_count)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        data = [
            (
                lesson_id,
                course_id,
                chunk,
                emb,
                i,
                org_id,
                token_count
            )
            for i, (chunk, emb) in enumerate(zip(chunks, embedding))
        ]

        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.executemany(query, data)