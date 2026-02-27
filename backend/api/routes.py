from fastapi import APIRouter, UploadFile, File, Form
from services.resume_parser import extract_text
from services.pii_masking import mask_pii
from services.skill_extraction import extract_skills
from services.vectorizer import vectorize
from services.scoring import calculate_score
from utils.file_handler import validate_resume_file
from models.respone_models import ScreeningResponse

validate_resume_file(resume)
router = APIRouter()

@router.post("/screen")
async def screen_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # 1. Extract text
    resume_text = extract_text(resume)

    # 2. Bias removal
    clean_text = mask_pii(resume_text)

    # 3. Skill extraction
    resume_skills = extract_skills(clean_text)
    jd_skills = extract_skills(job_description)

    # 4. Vectorization
    resume_vec, jd_vec = vectorize(resume_skills, jd_skills)

    # 5. Scoring
    score, matched, missing = calculate_score(
        resume_skills, jd_skills, resume_vec, jd_vec
    )

    return {
        "match_percentage": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "bias_removed": True
    }