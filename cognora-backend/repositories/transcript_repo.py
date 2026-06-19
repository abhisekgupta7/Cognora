from db.connection import get_conn
conn = get_conn()
cursor = conn.cursor()
class TranscriptRepository:
    def __init__(self):
        self.cursor = conn.cursor()

    def transcript_exists(self,lesson_id: int, org_id: int) -> bool:
        query="""
                SELECT 1
                FROM transcripts
                WHERE lesson_id = %s AND org_id = %s AND translated_transcript IS NOT NULL
                """
        result=self.cursor.execute(
            query,
            (lesson_id, org_id)
        )

        return self.cursor.fetchone() is not None

    def get_transcript(self,lesson_id: int, org_id: int):
        query="""
            SELECT id,original_transcript, translated_transcript, language
                FROM transcripts
                WHERE lesson_id = %s AND org_id = %s
                """
        transcript=self.cursor.execute(
            query,
            (lesson_id, org_id)
        )
        row = transcript.fetchone()
        if not row:
            return None
        return {
            "id": row["id"],
            "transcript":row["translated_transcript"],
            "language": row["language"],
        }

    def save_original_transcript(self,lesson_id: str,org_id: int, original_transcript: str,language: str):
        query="""
                INSERT INTO transcripts (lesson_id, org_id, original_transcript, language)
                VALUES (%s, %s, %s, %s)
                """
        transcript=self.cursor.execute(
            query,
                (lesson_id, org_id, original_transcript, language)
            )
        conn.commit()
        return transcript

    def save_translated_transcript(self,lesson_id: str, org_id: int, translated_transcript: str):
        query= """
                UPDATE transcripts
                SET translated_transcript = %s
                WHERE lesson_id = %s AND org_id = %s
                """
        self.cursor.execute(
            query,
                (translated_transcript, lesson_id, org_id)
            )
        conn.commit()
        self.cursor.execute(
            """
                SELECT id
                FROM transcripts
                WHERE lesson_id = %s AND org_id = %s
            """,
            (lesson_id, org_id)
        )
        return self.cursor.fetchone()[0]

    def get_video_url(self, lesson_id: int,org_id: int) -> str:
        video_url=self.cursor.execute(
            """
                SELECT video_url
                FROM lessons
                WHERE lesson_id = %s AND org_id = %s
                """,
                (lesson_id, org_id)
            )
        row = video_url.fetchone()
        return row[0] if row else None
