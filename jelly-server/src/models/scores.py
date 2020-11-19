from .base import ma, db


class Score(db.Model):
    id = db.Column(db.String(36), db.ForeignKey("run.id"), primary_key=True)
    score = db.Column(db.Integer)

    runs = db.relationship("Run", back_populates="score")

    def __init__(self, run_id, score):
        self.id = run_id
        self.score = score
