@main_bp.route('/api/recommend', methods=['GET'])
@login_required
def api_recommend():
    recommendations = recommend_content(current_user)
    return jsonify([{
        'id': c.id,
        'title': c.title,
        'topic': c.topic,
        'difficulty': c.difficulty
    } for c in recommendations])