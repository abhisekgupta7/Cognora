from db.connection import get_conn
import json

class StudentReportRepository:

    def get_user_questions(self, user_id: str, lesson_id: str, org_id: int):
        query = """
            SELECT content FROM chat_messages cm
            JOIN chat_sessions cs ON cm.session_id = cs.id
            WHERE cs.user_id = %s AND cs.lesson_id = %s AND cs.org_id = %s
            AND cm.role = 'user'
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_id, lesson_id, org_id))
                rows = cursor.fetchall()
                if not rows:
                    return None
                questions = [row["content"] for row in rows]
                return {"questions": questions}

    def save_student_report(self, user_id: str, lesson_id: str, org_id: int, report_data: dict):
        query = """
            INSERT INTO student_reports (user_id, lesson_id, org_id, report_data)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (user_id, lesson_id, org_id) DO UPDATE SET report_data = %s
        """
        with get_conn() as conn:
            with conn.cursor() as cursor:
                data = json.dumps(report_data)
                cursor.execute(query, (user_id, lesson_id, org_id, data, data))