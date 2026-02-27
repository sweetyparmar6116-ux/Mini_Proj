from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize(resume_skills, jd_skills):
    corpus = [" ".join(resume_skills), " ".join(jd_skills)]
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(corpus)
    return vectors[0], vectors[1]