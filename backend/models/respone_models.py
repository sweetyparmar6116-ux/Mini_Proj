from pydantic import BaseModel
from typing import List

class ScreeningResponse(BaseModel):
    match_score: float
    extracted_skills: List[str]
    missing_skills: List[str]
    tfidf: float
    sbert: float
    explanation: str