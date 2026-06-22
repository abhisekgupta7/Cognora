import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

class EmailService:
    def send_report_email(self, to_email: str, student_name: str, lesson_name: str, pdf_bytes: bytes):
        resend.Emails.send({
            "from": "reports@abhisekgupta7.com.np",
            "to": to_email,
            "subject": f"Your Learning Report - {lesson_name}",
            "html": f"""
                <h2>Hi {student_name},</h2>
                <p>Your personalized learning report for <strong>{lesson_name}</strong> is attached.</p>
                <p>Review your strengths and areas for improvement to accelerate your learning.</p>
                <br>
                <p>— Cognora Team</p>
            """,
            "attachments": [
                {
                    "filename": f"report_{lesson_name}.pdf",
                    "content": list(pdf_bytes),
                }
            ]
        })