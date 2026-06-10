import os

from flask import Blueprint
from flask import request
from flask import jsonify

from config import Config

from database import db

from models.document import Document

import fitz

from services.summarizer import generate_summary

from services.pdf_service import (
    extract_text_from_pdf
)

document_bp = Blueprint(
    "document",
    __name__
)


@document_bp.route(
    "/upload",
    methods=["POST"]
)
def upload_document():

    if "file" not in request.files:

        return jsonify({
            "success": False,
            "message": "No file selected"
        }), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify({
            "success": False,
            "message": "Empty filename"
        }), 400

    upload_folder = Config.UPLOAD_FOLDER

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    file.save(file_path)

    extracted_text = extract_text_from_pdf(
        file_path
    )

    summary = generate_summary(
        extracted_text
    )

    document = Document(
        filename=file.filename,
        extracted_text=extracted_text
    )

    db.session.add(document)
    db.session.commit()

    return jsonify({
        "success": True,
        "filename": file.filename,
        "summary": summary,
        "text": extracted_text[:3000]
    })