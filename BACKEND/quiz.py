import random
from .models import QuizQuestion, UserProgress, db

def get_next_question(user, topic, last_difficulty=None, last_correct=None):
    difficulty = last_difficulty or 2
    if last_correct is not None:
        if last_correct:
            difficulty = min(3, difficulty + 1)
        else:
            difficulty = max(1, difficulty - 1)
    questions = QuizQuestion.query.filter_by(topic=topic, difficulty=difficulty).all()
    if not questions:
        questions = QuizQuestion.query.filter_by(topic=topic).all()
    return random.choice(questions) if questions else None

def evaluate_answer(question_id, user_answer):
    question = QuizQuestion.query.get(question_id)
    correct = (user_answer.strip().lower() == question.correct_answer.strip().lower())
    return correct