from fastapi import APIRouter
from services.chat.chat_service import handle_chat
from schemas.chat import ChatRequest
from fastapi.responses import StreamingResponse

chat_router = APIRouter()

@chat_router.post("/")
async def chat(payload: ChatRequest):
    return StreamingResponse(handle_chat(payload.dict()), media_type="text/plain")
