from flask import render_template, request, Blueprint, redirect
from src.form_generation.forms import generate_form, PreferenceForm
from src.models import db, StudentPreference
from src.models.group import GroupSchema
from src.models.group_preference import GroupPreference
from src.models.student import Student, StudentSchema
from src.models.project import Project, ProjectSchema
from src.models.preference_form import PreferenceForm
import re

form_route = Blueprint("form_route", __name__)

group_schema = GroupSchema(many=True)
student_schema = StudentSchema(many=True)

form_id_pattern = re.compile(r".{8}-.{4}-.{4}-.{4}-.{12}")


def decompose_students(students, student_id):
    students = student_schema.dump(students)

    out = []

    for student in students:
        if student["id"] == student_id:
            continue
        temp = student["id"], student["name"]
        out.append(temp)
    return out


def decompose_groups(groups):
    groups = group_schema.dump(groups)

    out = []
    descriptions = []

    for group in groups:
        temp = group["id"], group["name"]
        out.append(temp)
        descriptions.append(group["description"])

    return out, descriptions


def add_pefs_to_database(students, groups, student_id):
    for value, student_to in enumerate(students):
        db.session.add(StudentPreference(student_id, student_to, value))
        db.session.commit()

    for value, group_to in enumerate(groups):
        db.session.add(GroupPreference(student_id, group_to, value))
        db.session.commit()


def shut_down_survey(form_id):
    form = PreferenceForm.query.filter_by(id=form_id).first()
    form.active = False
    db.session.commit()


@form_route.route("/form/<id>", methods=["GET", "POST"])
def contact(id):
    form = PreferenceForm.query.filter_by(id=id).first()
    if not form or not form.active:
        return "Invalid Survey"

    project = Project.query.join(Student).join(PreferenceForm).filter_by(id=id).first()

    if not project:
        return "Invalid Survey"

    student_id = Student.query.join(PreferenceForm).filter_by(id=id).first().id

    students = project.students
    groups = project.groups

    student_list = decompose_students(students, student_id)
    group_list, descriptions = decompose_groups(groups)

    form = generate_form(student_list, group_list, descriptions)

    if request.method == "POST":
        if not form.validate():
            return render_template("contact.html", form=form, id=id)
        else:
            # Add preference list back to database here
            add_pefs_to_database(form.data["students"], form.data["groups"], student_id)
            shut_down_survey(id)
            return render_template("success.html", form=form)
    elif request.method == "GET":
        return render_template("contact.html", form=form, id=id)
