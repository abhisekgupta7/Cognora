import yt_dlp
import os
import random
import glob

PROXY_USERNAME = os.getenv("PROXY_USERNAME")
PROXY_PASSWORD = os.getenv("PROXY_PASSWORD")

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

class YoutubeService:
    
    def extract_audio_from_video(video_url):
        video_id = video_url.split("v=")[-1].split("&")[0]
        clean_url = f"https://www.youtube.com/watch?v={video_id}"
        
        search_path = f'downloads/audio/{video_id}.*'
        print(f"Looking for: {search_path}")
        print(f"CWD: {os.getcwd()}")
        existing = glob.glob(search_path)
        print(f"Found: {existing}")
        
        if existing:
            print(f"Audio file already exists: {existing[0]}")
            return existing[0]

        os.makedirs('downloads/audio', exist_ok=True)

        proxies = PROXIES.copy()
        random.shuffle(proxies)

        for host, port in proxies:
            proxy_url = f"http://{PROXY_USERNAME}:{PROXY_PASSWORD}@{host}:{port}"
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': f'downloads/audio/{video_id}.%(ext)s',
                'proxy': proxy_url,
            }
            try:
                print(f"Trying proxy {host}:{port}...")
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([clean_url])
                files = glob.glob(f'downloads/audio/{video_id}.*')
                if files:
                    print(f"Audio saved: {files[0]}")
                    return files[0]
            except Exception as e:
                print(f"Proxy {host}:{port} failed: {e}")
                continue

        raise Exception(f"All proxies failed. Upload audio manually to downloads/audio/{video_id}.*")