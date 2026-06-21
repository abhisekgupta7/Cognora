from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled
from youtube_transcript_api.proxies import GenericProxyConfig
import os
import random
from dotenv import load_dotenv
from repositories.transcript_repo import TranscriptRepository
from services.transcript.youtube_service import YoutubeService
from services.transcript.whisper_service import WhisperService
from services.transcript.translator_service import TranslatorService
from services.transcript.language_services import LanguageService

LANGUAGES = ["en", "hi"]
load_dotenv()

PROXY_USERNAME = os.getenv("PROXY_USERNAME")
PROXY_PASSWORD = os.getenv("PROXY_PASSWORD")

# All 10 proxies from Webshare
PROXIES = [
    ("31.59.20.176", 6754),
    ("31.56.127.193", 7684),
    ("45.38.107.97", 6014),
    ("38.154.203.95", 5863),
    ("198.105.121.200", 6462),
    ("64.137.96.74", 6641),
    ("198.23.243.226", 6361),
    ("38.154.185.97", 6370),
    ("142.111.67.146", 5611),
    ("191.96.254.138", 6185),
]

def get_proxy_config():
    host, port = random.choice(PROXIES)
    proxy_url = f"http://{PROXY_USERNAME}:{PROXY_PASSWORD}@{host}:{port}"
    return GenericProxyConfig(
        http_url=proxy_url,
        https_url=proxy_url,
    )

class TranscriptService:

   def get_or_create_transcript(self, video_url: str, org_id: int, lesson_id: str):
    if TranscriptRepository().transcript_exists(lesson_id, org_id):
        if TranscriptRepository().is_translated(lesson_id, org_id):
            print(f"Transcript already exists for lesson {lesson_id}")
            return TranscriptRepository().get_transcript(lesson_id, org_id)
        else:
            print(f"Translating existing transcript for lesson {lesson_id}")
            row = TranscriptRepository().get_transcript(lesson_id, org_id)
            text = LanguageService().handle(row["language"], row["original"])
            translated_transcript_id = TranscriptRepository().save_translated_transcript(lesson_id, org_id, text)
            return {"transcript": text, "id": translated_transcript_id, "language": "en"}
        print(f"Creating transcript for lesson {lesson_id}")
        video_id = self.extract_video_id(video_url)

        for lang in LANGUAGES:
            # Try each proxy up to 5 times
            for attempt in range(5):
                try:
                    transcript = YouTubeTranscriptApi(proxy_config=get_proxy_config()).fetch(
                        video_id, languages=[lang]
                    )
                    text = " ".join(t.text for t in transcript)
                    TranscriptRepository().save_original_transcript(lesson_id, org_id, text, lang)
                    text = LanguageService().handle(lang, text)
                    translated_transcript_id = TranscriptRepository().save_translated_transcript(lesson_id, org_id, text)
                    print("Translated transcript:", translated_transcript_id)
                    return {"transcript": text, "id": translated_transcript_id, "language": lang}
                except NoTranscriptFound:
                    break  # no transcript in this language, try next
                except Exception as e:
                    print(f"Attempt {attempt+1} failed with proxy: {e}")
                    if attempt == 4:
                        print(f"All proxy attempts failed for lang {lang}")
                    continue

        # Fallback to Whisper
        audio_file_path = YoutubeService.extract_audio_from_video(video_url)
        nepali_transcript = WhisperService.generate_transcript_from_audio(audio_file_path)
        
        if not nepali_transcript:
            raise Exception(f"Whisper returned empty transcript for lesson {lesson_id}")
        
        TranscriptRepository().save_original_transcript(lesson_id, org_id, nepali_transcript, "ne")
        english_transcripted_text = LanguageService().handle("ne", nepali_transcript)
        
        if not english_transcripted_text:
            raise Exception(f"LLM returned empty translation for lesson {lesson_id}")
        
        translated_transcript_id = TranscriptRepository().save_translated_transcript(lesson_id, org_id, english_transcripted_text)
        print("Translated transcript:", translated_transcript_id)
        return {"transcript": english_transcripted_text, "id": translated_transcript_id, "language": "en"}

    def extract_video_id(self, url: str):
        return url.split("v=")[-1].split("&")[0]