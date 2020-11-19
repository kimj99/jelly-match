from src.models import db
from src.models.project import Project
from src.models.student import Student, StudentSchema, StudentSchemaDetails
from flask import request, Blueprint, abort
from flask_security import login_required, current_user


student_schema = StudentSchemaDetails()
students_schema = StudentSchema(many=True)

student_route = Blueprint("student_route", __name__)


@student_route.route("/api/project/<id>/student", methods=["GET"])
@login_required
def get_students(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    return students_schema.jsonify(project.students)


@student_route.route("/api/project/<id>/student", methods=["POST"])
@login_required
def add_student(id):
    name = request.json["name"]
    email = request.json["email"]

    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    new_student = Student(name, email, project.id)

    db.session.add(new_student)
    db.session.commit()

    return student_schema.jsonify(new_student)


@student_route.route("/api/project/<id>/student/<sid>", methods=["GET"])
@login_required
def get_student(id, sid):
    student = (
        Student.query.filter_by(id=sid)
        .join(Project)
        .filter_by(owner_id=current_user.id, id=id)
        .first()
    )
    if student is None:
        abort(401)

    return student_schema.jsonify(student)


@student_route.route("/api/project/<id>/student/<sid>", methods=["PUT"])
@login_required
def update_student(id, sid):
    student = (
        Student.query.filter_by(id=sid)
        .join(Project)
        .filter_by(owner_id=current_user.id, id=id)
        .first()
    )
    if student is None:
        abort(401)

    name = request.json["name"]
    email = request.json["email"]

    student.name = name
    student.email = email

    db.session.commit()

    return student_schema.jsonify(student)


@student_route.route("/api/project/<id>/student/<sid>", methods=["DELETE"])
@login_required
def delete_student(id, sid):
    student = (
        Student.query.filter_by(id=sid)
        .join(Project)
        .filter_by(owner_id=current_user.id, id=id)
        .first()
    )
    if student is None:
        abort(401)

    db.session.delete(student)
    db.session.commit()

    return student_schema.jsonify(student)
