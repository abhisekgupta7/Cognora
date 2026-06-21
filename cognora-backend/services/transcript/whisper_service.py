from core.llm import whisper_model

class WhisperService:
    def generate_transcript_from_audio(audio_file_path):
        print(f"Generating transcript from {audio_file_path}...")

        segments, info = whisper_model.transcribe(audio_file_path)
        print(f"Detected language: {info.language}")
        
        text = " ".join(segment.text for segment in segments)
        print(f"Transcript length: {len(text)}")
        
        if not text.strip():
            raise Exception(f"Whisper returned empty transcript for {audio_file_path}")
        
        return text