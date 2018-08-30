from flask.views import MethodView
from flask import jsonify
from backend.models import *
from backend.schemas import *

class UserMethodView(MethodView):

    def get(self, user_id=None):
        user_schema = UserSchema(many=True)
        if user_id is None:
            query_result = User.query.all()
        else:
            query_result = User.query.filter_by(id=user_id)
        output = user_schema.dump(query_result).data
        return jsonify({'user': output})
