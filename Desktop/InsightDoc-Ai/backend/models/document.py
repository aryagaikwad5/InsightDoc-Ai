from database import db


class Document(db.Model):

    __tablename__ = "documents"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    filename = db.Column(
        db.String(255),
        nullable=False
    )

    upload_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    extracted_text = db.Column(
        db.Text,
        nullable=True
    )