from services.ingestion.embedder import Embedder
from services.rag.retriever import Retriever
from services.rag.prompt_builder import PromptBuilder
from core.constants import SYSTEM_RAG_PROMPT,USER_PROMPT_BUILDER
from repositories.chat_message_repo import ChatMessageRepository
from repositories.chat_session_repo import ChatSessionRepository
from core.llm import get_llm

llm=get_llm()

async def handle_chat(payload):
    user_id = payload["user_id"]
    lesson_id = payload["lesson_id"]
    course_id = payload["course_id"]
    org_id = payload["org_id"]
    question = payload["question"]

    session = ChatSessionRepository().create_session(user_id, course_id, org_id, lesson_id, thread_id=None)
    session_id = session["id"]
    ChatMessageRepository().create_message(
        session_id=session_id,
        org_id=org_id,
        role="user",
        content=question,
        sources=[user_id],
        metadata={"user_id": user_id, "course_id": course_id, "lesson_id": lesson_id}
    )

    query_vector = Embedder().embed_query(question)
    chunks = Retriever().search(
        query_vector=query_vector,
        lesson_id=lesson_id,
        course_id=course_id,
        org_id=org_id,
        top_k=5
    )

    prompt = PromptBuilder().build_prompt(question, chunks)

    full_response = ""
    for chunk in llm.stream(prompt):
        token = chunk.content
        if isinstance(token, str) and token:
            full_response += token
            yield token

    # This runs AFTER streaming finishes    
    sources = [c["chunk_text"] for c in chunks]
    ChatMessageRepository().create_message(
        session_id=session_id,
        org_id=org_id,
        role="assistant",
        content=full_response,
        sources=sources,
        metadata={"user_id": user_id, "course_id": course_id, "lesson_id": lesson_id}
    )