from sqlalchemy.orm import lazyload

from backend import app
from flask import g as flask_globals, request

from backend.models import AppClientModel, UserModel
from backend.models.device_model import DeviceModel

from backend.helpers import itsdangerous


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
