from groq import Groq

from config import Config


client = Groq(
    api_key=Config.GROQ_API_KEY
)


def generate_ai_summary(text):

    if not text:
        return "No content found."

    text = text[:6000]

    prompt = f"""
    Summarize the following study material.

    Give:
    1. Short summary
    2. Key topics
    3. Important concepts

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