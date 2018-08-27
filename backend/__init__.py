import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_sslify import SSLify
import config

app = Flask(__name__)
sslify = SSLify(app)

env = os.environ.get('SETTINGS', config.Development)
app.config.from_object(env)

db = SQLAlchemy(app)

__all__ = [
    'app', 'db'
]

import backend.core