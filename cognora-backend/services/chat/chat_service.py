from services.ingestion.embedder import Embedder
from services.rag.retriever import Retriever
from services.rag.prompt_builder import PromptBuilder
from core.constants import SYSTEM_RAG_PROMPT,USER_PROMPT_BUILDER
from repositories.chat_message_repo import ChatMessageRepository
from repositories.chat_session_repo import ChatSessionRepository
from core.llm import get_llm

llm=get_llm()

def handle_chat(payload):
    print("Received chat payload:", payload)

    user_id = payload["user_id"]
    lesson_id = payload["lesson_id"]
    course_id = payload["course_id"]
    org_id = payload["org_id"]
    question = payload["question"]

    print("Starting of the chat pipeline")


    session=ChatSessionRepository().create_session(user_id, course_id, org_id, lesson_id,thread_id=None)

    ChatMessageRepository().create_message(
        session_id=session["id"],
        org_id=org_id,
        role="user",
        content=question,
        sources=[user_id],
        metadata={"user_id": user_id, "course_id": course_id, "lesson_id": lesson_id}
    )
   
    query_vector=Embedder().embed_query(question)

    chunks=Retriever().search(
        query_vector=query_vector,
        lesson_id=lesson_id,
        course_id=course_id,
        org_id=org_id,
        top_k=5
    )

    prompt=PromptBuilder().build_prompt(question,chunks)

    result=llm.invoke(prompt)
    sources=[chunk["chunk_text"] for chunk in chunks]

    ChatMessageRepository().create_message(
        session_id=session["id"],
        org_id=org_id,
        role="assistant",
        content=result.content,
        sources=sources,
        metadata={"user_id": user_id, "course_id": course_id, "lesson_id": lesson_id, "result_metadata": result.response_metadata}
    )
    print("chat pipeline completed")
    response = {
        "answer": result.content,
        "source": sources
    }
    print("Returning response:", response)
    return response             