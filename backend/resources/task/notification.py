from flask.views import MethodView
from flask import jsonify
from backend.models import *

from webargs.flaskparser import parser as flaskparser
from marshmallow import fields
from flask import request

notification_method_view_post_body = {
    'read': fields.Boolean(required=True, validate=lambda x: x is True),
}


class NotificationMethodView(MethodView):

    def get(self, notification_id=None):
        if notification_id is not None:
            notification = NotificationRegister.query.get_or_404(notification_id)
            task = notification.task
            return jsonify({
                'notifications': [notification.to_dict()],
                'tasks': [task.to_dict()]
            })

        notifications = NotificationRegister.query.all()
        return jsonify({
            'notifications': [notification.to_dict() for notification in notifications]
        })

    def post(self):
        dataDict = flaskparser(notification_method_view_post_body, request)

        nofification = NotificationRegister.from_dict(dataDict)
        db.session.add(nofification)
        db.session.commit()
        # TODO: return 200?
