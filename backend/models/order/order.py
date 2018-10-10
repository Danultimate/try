from backend import db
from backend.models import BaseColumnsMixin, DictMixin
from sqlalchemy.dialects.postgresql.json import JSONB

class Order(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'order'

    seller_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED', ondelete='CASCADE'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey(
        'client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    date = db.Column(db.DateTime(True), nullable=False)
    status = db.Column(db.String, nullable=False, default='ordered')
    order_number = db.Column(db.String, nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    tax = db.Column(db.Numeric(10, 2), nullable=False)
    shipping = db.Column(db.Numeric(10, 2), nullable=False)
    paid = db.Column(db.Boolean, default=False)
    discount = db.Column(db.Numeric(10, 2), nullable=True)
    discount_codes = db.Column(JSONB(astext_type=db.Text()), nullable=True)

    seller = db.relationship('Seller')
    client = db.relationship('Client')
