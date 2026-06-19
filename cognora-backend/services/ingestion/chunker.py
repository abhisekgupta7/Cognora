from repositories.chunk_repo import ChunkRepository
class ProductionChunker:

    def __init__(self, max_tokens=300, overlap=50):
        self.max_tokens = max_tokens
        self.overlap = overlap

    def chunk(self, text: str):
        text=self._clean_text(text)

        sentences = self._split_sentences(text)

        chunks = []
        current = []
        current_tokens = 0

        for sentence in sentences:

            token_count = len(sentence.split())

            # if adding exceeds limit → flush chunk
            if current_tokens + token_count > self.max_tokens:

                chunk_text = " ".join(current).strip()
                chunks.append(chunk_text)

                # OVERLAP (important for continuity)
                current = current[-2:]  # keep last 1–2 sentences
                current_tokens = sum(len(s.split()) for s in current)

            current.append(sentence)
            current_tokens += token_count

        if current:
            chunks.append(" ".join(current))

        return chunks

    def _split_sentences(self, text):
        import spacy
        nlp = spacy.load("en_core_web_sm")
        doc = nlp(text)
        return [s.text.strip() for s in doc.sents]

    def _clean_text(self, text)-> str:
        text = text.replace("\n", " ")
        text = text.replace("uh", "")
        text = text.replace("you know", "")
        return " ".join(text.split())
        