from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Order(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'order'

    seller_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey(
        'client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    date = db.Column(db.DateTime(True), nullable=False)
    status = db.Column(db.String, nullable=False, default='ordered')
    order_number = db.Column(db.String, nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    tax = db.Column(db.Numeric(10, 2), nullable=False)
    shipping = db.Column(db.Numeric(10, 2), nullable=False)
    paid = db.Column(db.Boolean, default=False)

    seller = db.relationship('Seller')
    client = db.relationship('Client')
