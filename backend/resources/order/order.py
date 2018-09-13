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
                return jsonify({
                    'orders': [order_dict],
                })
            abort(401)

        orders = Order.query.filter_by(seller_id=SecurityUtils.get_current_seller().id)
        return jsonify({
            'orders': [order.to_dict() in orders]
        })
