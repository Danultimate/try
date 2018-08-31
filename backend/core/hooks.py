from flask import g as flask_globals
from flask import request

from backend import app
from backend.helpers import itsdangerous
from sqlalchemy.orm import lazyload


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'x-requested-with, Content-Type, origin, authorization, accept, client-security-token')

    return response


@app.before_request
def before_request():
    # if not (flask_globals.user or request.endpoint == 'login'):
    #     #return login_manager.unauthorized()
    #     return 'lala'
    # TODO: except login
    token = request.headers.get('token')
    # verify the token
    data = itsdangerous.get_data(token)
    user_id = data['id']
    return user_id
