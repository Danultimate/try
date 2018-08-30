from backend.resources import *
from backend import app
from flask import abort, g, jsonify
from backend.helpers.itsdangerous import *

def register_route(view, endpoint, url, pk='id', pk_type='int', decorator=None):
    if decorator is None:
        view_func = view.as_view(endpoint)
    else:
        view_func = decorator(view.as_view(endpoint))
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET',])
    app.add_url_rule(url, view_func=view_func, methods=['POST',])
    app.add_url_rule('%s/<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])

register_route(TestMethodView, 'test', '/')
register_route(UserMethodView, 'user_model', '/user', pk='user_id')#, decorator=user_required)
