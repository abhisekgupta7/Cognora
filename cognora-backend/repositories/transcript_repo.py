from db.connection import get_conn

class TranscriptRepository:

    def transcript_exists(self, lesson_id: int, org_id: int) -> bool:
        query = """
            SELECT 1 FROM transcripts
            WHERE lesson_id = %s AND org_id = %s AND translated_transcript IS NOT NULL
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                return cursor.fetchone() is not None

    def get_transcript(self, lesson_id: int, org_id: int):
        query = """
            SELECT id, original_transcript, translated_transcript, language
            FROM transcripts
            WHERE lesson_id = %s AND org_id = %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                row = cursor.fetchone()
                if not row:
                    return None
                return {
                    "id": row["id"],
                    "transcript": row["translated_transcript"],
                    "language": row["language"],
                }

    def save_original_transcript(self, lesson_id: str, org_id: int, original_transcript: str, language: str):
        query = """
            INSERT INTO transcripts (lesson_id, org_id, original_transcript, language)
            VALUES (%s, %s, %s, %s)
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id, original_transcript, language))

    def save_translated_transcript(self, lesson_id: str, org_id: int, translated_transcript: str):
        query = """
            UPDATE transcripts
            SET translated_transcript = %s
            WHERE lesson_id = %s AND org_id = %s
            RETURNING id
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (translated_transcript, lesson_id, org_id))
                row = cursor.fetchone()
                if row is None:
                    raise Exception(f"No transcript found for lesson_id={lesson_id}, org_id={org_id}")
                return row["id"]

    def get_video_url(self, lesson_id: int, org_id: int) -> str:
        query = """
            SELECT video_url FROM lessons
            WHERE lesson_id = %s AND org_id = %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                row = cursor.fetchone()
                return row["video_url"] if row else None