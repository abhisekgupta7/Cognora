from core.constants import SYSTEM_RAG_PROMPT,USER_PROMPT_BUILDER
class PromptBuilder:
    def __init__(self):
        self.system_prompt = SYSTEM_RAG_PROMPT
        self.user_prompt_template = USER_PROMPT_BUILDER

    def build_prompt(self, question: str, chunks: list[str]):
        context = "\n\n".join(chunk["chunk_text"] for chunk in chunks)       
        prompt = self.system_prompt + "\n\n" + self.user_prompt_template.format(context=context, question=question)
        return prompt