from pydantic import BaseModel
class StudentReportRequest(BaseModel):
    user_id: str
    lesson_id: str
    org_id: str