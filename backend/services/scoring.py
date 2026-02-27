from sklearn.metrics.pairwise import cosine_similarity

def calculate_score(resume_skills, jd_skills, resume_vec, jd_vec):
    score = cosine_similarity(resume_vec, jd_vec)[0][0] * 100

    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))

    return round(score, 2), matched, missing