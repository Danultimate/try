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
        print('-----el diccionario es: ', dataDict)
        user = User()
        user.from_dict(dataDict['user'])
        db.session.add(user)
        db.session.commit()
        return jsonify({'users': [user.to_dict()]})
