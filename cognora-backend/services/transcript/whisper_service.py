from core.llm import whisper_model
class WhisperService:
    def generate_transcript_from_audio(audio_file_path):
        # Placeholder for actual transcription logic
        print(f"Generating transcript from {audio_file_path}...")

        segments, info = whisper_model.transcribe(audio_file_path)
        print(info.language)
        if info.language == "ne":
            print("Transcribing in Nepali...")
            text = " ".join(segment.text for segment in segments)
            nepali_transcript = text
        else:
            print("Transcription is not in Nepali.")
            return None

        return nepali_transcript

