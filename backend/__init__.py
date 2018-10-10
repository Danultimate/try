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
            if isinstance(obj, datetime.datetime):
                return obj.__str__()
            iterable = iter(obj)
        except Exception as e:
            print('Error at CustomJSONEncoder: ', e)
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


class SellerView(sqla.ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = ('user', 'user.cellphone', 'referred_by', 'created_at', 'code', 'commission', 'updated_at')


class UserView(sqla.ModelView):
    column_list = ('created_at', 'first_name', 'last_name', 'cellphone', 'staff', 'device_token', 'password_hash', 'identification', 'email', 'birth', 'picture')

admin.add_view(UserView(User, db.session))
admin.add_view(sqla.ModelView(Client, db.session))
admin.add_view(sqla.ModelView(Content, db.session))
admin.add_view(sqla.ModelView(Task, db.session))
admin.add_view(sqla.ModelView(Order, db.session))
admin.add_view(sqla.ModelView(Referral, db.session))
admin.add_view(SellerView(Seller, db.session))


# if os.environ['SETTINGS'] != 'config.Development':
from backend.tools.shopify_sniffer import main as shopify_sniffer
from rq import Queue
from worker import conn


q = Queue(connection=conn)
q.enqueue(shopify_sniffer)
