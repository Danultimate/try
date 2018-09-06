from flask.views import MethodView
from flask import jsonify
from backend.models import *


class SellerMethodView(MethodView):

    def get(self, seller_id=None):
        if seller_id is not None:
            seller = Seller.query.get_or_404(seller_id)
            catalogs = SellerCatalogs.query.filter_by(seller_id=seller_id)
            # catalog_names = Catalog.query.filter_by()
            return jsonify({
                'sellers': [seller.to_dict()],
                'catalogs': [catalog.to_dict() for catalog in catalogs],
            })

        sellers = Seller.query.all()
        return jsonify({
            'sellers': [seller.to_dict() for seller in sellers]
        })

    def post(self):
        seller_code = generate_unique_code(user.first_name, user.id)
        seller = Seller(user_id=user.id, seller_code=seller_code)
