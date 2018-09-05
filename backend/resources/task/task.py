from flask.views import MethodView
from flask import jsonify
from backend.models import *

from webargs.flaskparser import parser as flaskparser
from marshmallow import fields
from flask import request

task_method_view_post_body = {
    'done': fields.Boolean(required=True, validate=lambda x: x is True),
    #TODO: FECHAS
}


class TaskMethodView(MethodView):

    def get(self, task_id=None):
        if task_id is not None:
            task = Task.query.get_or_404(task_id)
            clients = ClientSuggestions.query.filter_by(task_id=task_id)
            medium = task.medium
            return jsonify({
                'tasks': [task.to_dict()],
                'social_media': [medium.to_dict()],
                'clients': [client.to_dict() for client in clients]
            })

        tasks = Task.query.all()
        return jsonify({
            'tasks': [task.to_dict() for task in tasks]
        })

    def post(self):
        dataDict = flaskparser(task_method_view_post_body, request)

        task = Task.from_dict(dataDict)
        db.session.add(task)
        db.session.commit()
        # TODO: return 200? 
