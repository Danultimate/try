from flask.views import MethodView
from marshmallow import fields

from backend import db
from backend.models import *
from backend.helpers.security import SecurityUtils, authorized
from flask import request, jsonify, abort
from webargs.flaskparser import parser as flaskparser

#TODO: terminar esto
client_method_view_post_body = {
    'old_consumer': fields.Boolean(required=True, validate=lambda x: x is True) # IMPORTANTE! VALIDAR cosas necesarias >0 etc
}

class ClientMethodView(MethodView):
    @authorized
    def get(self, client_id=None):

        if client_id is not None:
            client = Client.query.get_or_404(client_id)
            if client.seller == SecurityUtils.get_current_seller():
                products = ProductSuggestions.query.filter_by(client_id=client_id)
                return jsonify({'clients': [client.to_dict()],
                                'profiles': [client.profile.to_dict()],
                                'products': [product.to_dict() for product in products],
                                'orders': [order.to_dict() for order in client.orders]
                                })
            abort(401)

        clients = Client.query.filter_by(seller=SecurityUtils.get_current_seller())
        return jsonify({
                        'clients': [client.to_dict() for client in clients]
                       })

    def post(self):
        dataDict = flaskparser(client_method_view_post_body, request)

        client = Client.from_dict(dataDict)
        db.session.add(client)
        db.session.commit()
        #TODO: return 200?