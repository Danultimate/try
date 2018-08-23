import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_sslify import SSLify

app = Flask(__name__)
sslify = SSLify(app)

app.config.from_object(os.environ['SETTINGS'])

db = SQLAlchemy(app)

import backend.core

__all__ = [
    'app', 'db'
]
