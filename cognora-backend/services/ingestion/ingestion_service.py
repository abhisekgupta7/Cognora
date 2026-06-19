from repositories.lesson_repo import LessonRepository
from services.transcript.transcript_service import TranscriptService
from services.ingestion.chunker import ProductionChunker
from services.ingestion.embedder import Embedder
from repositories.chunk_repo import ChunkRepository
class IngestionService:
    def ingest_course(self,course_id: str, org_id: int):

        lessons=LessonRepository().get_course_lessons(course_id,org_id)

        for lesson in lessons:
            self.ingest_lesson(lesson)
        return{
            "success": True,
        }
    
    def ingest_lesson(self,lesson):
        transcript=TranscriptService().get_or_create_transcript(lesson["lesson_video_url"], lesson["org_id"], lesson["id"])

        print(type(transcript))
        print(transcript) # Debugging line to check the transcript content
        if not transcript["transcript"]:
            print(f"Failed to get or create translated transcript for lesson {lesson['id']}")
            return

        chunks = ProductionChunker().chunk(
           transcript["transcript"]
        )

        embeddings = Embedder().embed_many(chunks)
        token_count = sum(len(chunk.split()) for chunk in chunks)

        ChunkRepository().insert_many(
            org_id=lesson["org_id"],
            course_id=lesson["course_id"],
            lesson_id=lesson["id"],
            transcript_id=transcript["id"],
            chunks=chunks,
            embedding=embeddings,
            token_count=token_count
        )
        print("Ingestion pipeline completed")
    


