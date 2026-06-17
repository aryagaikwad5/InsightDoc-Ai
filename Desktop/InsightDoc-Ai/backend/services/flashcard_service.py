from groq import Groq

from config import Config


client = Groq(
    api_key=Config.GROQ_API_KEY
)


def generate_flashcards(text):

    text = text[:6000]

    prompt = f"""
    Generate exactly 10 flashcards.

    STRICT FORMAT:

    Q1. Question text

    Answer: answer text

    Q2. Question text

    Answer: answer text

    Q3. Question text

    Answer: answer text

    Rules:
    - Always use Q1, Q2, Q3...
    - Always use Answer:
    - No markdown.
    - No bullets.
    - No extra text before or after flashcards.

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