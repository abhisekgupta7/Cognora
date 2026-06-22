from db.connection import get_conn
import json
class QuizRepository:
    def save_quiz(self, lesson_id: str, org_id: int, quiz_data: dict):
        query = """
            UPDATE lessons
            SET quiz = %s
            WHERE id = %s AND org_id = %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (json.dumps(quiz_data), lesson_id, org_id))
    def get_quiz(self, lesson_id: str, org_id: int):
        query = """
            SELECT quiz FROM lessons
            WHERE id = %s AND org_id = %s
        """

        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (lesson_id, org_id))
                row = cursor.fetchone()
                if not row or not row["quiz"]:
                    return None
                return json.loads(row["quiz"])
