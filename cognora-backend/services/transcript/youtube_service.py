import yt_dlp
class YoutubeService:
    def extract_audio_from_video(video_url):

        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': 'downloads/audio/%(id)s.%(ext)s',
        }
        print(f"Extracting audio from {video_url}...")

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
    
        audio_file_path = "downloads/audio/{video_id}.mp3"
        print(f"Audio extracted and saved to {audio_file_path}")
        return audio_file_path