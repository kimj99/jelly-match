from .project import project_route
from .student import student_route
from .group import group_route
from .form import form_route
from .output import output_route
from .preferences import preference_route


def init_app(app):
    app.register_blueprint(project_route)
    app.register_blueprint(student_route)
    app.register_blueprint(group_route)
    app.register_blueprint(form_route)
    app.register_blueprint(output_route)
    app.register_blueprint(preference_route)
