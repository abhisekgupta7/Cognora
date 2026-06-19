from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from core.llm import get_llm
from core.constants import ENGLISH_TRANSCRIPTION_PROMPT

class TranslatorService:
    

    def translate_to_english_transcript(self, transcript: str) -> str:

        llm = get_llm()
        prompt=PromptTemplate(
            template=ENGLISH_TRANSCRIPTION_PROMPT,
            input_variables=["transcript"]
        )
        parser=StrOutputParser()

        transcript_chain=prompt | llm | parser
        print("Invoking LLM to translate transcript to English...")
        english_transcript=transcript_chain.invoke({"transcript": transcript})

        if not english_transcript:
            raise ValueError("LLM returned empty translation")
        
        return english_transcript


