from core.constants import SYSTEM_RAG_PROMPT,USER_PROMPT_BUILDER,QUIZ_GENERATION_PROMPT,STUDENT_REPORT_PROMPT
class PromptBuilder:
    def __init__(self):
        self.system_prompt = SYSTEM_RAG_PROMPT
        self.user_prompt_template = USER_PROMPT_BUILDER
        self.quiz_prompt_template = QUIZ_GENERATION_PROMPT
        self.student_report_prompt_template = STUDENT_REPORT_PROMPT

    def build_prompt(self, question: str, chunks: list[str]):
        context = "\n\n".join(chunk["chunk_text"] for chunk in chunks)       
        prompt = self.system_prompt + "\n\n" + self.user_prompt_template.format(context=context, question=question)
        return prompt
        
    def build_quiz_prompt(self, lesson_content: str):
        return self.quiz_prompt_template.format(lesson_content=lesson_content)

    def build_student_report_prompt(self, lesson_content: str, student_questions: list):
        questions_text = "\n".join(f"- {q}" for q in student_questions)
        return self.student_report_prompt_template.format(
            lesson_content=lesson_content,
            student_questions=questions_text
        )
