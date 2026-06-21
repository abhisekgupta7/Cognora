import yt_dlp
import subprocess
import os
import glob

EC2_IP = "98.91.19.116"
EC2_USER = "ec2-user"
EC2_KEY = "C:\\Users\\Abish\\Downloads\\cognora-key.pem"  # update this
EC2_PATH = "/home/ec2-user/Cognora/cognora-backend/downloads/audio/"

LESSONS = [
    {"id": "1bb8fae4-3cc4-4f1f-beb1-d2b7f05650ee", "url": "https://www.youtube.com/watch?v=xfwGbu3yZVk"},
    {"id": "601f6913-9c88-4978-9c50-6a96145b2399", "url": "https://www.youtube.com/watch?v=7iHyOXT5dM4"},
    {"id": "2fd86426-21ae-4bf8-ba28-6a4eb29891ca", "url": "https://www.youtube.com/watch?v=jNXg2p5r68A"},
]

def get_video_id(url):
    return url.split("v=")[-1].split("&")[0]

def download_audio(url, video_id):
    # Check if already downloaded (any format)
    existing = glob.glob(f"{video_id}.*")
    if existing:
        print(f"Already downloaded: {existing[0]}")
        return existing[0]

    print(f"Downloading {url}...")
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{video_id}.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    files = glob.glob(f"{video_id}.*")
    if not files:
        raise Exception(f"Download failed for {url}")
    
    print(f"Downloaded: {files[0]}")
    return files[0]

def upload_to_ec2(file_path):
    print(f"Uploading {file_path} to EC2...")
    subprocess.run([
        "scp", "-i", EC2_KEY,
        "-o", "StrictHostKeyChecking=no",
        file_path,
        f"{EC2_USER}@{EC2_IP}:{EC2_PATH}"
    ], check=True)
    print(f"Uploaded: {file_path}")

def main():
    subprocess.run([
        "ssh", "-i", EC2_KEY,
        "-o", "StrictHostKeyChecking=no",
        f"{EC2_USER}@{EC2_IP}",
        f"mkdir -p {EC2_PATH}"
    ], check=True)

    for lesson in LESSONS:
        video_id = get_video_id(lesson["url"])
        print(f"\nProcessing lesson {lesson['id']} - video {video_id}")
        audio_file = download_audio(lesson["url"], video_id)
        upload_to_ec2(audio_file)
        os.remove(audio_file)
        print(f"Cleaned up: {audio_file}")

    print("\nAll done! Trigger ingestion from UI now.")

if __name__ == "__main__":
    main()