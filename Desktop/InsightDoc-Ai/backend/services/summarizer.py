import re


def generate_summary(text):

    if not text:
        return "No content available for summary."

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    # Split into sentences
    sentences = text.split(".")

    # Remove empty sentences
    sentences = [
        sentence.strip()
        for sentence in sentences
        if sentence.strip()
    ]

    # Take first 5 sentences
    summary_sentences = sentences[:5]

    summary = ". ".join(summary_sentences)

    if summary:
        summary += "."

    return summary