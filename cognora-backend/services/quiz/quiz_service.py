from repositories.transcript_repo import TranscriptRepository
from services.rag.prompt_builder import PromptBuilder
from core.llm import get_llm
from repositories.quiz_repo import QuizRepository

class QuizService:
    def generate_quiz(self, lesson_id: str, org_id: int):
        print(f"Generating quiz for lesson_id: {lesson_id} and org_id: {org_id}")

        transcript = TranscriptRepository().get_transcript(lesson_id, org_id)

        if not transcript:
            print(f"No transcript found for lesson_id: {lesson_id} and org_id: {org_id}")
            return
            
        prompt= PromptBuilder().build_quiz_prompt(transcript["transcript"])

        llm=get_llm()

        quiz_response = llm.invoke(prompt).content
        QuizRepository().save_quiz(lesson_id, org_id, {"quiz": quiz_response})

        return quiz_response

