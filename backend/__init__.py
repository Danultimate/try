import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_sslify import SSLify
import config
import datetime
from flask.json import JSONEncoder
from flask_migrate import Migrate
from flask_admin import Admin
from flask_admin.contrib import sqla
from flask_admin.contrib.sqla import filters


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

app.config.from_object(os.environ['SETTINGS'])

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

__all__ = [
    'app', 'db', 'ma'
]

import backend.core

from backend.models import *
admin = Admin(app, name='descubre-admin', template_mode='bootstrap3')
admin.add_view(sqla.ModelView(User, db.session))
admin.add_view(sqla.ModelView(Seller, db.session))
admin.add_view(sqla.ModelView(Client, db.session))
admin.add_view(sqla.ModelView(Content, db.session))
admin.add_view(sqla.ModelView(Task, db.session))