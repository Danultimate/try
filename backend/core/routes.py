from backend import app
from flask import abort, g, jsonify
from backend.helpers.itsdangerous import *
from backend.resources import *

def register_route(view, endpoint, url, pk='id', pk_type='int'):
    url = NAME_SPACE + url
    view_func = view.as_view(endpoint)

    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET',])
    app.add_url_rule(url, view_func=view_func, methods=['POST',])
    app.add_url_rule('%s/<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])

NAME_SPACE = '/api/v1'

register_route(TestMethodView, 'test', '/')
register_route(UserMethodView, 'user_model', '/users', pk='user_id')
