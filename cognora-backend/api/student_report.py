from fastapi import APIRouter
from schemas.student_report import StudentReportRequest
from services.report.Student_report_service import StudentReportService
from workers.job_queue import queue

Student_report_router = APIRouter()

@Student_report_router.post("/generate_report")
async def generate_report(payload: StudentReportRequest):
    org_id = payload.org_id
    user_id = payload.user_id
    lesson_id = payload.lesson_id

    # Add the task to the queue
    job = queue.enqueue(StudentReportService().generate_report, user_id, lesson_id, org_id)

    return {
        "job_id": job.id,
        "status": "queued"
        }