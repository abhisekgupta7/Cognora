from services.transcript.translator_service import TranslatorService
class LanguageService:
    def __init__(self):
        self.translator = TranslatorService()

    def handle(self, lang: str, text: str):
        if lang == "en":
            return text
        if lang == "hi":
            return self.translator.translate_to_english_transcript(text)
        if lang == "ne":
            return self.translator.translate_to_english_transcript(text)