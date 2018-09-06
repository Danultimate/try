from flask import jsonify, request
from flask.views import MethodView
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend import db
from backend.models import *
from backend.schemas import TaskSchema

# Only Puts when 'done' is True
task_method_view_put_body = {
    'task': fields.Nested(TaskSchema)
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

    def put(self, task_id=None):
        if task_id is not None:
            dataDict = flaskparser.parse(
                task_method_view_put_body, request, locations=['json', 'form'])
            task = Task.query.get_or_404(task_id)
            task.from_dict(dataDict['task'])
            db.session.commit()
            return TaskMethodView.get(task_id)

        abort(401)
