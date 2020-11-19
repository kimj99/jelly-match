from src.models import db
from src.models.project import Project, ProjectSchema, ProjectSchemaDetails
from flask import request, jsonify, Blueprint, abort
from flask_security import login_required, current_user


output_route = Blueprint("output_route", __name__)


def get_all_runs(id):
    project = Project.query.filter_by(owner_id=current_user.id, id=id).first()
    if project is None:
        abort(401)

    runs = project.runs

    out = {}
    scores = {}

    for run in runs:
        if run.id not in out:
            out[run.id] = {}
            scores[run.id] = run.score[0].score

        if run.group_id not in out[run.id]:
            out[run.id][run.group_id] = {"name": run.group.name, "students": []}

        out[run.id][run.group_id]["students"].append(run.student.name)

    for run_id in out:
        run = out[run_id]
        groups = []
        for group_id in run:
            groups.append(run[group_id])
        out[run_id] = {"score": scores[run_id], "groups": groups}

    return out


@output_route.route("/api/project/<id>/output/<run_id>", methods=["GET"])
@login_required
def get_runs_output(id, run_id):
    runs = get_all_runs(id)

    out = runs[run_id]["groups"]

    return jsonify(out)


@output_route.route("/api/project/<id>/output", methods=["GET"])
@login_required
def get_runs(id):
    runs = get_all_runs(id)

    out = []

    for index, run in enumerate(runs):
        out.append({"id": run, "name": index + 1, "score": runs[run]["score"]})

    return jsonify(out)
