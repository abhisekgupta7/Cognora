from youtube_transcript_api import (
    YouTubeTranscriptApi,
    NoTranscriptFound,
    TranscriptsDisabled
)
from youtube_transcript_api.proxies import WebshareProxyConfig
import os
from dotenv import load_dotenv

from repositories.transcript_repo import TranscriptRepository
from services.transcript.youtube_service import YoutubeService
from services.transcript.whisper_service import WhisperService
from services.transcript.translator_service import TranslatorService
from services.transcript.language_services import LanguageService
LANGUAGES=["en","hi"]

load_dotenv()

proxy_config = WebshareProxyConfig(
    proxy_username=os.getenv("PROXY_USERNAME"),
    proxy_password=os.getenv("PROXY_PASSWORD"),
)

class TranscriptService:

    def get_or_create_transcript(self, video_url: str, org_id: int, lesson_id: str):
        
        if TranscriptRepository().transcript_exists(lesson_id, org_id):
            print(f"Transcript already exists for lesson {lesson_id} and org {org_id}")
            return TranscriptRepository().get_transcript(lesson_id, org_id)
        else:
            print(f"Transcript does not exist for lesson {lesson_id} and org {org_id}. Creating new transcript.")

            video_id =self.extract_video_id(video_url)
            for lang in LANGUAGES:
                try:
                    transcript = YouTubeTranscriptApi(proxy_config=proxy_config).fetch(
                    video_id,
                    languages=[lang]
                )
                    text = " ".join(t.text for t in transcript)
                    transcript= TranscriptRepository().save_original_transcript(lesson_id, org_id, text, lang)

                    text = LanguageService().handle(lang, text)
                    translated_transcript_id = TranscriptRepository().save_translated_transcript(lesson_id, org_id, text)
                    print("Translated transcript:", translated_transcript_id)

                    return {
                    "transcript": text,
                    "id": translated_transcript_id,
                    "language": lang
                }
                except NoTranscriptFound:
                    continue

            audio_file_path = YoutubeService.extract_audio_from_video(video_url)

            nepali_transcript = WhisperService.generate_transcript_from_audio(
                audio_file_path
            )
            if nepali_transcript:
                transcript_id = TranscriptRepository().save_original_transcript(lesson_id, org_id, nepali_transcript, "ne")


            english_transcripted_text = LanguageService().handle("ne", nepali_transcript)
            translated_transcript_id = TranscriptRepository().save_translated_transcript(lesson_id, org_id, english_transcripted_text)
            print("Translated transcript:", translated_transcript_id)

            return{
                "transcript": english_transcripted_text,
                "id": translated_transcript_id,
                "language": "en"
            }

    def extract_video_id(self, url: str):
        return url.split("v=")[-1].split("&")[0]

    
    



    