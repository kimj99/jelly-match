from .base import ma, db


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(200))
    owner_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    owner = db.relationship("User", back_populates="projects")
    students = db.relationship("Student", back_populates="project")
    groups = db.relationship("Group", back_populates="project")
    runs = db.relationship("Run", back_populates="project")

    def __init__(self, name, description, owner_id):
        self.name = name
        self.description = description
        self.owner_id = owner_id


# Product Schema
class ProjectSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description")
        ordered = True


class ProjectSchemaDetails(ma.Schema):
    class Meta:
        fields = ("id", "name", "description")
        ordered = True
