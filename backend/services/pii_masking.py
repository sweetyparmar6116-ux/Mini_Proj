import re

def mask_pii(text: str) -> str:
    patterns = [
        r"\b[A-Z][a-z]+ [A-Z][a-z]+\b",   # Name
        r"\b\d{10}\b",                   # Phone
        r"\b[\w.-]+@[\w.-]+\.\w+\b",     # Email
        r"\b(male|female|age|gender)\b", # Gender terms
    ]

    for pattern in patterns:
        text = re.sub(pattern, "[REDACTED]", text, flags=re.IGNORECASE)

    return text