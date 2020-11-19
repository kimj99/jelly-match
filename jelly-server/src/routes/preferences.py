from src.models.group_preference import GroupPreference
from src.models import db
from src.models.project import Project
from src.models.student import Student
from src.models.student_preference import StudentPreference
from flask import request, jsonify, Blueprint, abort
from flask_security import login_required, current_user

preference_route = Blueprint("preference_route", __name__)


@preference_route.route("/api/project/<id>/student/<sid>/preferences", methods=["GET"])
def get_preferences(id, sid):
    student = (
        Student.query.filter_by(id=sid)
        .join(Project)
        .filter_by(owner_id=current_user.id, id=id)
        .first()
    )
    if student is None:
        abort(401)

    preferences = db.session.query(StudentPreference).filter_by(student_from_id=sid)

    student_preferences = []
    group_preferences = []

    for p in preferences:
        student_preferences.insert(p.value, p.student_to.name)

    preferences = db.session.query(GroupPreference).filter_by(student_from_id=sid)

    for p in preferences:
        group_preferences.insert(p.value, p.group_to.name)

    out = {"students": student_preferences, "groups": group_preferences}

    return jsonify(out)
