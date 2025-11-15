# logic.py

def get_recommendations(level):
    base_content = {
        "beginner": [
            "Basics of Algebra",
            "Introduction to Computers",
            "Basic English Grammar"
        ],
        "intermediate": [
            "Object-Oriented Programming",
            "Data Structures Basics",
            "Intermediate Math Problems"
        ],
        "advanced": [
            "Machine Learning Basics",
            "Full Stack Development Roadmap",
            "Advanced Problem Solving"
        ]
    }

    return base_content.get(level, [])


def evaluate_quiz(answers):
    score = 0
    total = len(answers)

    for q in answers:
        if str(q.user_answer).strip().lower() == str(q.answer).strip().lower():
            score += 1

    return score, total
