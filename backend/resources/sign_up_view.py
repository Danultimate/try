from flask.views import MethodView

from flask import jsonify, request, abort
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend.helpers import itsdangerous
from backend.models import User, Seller

sign_up_method_view = {
    'username': fields.Integer(required=True),
    'password': fields.String(required=True, validate=lambda x: len(x) > 0)
}

user_method_view_post_body = {
    'first_name': fields.String(required=True),
    'last_name': fields.String(required=True),
    'password_hash': fields.String(required=True, validate=lambda x: len(x) > 0),
    'picture': fields.String(required=False),
    'email': fields.String(required=True),
    'birth': fields.Date(required=False),
    'cellphone': fields.Integer(required=True, validate=lambda x: x > 3000000000),
}

class SignUpMethodView(MethodView):

    # noinspection PyMethodMayBeStatic
    def post(self):
        body = flaskparser.parse(
            sign_up_method_view, request, locations=['json', 'form'])
        user = User.query.filter(User.cellphone == body['username']).first()

        if user is not None and user.verify_password(body['password']):
            return jsonify(
                access_token=itsdangerous.sign(
                    {"user_id": user.id, "name": user.first_name}).decode('ascii'),
                user=user.to_dict()
            )
         # Seller creation
        seller_code = generate_unique_code(user.first_name, user.id)
        seller = Seller(user_id=user.id, seller_code=seller_code)

        abort(401)
