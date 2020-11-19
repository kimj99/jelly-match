from .base import ma, db


class Run(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"), primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("student.id"), primary_key=True)

    project = db.relationship("Project", back_populates="runs")
    student = db.relationship("Student")
    group = db.relationship("Group")
    score = db.relationship("Score", back_populates="runs")

    def __init__(self, run_id, project_id, group_id, student_id):
        self.id = run_id
        self.project_id = project_id
        self.group_id = group_id
        self.student_id = student_id
