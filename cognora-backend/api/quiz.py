from fastapi import APIRouter
from schemas.quiz import QuizRequest
from fastapi.responses import StreamingResponse
from services.quiz.quiz_service import QuizService

Quiz_router = APIRouter()

@Quiz_router.post("/generate_quiz")
async def generate_quiz(payload: QuizRequest):
    return StreamingResponse(
        QuizService().generate_quiz(payload.lesson_id, payload.org_id),
        media_type="text/plain"
    )