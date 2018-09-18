from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Topic(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'topic'
    name = db.Column(db.String, nullable=False)

    def __str__(self):
        return str(self.id) + '. ' + self.name
