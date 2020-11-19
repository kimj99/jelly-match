from src.models.group import GroupSchema, Group
from src.models import db
from src.models.project import Project
from flask import request, Blueprint, abort
from flask_security import login_required, current_user

group_schema = GroupSchema()
groups_schema = GroupSchema(many=True)

group_route = Blueprint("group_route", __name__)


@group_route.route("/api/project/<id>/group", methods=["GET"])
@login_required
def get_groups(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    return groups_schema.jsonify(project.groups)


@group_route.route("/api/project/<id>/group", methods=["POST"])
@login_required
def add_group(id):
    name = request.json["name"]
    description = request.json["description"]

    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    new_group = Group(name, description, project.id)

    db.session.add(new_group)
    db.session.commit()

    return group_schema.jsonify(new_group)


@group_route.route("/api/project/<id>/group/<gid>", methods=["GET"])
@login_required
def get_student(id, gid):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    group = db.session.query(Group).filter_by(id=gid).first()

    if project is None or group is None:
        abort(401)

    return group_schema.jsonify(group)


@group_route.route("/api/project/<id>/group/<gid>", methods=["PUT"])
@login_required
def update_group(id, gid):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    group = db.session.query(Group).filter_by(id=gid).first()

    if project is None or group is None:
        abort(401)

    name = request.json["name"]
    description = request.json["description"]

    group.name = name
    group.description = description

    db.session.commit()

    return group_schema.jsonify(group)


@group_route.route("/api/project/<id>/group/<gid>", methods=["DELETE"])
@login_required
def delete_group(id, gid):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    group = db.session.query(Group).filter_by(id=gid).first()

    if project is None or group is None:
        abort(401)

    db.session.delete(group)
    db.session.commit()

    return group_schema.jsonify(group)
