from backend import db
from backend.models import *


def update_order(order_number, status='ordered', paid=False):
    order = Order.query.filter_by(order_number=str(order_number)).first()
    if order is None:
        print('order ', order_number, ' does not exist')
        return
    order.status = status
    order.paid = paid
    db.session.commit()


def set_group(orders, status='ordered', paid=False):
    for order in orders:
        print('---Orden: ', order)
        update_order(order, status, paid)
