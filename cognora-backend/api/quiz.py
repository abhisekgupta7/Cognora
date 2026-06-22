from fastapi import APIRouter
from schemas.quiz import QuizRequest
from fastapi.responses import StreamingResponse
from services.quiz.quiz_service import QuizService
from workers.job_queue import queue

Quiz_router = APIRouter()

@Quiz_router.post("/generate_quiz")
async def generate_quiz(payload: QuizRequest):
    org_id = payload.org_id
    lesson_id = payload.lesson_id

    # Add the task to the queue
    job = queue.enqueue(QuizService().generate_quiz, lesson_id, org_id)

    return {
        "job_id": job.id,
        "status": "queued"
        }
