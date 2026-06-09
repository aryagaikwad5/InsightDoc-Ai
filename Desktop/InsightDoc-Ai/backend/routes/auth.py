from flask import Blueprint
from flask import request
from flask import jsonify

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from database import db
from models.user import User

auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:

        return jsonify({
            "success": False,
            "message": "All fields required"
        }), 400

    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:

        return jsonify({
            "success": False,
            "message": "Username already exists"
        }), 400

    hashed_password = generate_password_hash(
        password
    )

    user = User(
        username=username,
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Registration successful"
    })


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(
        username=username
    ).first()

    if not user:

        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": user.to_dict()
    })