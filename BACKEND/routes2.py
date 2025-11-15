from flask import jsonify, request
from flask_login import login_required, current_user
from .quiz import get_next_question, evaluate_answer

@main_bp.route('/api/quiz/next', methods=['POST'])
@login_required
def api_quiz_next():
    data = request.json
    topic = data.get('topic')
    last_difficulty = data.get('last_difficulty')
    last_correct = data.get('last_correct')
    question = get_next_question(current_user, topic, last_difficulty, last_correct)
    if question:
        return jsonify({
            'id': question.id,
            'question': question.question,
            'options': question.options,
            'difficulty': question.difficulty
        })
    return jsonify({'error': 'No questions available'}), 404

@main_bp.route('/api/quiz/evaluate', methods=['POST'])
@login_required
def api_quiz_evaluate():
    data = request.json
    question_id = data['question_id']
    user_answer = data['answer']
    correct = evaluate_answer(question_id, user_answer)
    # Optionally, update UserProgress here
    return jsonify({'correct': correct})