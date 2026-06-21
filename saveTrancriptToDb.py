from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
import psycopg
from psycopg.rows import dict_row

DATABASE_URL = "postgresql://neondb_owner:npg_fsHuplC85GAg@ep-old-moon-aobws7sw-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

LESSONS = [
    # English Course
    {"id": "4cfa0ae8-6f72-43e1-b201-a56c61f00e38", "url": "https://www.youtube.com/watch?v=b4ba60j_4o8", "org_id": 6, "lang": "en"},
    {"id": "58cba366-dd37-41df-8e53-8ce88e7af892", "url": "https://www.youtube.com/watch?v=xiSuX0f1mEI", "org_id": 6, "lang": "en"},
    {"id": "9fbcbfb7-2b27-4659-8625-67ab03ad522e", "url": "https://www.youtube.com/watch?v=L0g87N0piT0", "org_id": 6, "lang": "en"},
    # Hindi Course
    {"id": "9942e472-0e17-42ea-b55f-2e5f9a914778", "url": "https://www.youtube.com/watch?v=nlz9j-r0U9U", "org_id": 6, "lang": "hi"},
    {"id": "5a26fcf7-2681-47d2-9d73-2e953651634e", "url": "https://www.youtube.com/watch?v=-xSJA8-o6Eg", "org_id": 6, "lang": "hi"},
    {"id": "bc41aa7a-e345-4ee5-8ab1-4d07859badb7", "url": "https://www.youtube.com/watch?v=HdcLE8JuMrA", "org_id": 6, "lang": "hi"},
]

def get_video_id(url):
    return url.split("v=")[-1].split("&")[0]

def main():
    conn = psycopg.connect(DATABASE_URL, row_factory=dict_row, autocommit=True)
    cursor = conn.cursor()

    for lesson in LESSONS:
        video_id = get_video_id(lesson["url"])
        print(f"\nFetching transcript for lesson {lesson['id']} - video {video_id}")

        try:
            transcript = YouTubeTranscriptApi().fetch(video_id, languages=[lesson["lang"], "en"])
            text = " ".join(t.text for t in transcript)
            print(f"Got transcript: {len(text)} chars")

            # Check if already exists
            cursor.execute(
                "SELECT id FROM transcripts WHERE lesson_id = %s AND org_id = %s",
                (lesson["id"], lesson["org_id"])
            )
            existing = cursor.fetchone()

            if existing:
                print(f"Transcript already exists, updating...")
                cursor.execute(
                    """
                    UPDATE transcripts 
                    SET original_transcript = %s, language = %s
                    WHERE lesson_id = %s AND org_id = %s
                    """,
                    (text, lesson["lang"], lesson["id"], lesson["org_id"])
                )
            else:
                print(f"Inserting new transcript...")
                cursor.execute(
                    """
                    INSERT INTO transcripts (lesson_id, org_id, original_transcript, language)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (lesson["id"], lesson["org_id"], text, lesson["lang"])
                )

            print(f"Saved transcript for lesson {lesson['id']}")

        except NoTranscriptFound:
            print(f"No transcript found for {video_id} in {lesson['lang']} - trying English...")
            try:
                transcript = YouTubeTranscriptApi().fetch(video_id, languages=["en"])
                text = " ".join(t.text for t in transcript)
                cursor.execute(
                    """
                    INSERT INTO transcripts (lesson_id, org_id, original_transcript, language)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (lesson["id"], lesson["org_id"], text, "en")
                )
                print(f"Saved English transcript for lesson {lesson['id']}")
            except Exception as e:
                print(f"Failed completely for {video_id}: {e}")
        except Exception as e:
            print(f"Error for lesson {lesson['id']}: {e}")

    cursor.close()
    conn.close()
    print("\nDone! Now trigger ingestion from UI - it will skip transcript fetch and go straight to chunking.")

if __name__ == "__main__":
    main()