from db.connection import get_conn
class ChunkRepository:

    def __init__(self):

        self.conn = get_conn()
        self.cursor = self.conn.cursor()

    def insert_many(self, lesson_id, transcript_id, course_id, chunks, embedding,org_id,token_count):

        query = """
            INSERT INTO chunks
            (lesson_id, course_id, chunk_text, embedding, chunk_index, org_id, token_count)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        data = [
            (
                lesson_id,
                course_id,
                chunks,
                embedding,
                i,
                org_id,
                token_count
            )
            for i, (chunk, embedding) in enumerate(zip(chunks, embedding))
        ]

        self.cursor.executemany(query, data)
        self.conn.commit()