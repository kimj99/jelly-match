from .base import db, ma

from .user import User
from .project import Project
from .group import Group
from .student import Student
from .student_preference import StudentPreference
from .group_preference import GroupPreference
from .preference_form import PreferenceForm
from .run import Run
from .scores import Score


def init_app(app):
    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        db.create_all()
