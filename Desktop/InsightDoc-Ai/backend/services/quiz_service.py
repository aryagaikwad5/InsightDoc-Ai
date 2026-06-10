from groq import Groq

from config import Config


client = Groq(
    api_key=Config.GROQ_API_KEY
)


def generate_quiz(text):

    text = text[:6000]

    prompt = f"""
    Create 10 MCQ questions.

    Format:

    Question:
    Option A:
    Option B:
    Option C:
    Option D:
    Correct Answer:

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