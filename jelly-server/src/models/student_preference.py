from .base import ma, db


class StudentPreference(db.Model):
    student_from_id = db.Column(
        db.Integer, db.ForeignKey("student.id"), primary_key=True
    )
    student_to_id = db.Column(db.Integer, db.ForeignKey("student.id"), primary_key=True)
    value = db.Column(db.Integer)

    student_from = db.relationship("Student", foreign_keys=[student_from_id])
    student_to = db.relationship("Student", foreign_keys=[student_to_id])

    def __init__(self, student_from_id, student_to_id, value):
        self.student_from_id = student_from_id
        self.student_to_id = student_to_id
        self.value = value


class SmallStudentSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "email")
        ordered = True


# Student Schema
class StudentPreferenceSchema(ma.Schema):
    student_to = ma.Nested(SmallStudentSchema)

    class Meta:
        fields = ("id", "student_to", "value")
        ordered = True
