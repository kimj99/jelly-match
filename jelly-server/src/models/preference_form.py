from .base import ma, db
from uuid import uuid4


class PreferenceForm(db.Model):
    id = db.Column(db.String(36), unique=True)
    student_id = db.Column(db.Integer, db.ForeignKey("student.id"), primary_key=True)
    student = db.relationship("Student", back_populates="forms")
    active = db.Column(db.Integer)

    def __init__(self, student_id):
        self.id = str(uuid4())
        self.student_id = student_id
        self.active = True
