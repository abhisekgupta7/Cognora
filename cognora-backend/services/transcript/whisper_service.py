from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class WhisperService:
    def generate_transcript_from_audio(audio_file_path):
        print(f"Transcribing {audio_file_path} with Groq Whisper API...")
        with open(audio_file_path, "rb") as f:
            transcript = client.audio.transcriptions.create(
                model="whisper-large-v3",
                file=f,
                language="ne"
            )
        print(f"Transcription complete: {len(transcript.text)} chars")
        return transcript.text