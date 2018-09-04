from flask import g as flask_globals
from flask import request

from backend import app
from backend.helpers import itsdangerous
from sqlalchemy.orm import lazyload

from backend.models import User


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers',
                         'x-requested-with, Content-Type, origin, authorization, accept, client-security-token')

    return response


@app.before_request
def before_request():
    if 'Authorization' in request.headers:
        deserialized = itsdangerous.get_data(request.headers['Authorization'].replace("Bearer ", ""))

        if 'user_id' in deserialized and deserialized['user_id'] is not None:
            flask_globals.user = User.query.options(lazyload('*')).get(deserialized['user_id'])

    else:
        if app.config.get('DEVELOPMENT'):
            flask_globals.user = User.query.options(lazyload('*')).get(1)
        else:
            flask_globals.user = None

    return None
