from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_id: int
    lesson_id: str
    question: str
    course_id: str
    org_id: int
    