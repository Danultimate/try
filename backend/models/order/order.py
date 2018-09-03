from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Order(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'order'

    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey('client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    total_points = db.Column(db.Numeric(10), nullable=False, default=0)
    date = db.Column(db.DateTime(True), nullable=False)
    status = db.Column(db.Integer, nullable=False, default=0)
    order_number = db.Column(db.Integer, nullable=False)

    seller = db.relationship('Seller')
    client = db.relationship('Client')