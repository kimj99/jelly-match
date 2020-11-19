from .base import ma, db


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"))
    project = db.relationship("Project", back_populates="groups")

    def __init__(self, name, description, project_id):
        self.name = name
        self.description = description
        self.project_id = project_id


# Group Schema
class GroupSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description")
        ordered = True
