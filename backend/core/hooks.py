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



    return None
