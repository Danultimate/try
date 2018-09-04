from flask.views import MethodView

from flask import jsonify, request, abort
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend.helpers import itsdangerous
from backend.models import User

user_login_method_view = {
    'cellphone': fields.Integer(required=True),
    'password': fields.String(required=True, validate=lambda x: len(x) > 0)
}


class UserLoginMethodView(MethodView):

    # noinspection PyMethodMayBeStatic
    def post(self):
        body = flaskparser.parse(user_login_method_view, request, locations=['json', 'form'])
        user = User.query.filter(User.cellphone == body['cellphone']).first()

        if user is not None and user.verify_password(body['password']):
            return jsonify(
                access_token=itsdangerous.sign({"user_id": user.id, "name": user.name}).decode('ascii'),
                user=user.to_dict()
            )

        abort(401)
