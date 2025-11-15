from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    progress = db.relationship('UserProgress', backref='user', lazy=True)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text, nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.Integer, default=1)  # 1=Easy, 2=Medium, 3=Hard

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(300), nullable=False)
    options = db.Column(db.PickleType, nullable=False)  # List of options
    correct_answer = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.Integer, default=1)

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'))
    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'))
    score = db.Column(db.Float)
    attempts = db.Column(db.Integer, default=0)
    last_attempt = db.Column(db.DateTime)