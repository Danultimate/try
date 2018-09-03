from flask.views import MethodView
from flask import jsonify
from backend.models import *

class OrderMethodView(MethodView):

    def get(self, order_id=None):
        if order_id is not None:
            order = Order.query.get_or_404(order_id)
            details = OrderDetail.query.filter_by(order_id=order_id)
            return jsonify({
                'orders':[order.to_dict()],
                'order_details': [detail.to_dict() for detail in details]
            })

        orders = Order.query.all()
        return jsonify({
                        'orders': [order.to_dict() for order in orders]
                       })

#TODO: POST?