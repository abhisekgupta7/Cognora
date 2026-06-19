from fastapi import APIRouter
from workers.job_queue import queue
from schemas.ingestion import IngestionRequest
from services.ingestion.ingestion_service import IngestionService

Ingest_router = APIRouter()

@Ingest_router.post("/ingest_course")
async def ingest_course(payload: IngestionRequest):

    org_id = payload.org_id
    course_id = payload.course_id

    # Add the task to the queue
    job = queue.enqueue(IngestionService().ingest_course, course_id, org_id)

    return {
        "job_id": job.id,
        "status": "queued"
        }

