from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from core.llm import get_llm
from core.constants import ENGLISH_TRANSCRIPTION_PROMPT

class TranslatorService:

    def translate_to_english_transcript(self, transcript: str) -> str:
        llm = get_llm()
        
        print(f"Transcript length: {len(transcript)}")
        print(f"Transcript sample: {transcript[:300]}")

        prompt = PromptTemplate(
            template=ENGLISH_TRANSCRIPTION_PROMPT,
            input_variables=["transcript"]
        )
        parser = StrOutputParser()
        transcript_chain = prompt | llm | parser
        
        print("Invoking LLM to translate transcript to English...")
        english_transcript = transcript_chain.invoke({"transcript": transcript})

        print(f"LLM response length: {len(english_transcript) if english_transcript else 0}")
        print(f"LLM response sample: {english_transcript[:300] if english_transcript else 'EMPTY'}")

        if not english_transcript:
            raise ValueError("LLM returned empty translation")
        
        return english_transcript