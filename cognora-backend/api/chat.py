from fastapi import APIRouter
from services.chat.chat_service import handle_chat
from schemas.chat import ChatRequest
from workers.job_queue import queue

chat_router = APIRouter()

@chat_router.post("/")
async def chat(payload: ChatRequest):
    print("Received chat request:", payload)
    job = queue.enqueue(handle_chat, payload.dict())

    return {
        "job_id": job.id,
        "status": "queued"
    }