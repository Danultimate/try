from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class NotificationRegister(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'notification_register'

    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    task_id = db.Column(db.ForeignKey('task.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    read = db.Column(db.Boolean, nullable=False, default=False)
    notification_description = db.Column(db.Text, nullable=False)

    seller = db.relationship('Seller')
    task = db.relationship('Task')