from pydantic import BaseModel

class IngestionRequest(BaseModel):
    course_id: str
    org_id: int
    