from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import User, QuizRequest
from logic import get_recommendations, evaluate_quiz

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

          
@app.get("/")
def home():
    return {"message": "Personalized Learning System Backend Running"}

# Recommendation API
@app.post("/api/recommend")
def recommend(user: User):
    recommendations = get_recommendations(user.level)
    return {
        "user": user.username,
        "recommended": recommendations
    }

# Quiz Evaluation API
@app.post("/api/quiz")
def quiz(quiz_data: QuizRequest):
    score, total = evaluate_quiz(quiz_data.items)

    return {
        "score": score,
        "total": total,
        "performance": "Good Job!" if score >= total / 2 else "Needs Improvement"
    }
