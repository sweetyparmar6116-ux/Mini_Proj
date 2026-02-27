import fitz  # PyMuPDF
from docx import Document

def extract_text(file):
    if file.filename.endswith(".pdf"):
        pdf = fitz.open(stream=file.file.read(), filetype="pdf")
        return " ".join(page.get_text() for page in pdf)

    elif file.filename.endswith(".docx"):
        doc = Document(file.file)
        return " ".join(p.text for p in doc.paragraphs)

    else:
        return ""