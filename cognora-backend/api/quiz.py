from fastapi import APIRouter
from schemas.quiz import QuizRequest
from services.quiz.quiz_service import QuizService
from fastapi.responses import JSONResponse

Quiz_router = APIRouter()


@Quiz_router.post("/generate_quiz")
async def generate_quiz(payload: QuizRequest):
    result = QuizService().generate_quiz(payload.lesson_id, payload.org_id)
    return JSONResponse(content=result)