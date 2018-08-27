import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_sslify import SSLify
import config

app = Flask(__name__)
sslify = SSLify(app)

env = os.environ.get('SETTINGS', config.Development)
app.config.from_object(env)

db = SQLAlchemy(app)
ma = Marshmallow(app)

__all__ = [
    'app', 'db', 'ma'
]

import backend.core