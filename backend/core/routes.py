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

# def user_required(f):
#     """Checks whether user is logged in or raises error 401."""
#     def decorator(*args, **kwargs):
#         if not g.user:
#             abort(401)
#         return f(*args, **kwargs)
#     return decorator

register_route(TestMethodView, 'test', '/')
register_route(UserMethodView, 'user_model', '/user', pk='user_id')#, decorator=user_required)

# test_method_view = TestMethodView.as_view('test')
# app.add_url_rule('/api/test', view_func=test_method_view)

# user_view = UserMethodView.as_view('/')
# app.add_url_rule('/users/', defaults={'user_id': None},
#                  view_func=user_view, methods=['GET',])





# from flask_httpauth import HTTPBasicAuth
# auth = HTTPBasicAuth()

# @app.route('/api/resource')
# @sign
# def get_resource():
#     #return jsonify({ 'data': 'Hello, %s!' % g.user.username })
#     return jsonify({ 'data': 'Hello'})