from flask import jsonify, request
from flask.views import MethodView
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend import db
from backend.models import *
from backend.schemas import *

user_method_view_post_body = {
    'user': fields.Nested(UserSchema)
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


class UserMethodView(MethodView):

    def get(self, user_id=None):
        if user_id is not None:
            user = User.query.get_or_404(user_id)
            social_media = UserSocialNetwork.query.filter_by(user_id=user_id)
            social_media = [some.to_dict() for some in social_media]
            return jsonify({'users': [user.to_dict()], 'social_media': social_media})

        users = User.query.all()
        users = [user.to_dict() for user in users]
        return jsonify({'users': users})

    def post(self):
        dataDict = flaskparser.parse(
            user_method_view_post_body, request, locations=['json', 'form'])

        user = User.from_dict(dataDict)
        db.session.add(user)
        db.session.commit()

        # Seller creation
        seller_code = generate_unique_code(user.first_name, user.id)
        seller = Seller(user_id=user.id, seller_code=seller_code)

        db.session.commit()
        return jsonify({'users': [user.to_dict()]})
