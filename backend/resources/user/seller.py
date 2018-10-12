from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

import datetime
from backend import db
from backend.helpers.gen_unique_code import generate_unique_code
from backend.helpers.security import SecurityUtils, authorized
from backend.models import *
from backend.schemas import *
from flask import jsonify, request
from flask.views import MethodView

from backend.services.shopify.client import shopifyClient

seller_method_view_post_body = {
    'seller': fields.Nested(SellerSchema)
}


class SellerMethodView(MethodView):

    @authorized
    def get(self, seller_id=None):
        if seller_id is not None:
            seller = Seller.query.get_or_404(seller_id)
            catalogs = SellerCatalogs.query.filter_by(seller_id=seller_id)
            # catalog_names = Catalog.query.filter_by()
            return jsonify({
                'sellers': [seller.to_dict()],
                'catalogs': [catalog.to_dict() for catalog in catalogs],
            })

        sellers = SecurityUtils.get_current_seller()  # Seller.query.all()
        return jsonify({
            'sellers': [sellers.to_dict()]
        })

    def post(self):
        print('el dict from seller post', request.get_json())
        dataDict = flaskparser.parse(
            seller_method_view_post_body, request, locations=['json', 'form'])
        print('el dataDICTTTTTTTT', dataDict)
        seller = Seller.query.filter_by(
            user_id=dataDict['seller']['user_id']).first()
        if seller is not None:
            return jsonify({'sellers': [seller.to_dict()]})
        seller = Seller()
        seller.from_dict(dataDict['seller'])
        user = User.query.get_or_404(seller.user_id)
        seller.code = generate_unique_code(user.first_name, user.id)
        db.session.add(seller)
        db.session.commit()

        # TODO: eliminar el usuario si hay error en el commit

        # shopifyClient.create_discount_code(code=seller.code)

        db.session.add(Task(type_of_task="share", seller_id=seller.id,
                            task_description="Manda el video 📺 a todos tus clientes potenciales 👯👯",
                            content_id=7,
                            medium_id=1,
                            planned_date=datetime.datetime(2018, 9, 19)
                            ))

        db.session.add(Task(type_of_task="share-general", seller_id=seller.id,
                            task_description="Manda el contenido 📄 de campaña actual a tus clientes 👯",
                            medium_id=1,
                            planned_date=datetime.datetime(2018, 9, 19)
                            ))

        db.session.add(Task(type_of_task="share", seller_id=seller.id,
                            task_description="💰 Cierra tu primera venta 💰",
                            medium_id=1,
                            planned_date=datetime.datetime(2018, 9, 19)
                            ))

        db.session.commit()

        return jsonify({'sellers': [seller.to_dict()]})
