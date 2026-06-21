from flask import Flask
from flask_cors import CORS

from config import Config
from database import db

from routes.auth import auth_bp
from routes.document import document_bp

from models.user import User
from models.document import Document

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    document_bp,
    url_prefix="/api/document"
)


with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {
        "status": "InsightDoc AI Backend Running"
    }


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )