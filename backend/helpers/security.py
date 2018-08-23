import functools

from flask import g as flask_globals
from webargs.flaskparser import abort
from backend import app


def authorized(f=None, require_user=True, require_device=True):

    if not f:
        return functools.partial(authorized, require_user=require_user, require_device=require_device)

    def _wrap(*args, **kwargs):

        if not app.config.get('DEVELOPMENT') and require_user and flask_globals.user is None:
            abort(401)
            return None

        return f(*args, **kwargs)

    return _wrap


class SecurityUtils:

    @staticmethod
    def get_current_user():
        return flask_globals.user
