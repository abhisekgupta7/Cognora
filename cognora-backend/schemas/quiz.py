from pydantic import BaseModel

class QuizRequest(BaseModel):
    lesson_id: str
    org_id: int
    