import pandas as pd

def load_skills():
    df = pd.read_excel("data/skills_onet.xlsx")
    skills = df.iloc[:, 0].dropna().str.lower().tolist()
    return set(skills)

SKILLS = load_skills()

def extract_skills(text: str):
    tokens = text.lower().split()
    return list(set(token for token in tokens if token in SKILLS))