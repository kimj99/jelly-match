from uuid import uuid4

from src.genetic_algorithm.helpers import Scenario, generate_preference_lookup
from src.models import StudentPreference, Run
from src.models.scores import Score
from src.models.group_preference import GroupPreference
from src.models import db
from src.models.project import Project, ProjectSchema, ProjectSchemaDetails
from flask import request, jsonify, Blueprint, abort
from flask_security import login_required, current_user

project_schema = ProjectSchemaDetails()
projects_schema = ProjectSchema(many=True)

project_route = Blueprint("project_route", __name__)


@project_route.route("/api/project", methods=["GET"])
@login_required
def get_projects():
    all_projects = Project.query.filter_by(owner_id=current_user.id)
    result = projects_schema.dump(all_projects)
    return jsonify(result)


@project_route.route("/api/project", methods=["POST"])
@login_required
def add_project():
    name = request.json["name"]
    description = request.json["description"]

    new_project = Project(name, description, current_user.id)

    db.session.add(new_project)
    db.session.commit()

    return project_schema.jsonify(new_project)


@project_route.route("/api/project/<id>", methods=["GET"])
@login_required
def get_project(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    return project_schema.jsonify(project)


@project_route.route("/api/project/<id>", methods=["PUT"])
@login_required
def update_project(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    name = request.json["name"]
    description = request.json["description"]

    project.name = name
    project.description = description

    db.session.commit()

    return project_schema.jsonify(project)


@project_route.route("/api/project/<id>", methods=["DELETE"])
@login_required
def delete_project(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    db.session.delete(project)
    db.session.commit()

    return project_schema.jsonify(project)


@project_route.route("/api/project/<id>/run", methods=["POST"])
def run_project(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    groups = project.groups
    students = project.students

    people_ids = [p.id for p in students]
    group_ids = [g.id for g in groups]

    student_prefs = {}
    group_prefs = {}

    for from_id in people_ids:
        temp = db.session.query(StudentPreference).filter_by(student_from_id=from_id)
        student_prefs[from_id] = {t.student_to_id: t.value for t in temp}
        temp = db.session.query(GroupPreference).filter_by(student_from_id=from_id)
        group_prefs[from_id] = {t.group_to_id: t.value for t in temp}

    student_pref_lookup = generate_preference_lookup(student_prefs)
    group_pref_lookup = generate_preference_lookup(group_prefs)

    s = Scenario(people_ids, group_ids, student_pref_lookup, group_pref_lookup, 2, 0.05)

    out = s()

    score = out[1]

    out = s.split_answer_to_groups(out[0])

    unique_id = str(uuid4())

    db.session.add(Score(unique_id, score))

    for group_id in out:
        group = out[group_id]
        for student_id in group:
            db.session.add(Run(unique_id, project.id, group_id, int(student_id)))

    db.session.commit()

    return jsonify("Success")
