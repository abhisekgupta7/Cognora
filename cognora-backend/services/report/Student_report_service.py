from repositories.student_report_repo import StudentReportRepository
from repositories.lesson_repo import LessonRepository
from services.rag.prompt_builder import PromptBuilder
from core.llm import get_llm
import json

from services.report.pdf_service import PDFService
from services.report.email_service import EmailService
from repositories.user_repo import UserRepository
from repositories.lesson_repo import LessonRepository

class StudentReportService:
    def generate_report(self, user_id: str, lesson_id: str, org_id: int):
        print(f"Generating report for user_id: {user_id}, lesson_id: {lesson_id} and org_id: {org_id}")

        student_questions = StudentReportRepository().get_user_questions(user_id, lesson_id, org_id)

        lesson_content = LessonRepository().get_lesson_content(lesson_id, org_id)

        if not student_questions:
            print(f"No student questions found for lesson_id: {lesson_id} and org_id: {org_id}")
            raise ValueError("No questions found. Ask the AI tutor some questions first.")

        prompt = PromptBuilder().build_student_report_prompt(
            lesson_content["lesson_content"], 
            student_questions["questions"]  # list of strings
        )  
        llm = get_llm()

        report_response = llm.invoke(prompt).content

        # Clean and parse JSON
        clean = report_response.strip().replace("```json", "").replace("```", "").strip()
        
        try:
            parsed = json.loads(clean)
        except json.JSONDecodeError as e:
            print(f"Failed to parse student report JSON: {e}")
            print(f"Raw response: {report_response[:500]}")
            raise ValueError("LLM returned invalid JSON for student report")

        StudentReportRepository().save_student_report(user_id, lesson_id, org_id, {"student_report": parsed})

        # after saving report:
        user = UserRepository().get_user_by_id(user_id)
        lesson = LessonRepository().get_lesson_by_id(lesson_id, org_id)

        pdf_bytes = PDFService().generate_report_pdf(
            parsed, 
            student_name=user["name"],
            lesson_name=lesson["name"]
        )

        EmailService().send_report_email(
            to_email=user["email"],
            student_name=user["name"],
            lesson_name=lesson["name"],
            pdf_bytes=pdf_bytes
        )
        return parsed                      