from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Task(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'task'

    type_of_task = db.Column(db.String(255), nullable=False)
    seller_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED', ondelete='CASCADE'), nullable=False, index=True)
    num_of_clients = db.Column(db.Numeric(10), nullable=False, default=0)
    task_description = db.Column(db.Text, nullable=False)
    content_id = db.Column(db.ForeignKey(
        'content.id', deferrable=True, initially='DEFERRED'), nullable=True, index=True)
    medium_id = db.Column(db.ForeignKey(
        'socialnetwork.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    planned_date = db.Column(db.DateTime(True), nullable=False)
    done = db.Column(db.Boolean, nullable=False, default=False)
    excuted_date = db.Column(db.DateTime(True))

    seller = db.relationship('Seller')
    content = db.relationship('Content')
    medium = db.relationship('SocialNetwork')
