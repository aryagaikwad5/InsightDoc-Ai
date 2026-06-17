from groq import Groq

from config import Config


client = Groq(
    api_key=Config.GROQ_API_KEY
)


def generate_quiz(text):

    text = text[:6000]

    prompt = f"""
    Generate exactly 10 multiple choice questions.

    STRICT FORMAT:

    Q1. Question text

    A. Option A

    B. Option B

    C. Option C

    D. Option D

    Correct Answer: A

    Q2. Question text

    A. Option A

    B. Option B

    C. Option C

    D. Option D

    Correct Answer: B

    Rules:
    - Always start with Q1, Q2, Q3...
    - Always use A. B. C. D.
    - Correct Answer must contain ONLY the option letter.
    - No markdown.
    - No explanations.
    - No extra text before or after questions.

    Content:

    {text}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content