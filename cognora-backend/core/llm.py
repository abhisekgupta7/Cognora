import os
from dotenv import load_dotenv
# Natively handles both AI Studio and Vertex AI as of v4.0.0
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from faster_whisper import WhisperModel

load_dotenv()

# Configuration
PROJECT_ID = "cognora-498416"
LOCATION = "us-central1"

def get_llm():
    # Automatically routes to Vertex AI because 'project' is passed
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",    # Use modern 2.5 flash models
        project=PROJECT_ID,
        location=LOCATION,
        temperature=0.7,
    )

def get_embedding_model():
    # Routes to Vertex AI and handles your exact 3072 dimension database constraint
    return GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-2-preview",  # Modern embedding model defaulting to 3072 dim
        project=PROJECT_ID,
        location=LOCATION,
    )

def whisper_model():
    return WhisperModel("small", device="cpu", compute_type="int8")

# Initializations
llm = get_llm()
embedding_model = get_embedding_model()
whisper_model = whisper_model()