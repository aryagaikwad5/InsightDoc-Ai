from groq import Groq

from config import Config


client = Groq(
    api_key=Config.GROQ_API_KEY
)


def ask_document(question, document_text):

    prompt = f"""
    Answer ONLY from the document below.

    If the answer is not found in the document,
    say:

    'This information is not available in the uploaded document.'

    DOCUMENT:

    {document_text[:6000]}

    QUESTION:

    {question}
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