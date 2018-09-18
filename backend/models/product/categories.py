from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Profile(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'profile'

    name = db.Column(db.String(255), nullable=False)

    def __str__(self):
        return str(self.id) + '. ' + self.name


class Category(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'category'

    name = db.Column(db.String(255), nullable=False)
    parentID = db.Column(db.Integer, nullable=False)
    
    def __str__(self):
        return str(self.id) + '. ' + self.name


class FavoriteClientCategory(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'client_category'

    category_id = db.Column(db.ForeignKey(
        'category.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey(
        'client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    category = db.relationship('Category')
    client = db.relationship('Client')
