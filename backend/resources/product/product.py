from flask.views import MethodView
from flask import jsonify
from backend.models import *

class ProductMethodView(MethodView):

    def get(self, product_id=None):
        if product_id is not None:
            product = Product.query.get_or_404(product_id)
            profile_weights = ProductProfileWeight.query.filter_by(product_id=product_id)
            #catalog_names = Catalog.query.filter_by()
            return jsonify({
                'products':[product.to_dict()],
                'product_profile_weights': [weight.to_dict() for weight in profile_weights],
                'profiles': [weight.profile.to_dict() for weight in profile_weights]
            })

        products = Product.query.all()
        return jsonify({
                        'products': [product.to_dict() for product in products]
                       })