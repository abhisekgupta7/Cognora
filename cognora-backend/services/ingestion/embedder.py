from core.llm import get_embedding_model
class Embedder:

    def __init__(self):
        self.embedding_model = get_embedding_model()

    def embed_many(self, chunks: list[str]):
        vectors = [self.embedding_model.embed_query(chunk) for chunk in chunks]
        return vectors

    def embed_query(self, query: str):
        vector = self.embedding_model.embed_query(query)
        return vector