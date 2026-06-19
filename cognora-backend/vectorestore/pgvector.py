from langchain_postgres import PGVector


from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2-preview",
)
vector_store = PGVector(
    embeddings=embeddings,
    collection_name="cognora_vectors",
    connection=os.getenv("DATABASE_URL"),
    use_jsonb=True
)