from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend import db
from backend.helpers.security import SecurityUtils, authorized
from backend.models import *
from backend.schemas import *
from flask import abort, jsonify, request
from flask.views import MethodView

user_method_view_post_body = {
    'user': fields.Nested(UserSchema)
}


class UserMethodView(MethodView):
    @authorized
    def get(self, user_id=None):
        if user_id is not None:
            user = User.query.get_or_404(user_id)
            social_media = UserSocialNetwork.query.filter_by(user_id=user_id)
            social_media = [some.to_dict() for some in social_media]
            return jsonify({'users': [user.to_dict()], 'social_media': social_media})

        users = SecurityUtils.get_current_user()
        users = [users.to_dict()]  # [user.to_dict() for user in users]
        return jsonify({'users': users})

    def post(self):
        dataDict = flaskparser.parse(
            user_method_view_post_body, request, locations=['json', 'form'])

        user = User.query.filter_by(cellphone=dataDict['user']['cellphone']).first()
        if user is None:
            user = User()
        user.from_dict(dataDict['user'])
        db.session.add(user)
        db.session.commit()
        return jsonify({'users': [user.to_dict()]})

    @authorized
    def put(self, user_id=None):
        if user_id is not None:
            dataDict = request.get_json()['user']
            if isinstance(dataDict.get('device_token', None), str):
                user = User.query.get_or_404(user_id)
                user.device_token = dataDict['device_token']
                db.session.commit()
                return UserMethodView.get(user_id)

        abort(401)
