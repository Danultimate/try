from flask import jsonify, abort, request
from flask.views import MethodView

from backend.models import *
from backend.helpers.security import SecurityUtils, authorized


class OrderMethodView(MethodView):
    @authorized
    def get(self, order_id=None):
        if order_id is not None:
            order = Order.query.get_or_404(order_id)
            if order.seller == SecurityUtils.get_current_seller():
                details = OrderDetail.query.filter_by(order_id=order_id)

                order_dict = order.to_dict()
                order_dict['quantities'] = [detail.quantity for detail in details]
                return jsonify({
                    'orders': [order_dict],
                    'products': [detail.product.to_dict() for detail in details]
                })
            abort(401)

        orders = Order.query.filter_by(seller_id=SecurityUtils.get_current_seller().id)
        orders_dict_list = []
        products = []
        for order in orders:
            order_dict = order.to_dict()
            details = OrderDetail.query.filter_by(order_id=order.id)
            order_dict['products'] = [detail.product.id for detail in details]
            order_dict['quantities'] = [detail.quantity for detail in details]
            orders_dict_list.append(order_dict)
        return jsonify({
            'orders': orders_dict_list
        })
