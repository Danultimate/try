from backend import *
from backend.models.mixins import *

class Order(db.Model, BaseColumnsMixin):
    __tablename__ = 'order'

    date = db.Column(db.DateTime(True), nullable=False)
    user_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    user = db.relationship('User')

class OrderProduct(db.Model, BaseColumnsMixin):
    __tablename__ = 'order_products'

    quantity = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.ForeignKey('order.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey('product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    user_client_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    order = db.relationship('Order')
    product = db.relationship('Product')
    user_client = db.relationship('User')