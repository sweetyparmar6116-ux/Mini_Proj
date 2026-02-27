# utils/file_handler.py

from fastapi import UploadFile, HTTPException

ALLOWED_EXTENSIONS = {"pdf", "docx"}

def validate_resume_file(file: UploadFile):
    """
    Validates resume file type.
    Allows only PDF and DOCX files.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    extension = file.filename.split(".")[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX are allowed."
        )

    return True