from fastapi import APIRouter
from schemas.student_report import StudentReportRequest
from services.report.Student_report_service import StudentReportService
from fastapi.responses import JSONResponse

Student_report_router = APIRouter()

@Student_report_router.post("/generate_report")
async def generate_report(payload: StudentReportRequest):
    result = StudentReportService().generate_report(
        payload.user_id, 
        payload.lesson_id, 
        payload.org_id
    )
    return JSONResponse(content=result)