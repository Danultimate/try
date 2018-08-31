from flask.views import MethodView
from flask import jsonify
from backend.models import *
from backend.schemas import *

class UserMethodView(MethodView):

    def get(self, user_id=None):        
        if user_id is not None:
            user = User.query.get_or_404(user_id)
            return jsonify(users=[user.to_dict()])
        
        users = User.query.all()

        users = [user.to_dict() for user in users]

        return jsonify({'users': users})

    def post(self):
        pass