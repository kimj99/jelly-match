from flask_mail import Mail, Message
from flask import request, abort

from src.models import Project, PreferenceForm, db


def create_forms(project_id, host_url):
    students = Project.query.filter_by(id=project_id).first().students

    if not students:
        return None

    print(students)
    forms = []

    for student in students:
        form = PreferenceForm(student.id)
        db.session.add(form)
        temp = student.email, f"{host_url}form/{form.id}"
        forms.append(temp)

    db.session.commit()

    return forms


def init_app(app):
    mail = Mail(app)

    @app.route("/api/project/<id>/send_mail", methods=["POST"])
    def send_mail(id):
        host_url = request.host_url
        forms = create_forms(id, host_url)
        project_name = "NO NAME"

        project = Project.query.filter_by(id=id).first()

        if project:
            project_name = project.name

        if not forms:
            abort(400)

        for form in forms:
            msg = Message(
                "Jellymatch: Student/Group preference form",
                sender="formsender1@gmail.com",
                recipients=[form[0]],
            )
            msg.body = (
                "This is the link to your personal preference form for the project "
                + project_name
                + ": "
                + form[1]
            )
            msg.body += "\n Please fill out and submit your preference list so your Professor can sort the class into groups! \n\n Thanks,\nJellyMatch"
            mail.send(msg)

        return "Success"
