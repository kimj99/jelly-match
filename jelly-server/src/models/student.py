from .student_preference import StudentPreferenceSchema, StudentPreference
from .base import ma, db
from marshmallow import fields


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200))
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"))

    project = db.relationship("Project", back_populates="students")
    forms = db.relationship("PreferenceForm", back_populates="student")

    def __init__(self, name, email, project_id):
        self.name = name
        self.email = email
        self.project_id = project_id


# Student Schema
class StudentSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "email")
        ordered = True


class StudentSchemaDetails(ma.Schema):

    student_preferences = fields.Method("get_student_preferences")

    class Meta:
        fields = ("id", "name", "email", "student_preferences")
        ordered = True

    def get_student_preferences(self, obj):
        prefs = StudentPreference.query.filter_by(student_from_id=obj.id)
        result = StudentPreferenceSchema(many=True).dump(prefs)
        return result
