from core.constants import SYSTEM_RAG_PROMPT,USER_PROMPT_BUILDER,QUIZ_GENERATION_PROMPT
class PromptBuilder:
    def __init__(self):
        self.system_prompt = SYSTEM_RAG_PROMPT
        self.user_prompt_template = USER_PROMPT_BUILDER
        self.quiz_prompt_template = QUIZ_GENERATION_PROMPT

    def build_prompt(self, question: str, chunks: list[str]):
        context = "\n\n".join(chunk["chunk_text"] for chunk in chunks)       
        prompt = self.system_prompt + "\n\n" + self.user_prompt_template.format(context=context, question=question)
        return prompt
        
    def build_quiz_prompt(self, transcript: str):
        prompt=self.quiz_prompt_template.format(transcript=transcript)
        return prompt
