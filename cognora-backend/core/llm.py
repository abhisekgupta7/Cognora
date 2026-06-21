import os
from dotenv import load_dotenv
# Natively handles both AI Studio and Vertex AI as of v4.0.0
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from faster_whisper import WhisperModel

load_dotenv()


def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-2-preview",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
    )
def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        temperature=0.7,
    )

def whisper_model():
    return WhisperModel("base", device="cpu", compute_type="int8")

# Initializations
llm = get_llm()
embedding_model = get_embedding_model()
whisper_model = whisper_model()

