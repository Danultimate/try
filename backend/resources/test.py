from flask.views import MethodView
from flask import Response

class TestMethodView(MethodView):

    def get(self, id):
        return Response(200)
