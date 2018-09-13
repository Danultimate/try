from flask import g as flask_globals
from webargs.flaskparser import abort

from backend import app
from backend.models import User, Seller


def authorized(f):

    def _wrap(*args, **kwargs):
        print('Este es flask globals', flask_globals.user)
        if flask_globals.user is None:
            abort(401)
            return None

        return f(*args, **kwargs)

    return _wrap


class SecurityUtils:

    @staticmethod
    def get_current_user() -> User:
        return flask_globals.user

    @staticmethod
    def get_current_seller() -> Seller:
        user = flask_globals.user
        if user is not None:
            
            return Seller.query.filter_by(user_id=user.id).first()
