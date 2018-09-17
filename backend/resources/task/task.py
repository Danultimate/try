from flask import jsonify, request, abort
from flask.views import MethodView
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser

from backend import db
from backend.models import *
from backend.helpers.security import SecurityUtils, authorized
from backend.schemas import TaskSchema

# Only Puts when 'done' is True
task_method_view_put_body = {
    'task': fields.Nested(TaskSchema)
}


class TaskMethodView(MethodView):
    @authorized
    def get(self, task_id=None):
        if task_id is not None:
            task = Task.query.get_or_404(task_id)
            if task.seller == SecurityUtils.get_current_seller(): #?
                client_suggestions = ClientSuggestions.query.filter_by(task_id=task_id).all()
                users = []
                for cs in client_suggestions:
                    client = Client.query.filter_by(id=cs.client.id).first()
                    user = User.query.filter_by(id=client.user_id).first()
                    users.append(user)
                #medium = task.medium
                #FIXME: The users dict returned here is not the client_suggestions, we need to put the correct names!
                res = {'tasks': [], 'users': []}
                res['tasks'] = [task.to_dict()]
                res['users'] = [u.to_dict() for u in users]
                res['client_suggestions'] = [cs.to_dict() for cs in client_suggestions]

                # Add users' info
                res['tasks'][0]['users'] = []
                for user in users:
                    res['tasks'][0]['users'].append(user.id)

                # Add client_suggestions
                res['tasks'][0]['client_suggestions'] = []
                for cs in client_suggestions:
                    res['tasks'][0]['client_suggestions'].append(cs.id)
                res =  jsonify(res)
                return res
            abort(401)

        tasks = Task.query.filter_by(seller=SecurityUtils.get_current_seller())
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
