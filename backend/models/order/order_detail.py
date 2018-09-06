from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class OrderDetail(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'order_detail'

    order_id = db.Column(db.ForeignKey(
        'order.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey(
        'product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    points = db.Column(db.Numeric(10), nullable=False, default=0)

    order = db.relationship('Order')
    product = db.relationship('Product')
