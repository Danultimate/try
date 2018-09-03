from backend import *
from backend.models import BaseColumnsMixin, DictMixin


class Profile(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'profile'

    name = db.Column(db.String(255), nullable=False)


class Category(db.Model, BaseColumnsMixin):
    __tablename__ = 'category'

    name = db.Column(db.String(255), nullable=False)
    parentID = db.Column(db.Integer, nullable=False)
