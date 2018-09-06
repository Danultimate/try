import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_sslify import SSLify
import config
import datetime
from flask.json import JSONEncoder
from flask_migrate import Migrate


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, datetime.timedelta):
                return obj.__str__()
            iterable = iter(obj)
        except TypeError:
            print('Error at CustomJSONEncoder')
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)


app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
sslify = SSLify(app)

env = os.environ.get('SETTINGS', config.Development)
app.config.from_object(env)

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)  # this
__all__ = [
    'app', 'db', 'ma'
]

import backend.core
