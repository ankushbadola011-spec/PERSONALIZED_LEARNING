from pydantic import BaseModel
from typing import List

class User(BaseModel):
    username: str
    level: str

class QuizItem(BaseModel):
    question: str
    answer: str
    user_answer: str

class QuizRequest(BaseModel):
    items: List[QuizItem]
