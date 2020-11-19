from .base import ma, db


class GroupPreference(db.Model):
    student_from_id = db.Column(
        db.Integer, db.ForeignKey("student.id"), primary_key=True
    )
    group_to_id = db.Column(db.Integer, db.ForeignKey("group.id"), primary_key=True)
    value = db.Column(db.Integer)

    student_from = db.relationship("Student")
    group_to = db.relationship("Group")

    def __init__(self, student_from_id, group_to_id, value):
        self.student_from_id = student_from_id
        self.group_to_id = group_to_id
        self.value = value


# Student Schema
class GroupPreferenceSchema(ma.Schema):
    class Meta:
        fields = ("id", "student_from_id", "group_to_id", "value")
        ordered = True
