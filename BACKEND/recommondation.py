from .models import Content, UserProgress

def recommend_content(user): 
    completed_content_ids = {p.content_id for p in user.progress if p.content_id}
    all_content = Content.query.all()
    recommendations = [c for c in all_content if c.id not in completed_content_ids]
    return recommendations[:5]  